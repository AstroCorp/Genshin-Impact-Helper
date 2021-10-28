import { AnyAction } from 'redux';
import { INCREMENT, DECREMENT, GET_REPOS, GET_REPOS_SUCCESS, GET_REPOS_FAIL } from '../actions/actionTypes';

const initialState = {
	counter: 0,
	loading: false,
	error: '',
	repos: [],
};

const exampleReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case INCREMENT:
			return { ...state, counter: state.counter + action.value };

		case DECREMENT:
			return { ...state, counter: state.counter - action.value };

		case GET_REPOS:
			return { ...state, loading: true };

		case GET_REPOS_SUCCESS:
			console.log(action);
			return { ...state, loading: false, repos: action.payload.data };

		case GET_REPOS_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error al buscar los repositorios',
			};
	}

	return state;
};

export default exampleReducer;
