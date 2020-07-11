import { Reducer } from 'redux';

export type CurrentAppState = 'loading' | 'success' | 'error' | 'all-seen' | undefined ;

export interface Image {
    id: string,
    title: string,
    description: string,
    datetime: number,
    cover: string,
    link: string,
    images_count?: number,
    type: string,
    images: any []
}

export interface Category {
	key: string,
	title: string,
}

export interface MemeCategory {
	key: string,
	title: string,
	memes: Image [],
	includeInAll: boolean,
}
export interface ImageStore {
    imageStore: MemeCategory [],
	viewedImages : Image [],
	date: number,
	categories: Category [],
	currentCategory: string,
	appState: CurrentAppState,
	unseenImages: Image [],
}

export const initialState: ImageStore = {
	imageStore:  [],
	viewedImages: [],
	date: undefined,
	categories: [],
	appState: 'loading',
	currentCategory: 'all',
	unseenImages: [],
};

const images: Reducer<ImageStore, any> = (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {
		case 'SET_IMAGE_STORE':{
			return {...state, ...payload };
		}
		case 'MARK_IMAGE_VIEWED':
			return { ...state, viewedImages:payload };

		case 'SET_APP_STATE': 
			return { ...state, appState:payload };
		default:
			return state;
	}
};

export default images;
