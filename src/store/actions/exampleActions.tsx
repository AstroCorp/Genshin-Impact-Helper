import { INCREMENT, DECREMENT } from './actionTypes';

export const increment = (value: number) => {
	return {
		type: INCREMENT,
		value: value,
	};
}

export const decrement = (value: number) => {
	return {
		type: DECREMENT,
		value: value,
	};
}
