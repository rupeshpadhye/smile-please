import { Reducer } from 'redux';
import { SettingsActions } from './actions';
import { Color } from '@material-ui/lab/Alert';

export interface AlertMessage {
	status: Color,
	message: string,
};
export interface IAppSettings {
	notificationFreqInMinutes: string;
	alert: AlertMessage | undefined,
	showAdultImages: boolean,
}

export const initialState: IAppSettings = {
	notificationFreqInMinutes: '0',
	alert: undefined,
	showAdultImages: false,
};


const settings: Reducer<IAppSettings, SettingsActions> = (state = initialState, action) => {
	switch (action.type) {		
		case 'SET_ALERT_MESSAGE': 
			return {...state,alert: action.payload}	
		case 'UPDATE_NOTIFICATION_SETTINGS': 
			return { ...state, notificationFreqInMinutes: action.payload };
		case 'UPDATE_SHOW_ADULT_SETTINGS':
			return { ...state, showAdultImages: !state.showAdultImages };		
		default:
			return state;
	}
};

export default settings;
