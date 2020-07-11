import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import PlaceHolder from './PlaceHolder';
import { IAppState } from '../background/store';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { updateShowAdultImages } from '../background/store/settings';
import ReactGA from 'react-ga';

const FormGroupContainer = styled(FormGroup)`
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		align-items: center;
`;

const PreferenceCardContainer = styled('div')`
    display:flex;
    align-items: center;
    justify-content: center;
`;

const PreferenceCard = styled(Card)`
    max-width:600px;
`;

const AlertContainer = styled('div')`
		position: absolute;
		bottom: 0;
		margin: 24px;
		right: 0;
`;

const SettingsContainer = styled('div')`
	padding: 24px;
`;

const FormItem = styled('div')`
	margin: 8px;
	width: 350px;
`;

const Preferences: React.FC<{ width?: string}> = ({width}) => {

    const dispatch = useDispatch();
    const settings = useSelector((state: IAppState) => state.settings);
    const handleNotificationFreq = (event) => {
        ReactGA.event({
            category: 'notification',
            action: 'Subscribed to Notification',
            label: 'Subscribed to Notification'
          });
        dispatch({
            type: 'UPDATE_NOTIFICATION_ALARM'
            , value: event.target.value
        });
    }

    const handleRevoke = () => {
        dispatch(updateShowAdultImages());
    }

    return (
        <SettingsContainer>
            {settings.alert && (
            <AlertContainer>
                <Slide direction="up" in={true}>
                    <Alert severity={settings.alert.status}>{settings.alert.message} </Alert>
                </Slide>
            </AlertContainer>)
            }
            <PlaceHolder src="Settings.svg" width={width} text="" />
            <PreferenceCardContainer>
            <PreferenceCard>
            <CardContent>
                <FormGroupContainer>
                    <FormItem>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">New memes notification alarm</FormLabel>
                            <RadioGroup
                                aria-label="New memes notification alarm"
                                name="notificationFreqInMinutes" value={settings.notificationFreqInMinutes}
                                onChange={handleNotificationFreq}>
                                <FormControlLabel value="0" control={<Radio />} label="Do Not Notify" />
                                <FormControlLabel value="60" control={<Radio />} label="Every Hour" />
                                <FormControlLabel value="120" control={<Radio />} label="Every Two Hour" />
                                <FormControlLabel value="480" control={<Radio />} label="Every Four Hours" />
                            </RadioGroup>

                        </FormControl>
                    </FormItem>
                    <FormItem>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Click on Revoke, if you are not above 18</FormLabel>
                            <Button onClick={()=> handleRevoke()}>Revoke</Button>
                    </FormControl>
                    </FormItem>
                </FormGroupContainer>
            </CardContent>
            </PreferenceCard>
            </PreferenceCardContainer>
        </SettingsContainer>


    );
}

export default Preferences;
