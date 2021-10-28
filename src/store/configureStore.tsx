import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exampleReducer from './reducers/exampleReducer';

const composeEnhancers = composeWithDevTools({});

const persistConfig = {
	key: 'Genshin Impact Wish Counter',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	exampleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
	const store = createStore(persistedReducer, composeEnhancers());
	const persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
