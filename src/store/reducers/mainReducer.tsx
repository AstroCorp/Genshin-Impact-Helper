import { AnyAction } from 'redux';
import { SET_BANNERS, TOGGLE_BEGGINNERS_BANNER } from '../actions/actionTypes';

const initialState = {
	banners: [],
	hiddenBeginnersBanner: false,
};

const mainReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SET_BANNERS:
			return { 
				...state,
				banners: action.value
			};
		case TOGGLE_BEGGINNERS_BANNER:
			return { 
				...state,
				hiddenBeginnersBanner: !state.hiddenBeginnersBanner,
			};
	}

	return state;
};

export default mainReducer;
