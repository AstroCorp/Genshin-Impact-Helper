export interface exampleReducer {
    counter: number;
	loading: boolean;
	error: string;
	repos: any[];
}

export default interface State {
	exampleReducer: exampleReducer;
}
