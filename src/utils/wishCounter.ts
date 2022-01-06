import { URL } from 'react-native-url-polyfill';
import { dispatch } from 'use-bus';
import { GenshinWish, GenshinData } from '../types';

const getLog = (url: URL, wishNumber: number, page: number, lastId: string): Promise<GenshinWish[]> => {
    url.hash = '';
    url.host = 'hk4e-api-os.mihoyo.com';
    url.pathname = 'event/gacha_info/api/getGachaLog';
    url.searchParams.set('auth_appid', 'webview_gacha');
    url.searchParams.set('init_type', '301');
    url.searchParams.set('gacha_id', 'b8fd0d8a6c940c7a16a486367de5f6d2232f53');
    url.searchParams.set('lang', 'en');
    url.searchParams.set('device_type', 'mobile');
    url.searchParams.set('region', '');
    url.searchParams.set('gacha_type', wishNumber.toString());
    url.searchParams.set('size', '20');
    url.searchParams.append('lang', 'en-us');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('end_id', lastId);

    return new Promise((resolve, reject) => {
        fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url.href))
        .then(res => res.json())
        .then(res => {
            if (res.retcode !== 0) reject(res.message);
            resolve(res.data.list);
        })
        .catch(err => reject(err));
    });
}

const wishCounter = async (genshinUrl: string): Promise<GenshinData[]> => {
    const url = new URL(genshinUrl);
    const types = [
        {
            code: 100,
            title: 'Beginners',
        },
        {
            code: 200,
            title: 'Standard',
        },
        {
            code: 301,
            title: 'Character',
        },
        {
            code: 302,
            title: 'Weapon',
        },
    ];
    const wishList = [];

    for (const wishNumber of types) {
        let page = 1;
        let lastId = '0';
        let pity = {
            fourStarts: 0,
            fiveStarts: 0,
        };
        let wishes = [];
        let hasWishes = true;

        do {
            const list = await getLog(url, wishNumber.code, page, lastId);
            wishes.push(...list);

            dispatch({
                type: '@wishCounter/progress',
                payload: {
                    title: wishNumber.title,
                    wishCount: wishes.length,
                },
            });

            hasWishes = list.length > 0;

            // Para obtener la siguiente página tenemos que indicar el último deseo de la anterior
            lastId = wishes.length > 0 ? wishes[wishes.length - 1].id : '0';
            page++;
        } while (hasWishes);
        
        // Calculamos el pity
        wishes.reverse().forEach(wish => {
            if (wish.rank_type === '3' || wish.rank_type === '5') pity.fourStarts++;
            if (wish.rank_type === '3' || wish.rank_type === '4') pity.fiveStarts++;
            if (wish.rank_type === '4') pity.fourStarts = 0;
            if (wish.rank_type === '5') pity.fiveStarts = 0;
        });

        wishList.push({
            banner: wishNumber,
            pity,
            wishes,
        });
    }

    return wishList;
}

export default wishCounter;
