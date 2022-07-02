import { atom, MutableSnapshot, useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { MMKV } from "react-native-mmkv";
import { useState } from "react";

const storage = new MMKV({
    id: 'ghhelper',
    encryptionKey: 'ghhelper',
});

export const configState = atom({
    key: 'config',
    default: {
        hiddenBeginnersBanner: false,
    },
});

export const wishCounterState = atom({
    key: 'wishCounter',
    default: [],
});

export const sessionState = atom({
    key: 'session',
    default: {
        isSignedIn: false,
    },
});

export const PersistStorage = () => {
    const DEFAULT_TIMEOUT = 2000;
    const [ saveTimeout, setSaveTimeout ] = useState<NodeJS.Timeout|null>(null);

    useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }

        const timeout = setTimeout(async () => {
            const config = await snapshot.getPromise(configState);
            const wishCounter = await snapshot.getPromise(wishCounterState);

            storage.set('data', JSON.stringify({
                config,
                wishCounter,
            }));
        }, DEFAULT_TIMEOUT);

        setSaveTimeout(timeout);
    });

    return null;
}

export const initState = (snapshot: MutableSnapshot) => {
    const data = storage.getString('data');

    if (!data) return;

    const { config, wishCounter } = JSON.parse(data);

    snapshot.set(configState, config);
    snapshot.set(wishCounterState, wishCounter);
}
