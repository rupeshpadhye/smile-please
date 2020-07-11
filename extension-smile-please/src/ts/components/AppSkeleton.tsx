import React from 'react';
import styled, { css } from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import PlaceHolder from './PlaceHolder';
import { CurrentAppState } from '../background/store/images';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
  notifyButton: {
     'margin-top':'24px',
     'color': 'white',
     'border': '1px solid',
  },
}));

const centerFlex = css`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }`;


const FlexContainer = styled('div')`
   ${centerFlex}
}`;
const PlaceHolderContainer = styled('div')`
   ${centerFlex}
    padding: 150px;
  }`;

const AppSkeleton: React.FC<{
  appState : CurrentAppState, 
  categoryName: string,
  goToCategory: (string)=> void,
  notSubscribed: boolean,
}> = ({ appState, categoryName ,goToCategory,notSubscribed,children}) => {
    const classes = useStyles();
    return (
        <div>
          {appState === 'error' && 
          <PlaceHolderContainer> 
           <PlaceHolder 
           src='SomethingWentWrong.svg'
           text="Something went wrong..."
           />
           </PlaceHolderContainer>
           }
          {appState === 'loading' &&
          <PlaceHolderContainer> 
            <PlaceHolder 
            src='SmilePleaseSvg.svg'
            text="Loading laughter packets..."
            isProgress={true}
            />
           </PlaceHolderContainer>   
         }
          { appState === 'all-seen' &&
            <div>
            <PlaceHolder 
            src='WorkTimeSvg.svg'
            text={categoryName === 'All' ? "You viewed all memes for this hour!" : `
              You viewed all memes of ${categoryName} category.
            `}
            />
            <FlexContainer>
             {
              categoryName !== 'All' &&
              (<Button variant="outlined" 
              classes={{
                root: classes.notifyButton ,
               }}
               onClick={()=> goToCategory('all')}
              >
                View All memes
              </Button>)
              }
              {
                categoryName === 'All' && notSubscribed && 
                <Button variant="outlined" 
                classes={{
                  root: classes.notifyButton ,
                 }}
                 onClick={() => goToCategory('preferences')}
                >
                  Click here to enable notifications
                </Button>
              
              }
               </FlexContainer>
            </div> 
           
            }
            {appState === 'success' && 
              children
            }
        </div>
    );
};

export default AppSkeleton;