import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'


const PlaceHolderContainer = styled('div')`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;



const SmileyContainer = styled('div')`
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const Img = styled('img')`
    width: ${props => props.width ? props.width  : 30}em;
`;

const LoadingContainer = styled('div')`
    position: absolute;
    top: 0px;
    width: 100%;
`;

const PlaceHolder: React.FC<{ src : string ,
    text: string ,
    secondaryText?: string, 
    isProgress?: boolean, 
    width?: string
}> = 
({ src,text,secondaryText,isProgress = false,width}) => {
    const srcUrl= `http://35.241.26.128/assets/${src}`;
    return (
        <PlaceHolderContainer>
           { isProgress &&  <LoadingContainer>
                <LinearProgress color="secondary" />
            </LoadingContainer>  }
        <SmileyContainer>
            <Img src={srcUrl} alt={text} width={width}/>
            <Typography variant="body1" color="secondary">
                {text}
            </Typography>
            <Typography variant="body2" color="secondary">
                {secondaryText}
            </Typography>
        </SmileyContainer>
       </PlaceHolderContainer>
    );
};

export default PlaceHolder;
