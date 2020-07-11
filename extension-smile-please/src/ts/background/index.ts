import { applyMiddleware, createStore, compose } from 'redux';
import { alias, wrapStore } from 'webext-redux';
import { configureApp } from './AppConfig';
import reducers, { loadState, saveState } from './store';
import thunkMiddleware from 'redux-thunk';
import { updateNotificationPref, setAlert } from './store/settings';


// Create the basic notification
const createNotification = () => {
  var id = "smile-please-notification" + Date.now();
  chrome.notifications.create(id, {
      type: "basic",
      iconUrl: chrome.extension.getURL("128.png"),
      title: "Smile Please!",
      message: "New memes are available!",
    });
  }
  
 const handleAlarm = (alarmInfo) => {
    if(alarmInfo.name === 'smile-please-notification-alarm') {
      createNotification();
    } else if (alarmInfo.name === 'smile-please-clear-images') {
       var state = loadState();
       state.images.viewedImages = [];
       saveState(state);
    }
  }
  
  export const clearAlarm = () => {
    chrome.alarms.clear("smile-please-notification-alarm");
  }
  

  export const setAlarm = (name,timeInMinutes) => {
    const { when , periodInMinutes } = getTimerInfo(+timeInMinutes);
    console.log(when);
    chrome.alarms.create(name, {
    when,
    periodInMinutes
    });
  }
  
  function getTimerInfo(periodInMinutes){
    
    if(periodInMinutes === "0") {
      return undefined;
    }
    const now = new Date();
      const minutes = now.getMinutes();
    now.setMinutes( minutes + periodInMinutes );
    const timeToSend = now.getTime();
    return { when: timeToSend, periodInMinutes: periodInMinutes};
  }
  
const aliases = {
    // this key is the name of the action to proxy, the value is the action
    // creator that gets executed when the proxied action is received in the
    // background
    'UPDATE_NOTIFICATION_ALARM': (payload) => {
       return (dispatch) => {
        const { value } = payload;
        if(value === "0") {
          clearAlarm();
          chrome.permissions.remove({
            permissions: ['notifications'],
          }, function(removed) {
            dispatch(updateNotificationPref(value));
            dispatch(setAlert({status: 'success', message:'User preferences Updated!'}));
            setTimeout(()=> {
              dispatch(setAlert(undefined));
            },2000);
          });
         } else {
          chrome.permissions.contains({
            permissions: ['notifications'],
          }, (result) => {
            if (result) {
              setAlarm("smile-please-notification-alarm",value);
              chrome.alarms.onAlarm.addListener((alarmInfo) => handleAlarm(alarmInfo));
              dispatch(updateNotificationPref(value));
              dispatch(updateNotificationPref(value));
              dispatch(setAlert({status: 'success', message:'User preferences Updated!'}));
              setTimeout(()=> {
                dispatch(setAlert(undefined));
              },2000);
            } else {
              chrome.permissions.request({
                permissions: ['notifications'],
              }, (granted) => {
                if (granted) {
                    setAlarm("smile-please-notification-alarm",value);
                    chrome.alarms.onAlarm.addListener((alarmInfo) => handleAlarm(alarmInfo));
                    dispatch(updateNotificationPref(value));
                    dispatch(setAlert({status: 'success', message:'User preferences Updated!'}));
                    setTimeout(()=> {
                      dispatch(setAlert(undefined));
                    },5000);
                } else {
                  dispatch(setAlert({status: 'error', message:'Failed to grant permission.'}));
                }
              });
             }
            })
         }       
      };
    },
};
const middleware = [alias(aliases),thunkMiddleware];

const preloadedState = loadState();
const store = createStore(reducers, preloadedState,
  compose(
    applyMiddleware(...middleware),
  ));

configureApp(store);
wrapStore(store);
