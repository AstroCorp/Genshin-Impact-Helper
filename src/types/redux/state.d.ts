import { GenshinData } from '..';

export interface MainReducer {
    banners: GenshinData[];
}

export interface State {
	mainReducer: MainReducer;
}
