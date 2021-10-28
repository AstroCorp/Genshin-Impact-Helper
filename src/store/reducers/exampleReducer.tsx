import { AnyAction } from 'redux';
import { INCREMENT, DECREMENT } from '../actions/actionTypes';

const initialState = {
	counter: 0,
};

const exampleReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case INCREMENT:
			return { ...state, counter: state.counter + action.value };

		case DECREMENT:
			return { ...state, counter: state.counter - action.value };
	}

	return state;
};

export default exampleReducer;
