import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import exampleReducer from './reducers/exampleReducer';

const client = axios.create({
	baseURL: 'https://api.github.com/users/AstroCorp/repos',
	responseType: 'json',
});

const composeEnhancers = composeWithDevTools({});

const persistConfig = {
	key: 'example',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
	const store = createStore(
		persistedReducer,
		composeEnhancers(applyMiddleware(axiosMiddleware(client))),
	);
	const persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
