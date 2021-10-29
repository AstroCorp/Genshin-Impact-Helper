import { GenshinData } from '../../types';
import { SET_BANNERS } from './actionTypes';

export const setBanners = (value: GenshinData[]) => {
	return {
		type: SET_BANNERS,
		value: value,
	};
}
