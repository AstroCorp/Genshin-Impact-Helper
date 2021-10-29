import { AnyAction } from 'redux';
import { SET_BANNERS } from '../actions/actionTypes';

const initialState = {
	banners: [],
};

const mainReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SET_BANNERS:
			return { 
				...state,
				banners: action.value
			};
	}

	return state;
};

export default mainReducer;
