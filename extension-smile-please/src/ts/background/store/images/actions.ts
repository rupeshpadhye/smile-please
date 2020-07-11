/// <reference types="node" />
import { Action } from 'redux';
import { Image, Category, MemeCategory } from './reducer';
import { uniqBy ,differenceBy, isEmpty,flattenDeep } from 'lodash';

export type ImageStoreActionsTypes = 'SET_IMAGE_STORE' | 'MARK_IMAGE_VIEWED'| 'SET_APP_STATE';
export type ImageStorePayload = { images: MemeCategory [] , date: number , categories: Category []} | Image [] ;
export type ImageStoreActions = Action<ImageStoreActionsTypes,ImageStorePayload>;


export const setImageStore = (payload) => ({ type: 'SET_IMAGE_STORE', payload });
export const markImageAsViewed = (payload: Image []) => ({ type: 'MARK_IMAGE_VIEWED',payload });
export const setAppState = (payload) => ({ type: 'SET_APP_STATE', payload });

export const setCurrentCategory = (payload: {currentCategory: string}) => ({ type: 'SET_IMAGE_STORE', payload });



export const peekImages = (imageStore,viewedImages: Image [] ): Image[] => {
    const images: Image [] = flattenDeep(imageStore.map(i => i.memes));
    return differenceBy(images, viewedImages, 'id');
}

export const checkAllSeen = (imageStore : MemeCategory [], viewedImages: Image [],category: string): boolean => {
  const unseenImages = getUnseenImages({imageStore,viewedImages,category});
  const isAllSeen = isEmpty(unseenImages);
  return isAllSeen;
}

export const getUnseenImages = ({
    imageStore,
    viewedImages,
    category
}) => {
    const  images = imageStore.filter(i => category === 'all' ? i.includeInAll : i.key === category );
    const unseenImages = peekImages(images, viewedImages);
    return unseenImages;
 }

const rootUrl =  process.env.API_URL;


export const fetchImages = async (): Promise<any> =>{
  const response = await fetch(rootUrl);
  const body = await response.json();
  return body;
}

export const getMemes = () => {
    return async (dispatch,getState) => {
        try {
            const currentStore = getState().images;
            const { date: prevDate,viewedImages, currentCategory} = currentStore;
            dispatch(setAppState('loading'));
            const response = await fetchImages();
            const { imageStore =[], date } = response;
            const categories = imageStore.map(i => ({key: i.key,title: i.title}));
            categories.unshift({key: 'all', title:'All'});
            categories.push({key:'preferences',title: 'Preferences'});
            const unseenImages = getUnseenImages({
                imageStore,
                viewedImages: viewedImages,
                category: currentCategory,
              });
            //TEMP fix - clear view images after few days  
            if(viewedImages.length > 1000) {
                dispatch(markImageAsViewed([]));
            }  
            if (isEmpty(unseenImages)) {
                dispatch(setAppState('all-seen'));
            }else {
                dispatch(setImageStore({imageStore, categories, date, unseenImages}));
                dispatch(setAppState('success'));
            }    
        }
        catch(e) {
            console.error(e);
            dispatch(setAppState('error'));
        }             
    };
};

export const categoryChanged = (category) =>{
    return async (dispatch,getState) => { 
        const currentStore = getState().images;
        const { imageStore , viewedImages } = currentStore;
        const unseenImages = getUnseenImages({
            imageStore,
            viewedImages,
            category: category,
          });
        if (isEmpty(unseenImages)) {
            dispatch(setAppState('all-seen'));
        }else {
            dispatch(setImageStore({unseenImages}));
            dispatch(setAppState('success'));
        }  
        dispatch(setCurrentCategory({currentCategory:category}));
    }
}

export const handleViewHistory = (image: Image) => {
    return async (dispatch,getState) => { 
        const currentStore = getState().images;
        const { imageStore, viewedImages, currentCategory } = currentStore;
        const seenImages = uniqBy([...viewedImages, image], 'id');
        if (checkAllSeen(imageStore, seenImages,currentCategory)) {
          dispatch(setAppState('all-seen'));
        }
        dispatch(markImageAsViewed(seenImages));
    }
  
}