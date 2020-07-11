import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactGA from 'react-ga';
import { get } from 'lodash';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import Preferences from '../components/Preferences';
import { updateShowAdultImages } from '../background/store/settings';
import { Image, getMemes, categoryChanged, handleViewHistory } from '../background/store/images';
import { IAppState } from '../background/store';
import AppSkeleton from '../components/AppSkeleton';
import ImageList from '../components/ImageList';
import CategoryList from '../components/CategoryList';

const CategoryContainer = styled('div')`
    position: absolute; 
    right: 0px;
    z-index: 1100;
    top: 0.5em;
`;

const MemesApp: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const imageStoreSelect = useSelector((state: IAppState) => state.images);
  const { showAdultImages, notificationFreqInMinutes } = useSelector((state: IAppState) => state.settings);
  const { categories = [], appState, currentCategory, unseenImages } = imageStoreSelect;

  const addViewHistory = (image: Image) => {
    dispatch(handleViewHistory(image));
  }
  const acceptAdultPolicy = () => {
    dispatch(updateShowAdultImages());
  }
  const handleCategorySelection = (category) => {
    ReactGA.event({
      category,
      action: 'Category Selection',
      label: 'Category Interaction'
    });
    dispatch(categoryChanged(category));
  }

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  const category = categories.find(c => c.key === currentCategory);
  if (!showAdultImages) {
    return (
      <Dialog
        open={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle id="simple-modal-title">Are you over 18?</DialogTitle>
        <DialogContent>
          <DialogContentText id="simple-modal-description">
            Smile Please may contain non family safe, adult nature content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptAdultPolicy} color="primary">
            Yes, I am
          </Button>
        </DialogActions>
      </Dialog>)
  }
  return (
    <div>
      {currentCategory === 'preferences'
        ? <Preferences width="20" />
        : (
          <AppSkeleton
            appState={appState}
            categoryName={get(category, 'title', 'All')}
            goToCategory={handleCategorySelection}
            notSubscribed={notificationFreqInMinutes === "0"}
          >
            <ImageList
              images={unseenImages}
              markAsViewed={addViewHistory}
            />
          </AppSkeleton>)
      }
      <CategoryContainer>
        <CategoryList
          currentCategory={currentCategory}
          categories={categories}
          onCategorySelected={handleCategorySelection}
        />
      </CategoryContainer>
    </div>
  );
}

export default MemesApp;
