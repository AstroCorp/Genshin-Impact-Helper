import { GenshinData } from '../../types';
import { SET_BANNERS, TOGGLE_BEGGINNERS_BANNER } from './actionTypes';

export const setBanners = (value: GenshinData[]) => {
	return {
		type: SET_BANNERS,
		value: value,
	};
}

export const toggleHiddenBeginnersBanner = () => {
	return {
		type: TOGGLE_BEGGINNERS_BANNER,
	};
}
