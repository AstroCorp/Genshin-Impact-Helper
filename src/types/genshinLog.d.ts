export interface GenshinWish {
    uid: string;
    gacha_type: string;
    item_id: string;
    count: string;
    time: string;
    name:  string;
    lang: string;
    item_type: string;
    rank_type: string;
    id: string;
}

interface Banner {
    code: number;
    title: string;
}

interface Pity {
    fourStarts: number;
    fiveStarts: number;
}

export interface GenshinData {
    banner: Banner;
    pity: Pity;
    wishes: GenshinWish[];
}
