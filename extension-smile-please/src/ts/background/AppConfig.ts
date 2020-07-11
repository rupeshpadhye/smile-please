import { Store } from 'redux';
import { IAppState, saveState } from './store';

const autoSaveAppState = (store: Store<IAppState>) => {
	chrome.windows.onRemoved.addListener(() => saveState(store.getState()));
	const saveFrequency = 60000; // 60seconds * 1000milliseconds / 1second
	setInterval(() => {
		console.log
		saveState(store.getState());
	}, saveFrequency);
};


export const configureApp = (store: Store<IAppState>) => {
	autoSaveAppState(store);	
};