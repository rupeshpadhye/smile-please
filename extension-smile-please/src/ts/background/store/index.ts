import { combineReducers } from 'redux';
import settings, { IAppSettings } from './settings/reducer';
import images, { ImageStore } from './images/reducer';

import 'redux';
// Enhance the Action interface with the option of a payload.
// While still importing the Action interface from redux.
declare module 'redux' {
	export interface Action<T = any, P = any> {
		type: T;
		payload?: P;
	}
}

type OnSuccess = () => void;
type OnError = (e: Error) => void;

export interface IAppState {
	settings: IAppSettings;
	images: ImageStore;
	
}

export const loadState = (): IAppState | undefined  => {
	try {
		const serializedState = localStorage.getItem('appstate');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (appstate: IAppState, success: OnSuccess = () => {}, error: OnError = () => {}) => {
	try {
		const serializedState = JSON.stringify({
			settings: appstate.settings,
			images: appstate.images,
		});
		localStorage.setItem('appstate', serializedState);
		success();
	} catch (e) {
		error(e);
	}
};

type IApp = IAppState;

const reducers = combineReducers<IApp>({
	settings,
	images,
});

export default reducers;
