import { INCREMENT, DECREMENT, GET_REPOS } from './actionTypes';

export const increment = (value: number) => {
	return {
		type: INCREMENT,
		value: value,
	};
};

export const decrement = (value: number) => {
	return {
		type: DECREMENT,
		value: value,
	};
};

export function listRepos() {
	return {
		type: GET_REPOS,
		payload: {
			request: {
				url: '',
			},
		},
	};
}
