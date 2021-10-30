import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mainReducer from './reducers/mainReducer';

const composeEnhancers = composeWithDevTools({});

const persistConfig = {
	key: 'Genshin Impact Helper',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	mainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
	const store = createStore(persistedReducer, composeEnhancers());
	const persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
