import { GenshinData } from '..';

export interface MainReducer {
    banners: GenshinData[];
    hiddenBeginnersBanner: boolean;
}

export interface State {
	mainReducer: MainReducer;
}
