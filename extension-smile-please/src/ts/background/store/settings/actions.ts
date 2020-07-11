import { Action } from 'redux';
import { AlertMessage } from './reducer';


export type SettingsActionsTypes = 'UPDATE_NOTIFICATION_SETTINGS'| 'SET_ALERT_MESSAGE'| 'UPDATE_SHOW_ADULT_SETTINGS';

export type SettingPayload = any;

export type SettingsActions = Action<SettingsActionsTypes , SettingPayload>;

export const updateShowTrending = () => ({ type: 'UPDATE_SHOW_TRENDING_SETTINGS' });

export const updateShowAdultImages = () => ({ type: 'UPDATE_SHOW_ADULT_SETTINGS' });

export const setAlert = (payload: AlertMessage| undefined) => ({ type: 'SET_ALERT_MESSAGE',payload});

export const updateNotificationPref = (payload: string) => ({ type: 'UPDATE_NOTIFICATION_SETTINGS',payload });
