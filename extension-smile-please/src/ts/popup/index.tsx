import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PopupApp from './containers/PopupApp';
import {Store, applyMiddleware} from 'webext-redux';
import thunkMiddleware from 'redux-thunk';

const store = new Store();

const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

store.ready().then(() => {
	ReactDOM.render(
		<Provider store={storeWithMiddleware}>
			<PopupApp />
		</Provider>
		, document.getElementById('popup-root'));
});
