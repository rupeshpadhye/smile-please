import React, { useState } from 'react';
import { Category } from '../background/store/images';
import Button from '@material-ui/core/Button';
import CategoryIcon from '@material-ui/icons/Category';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ReactGA from 'react-ga';

interface CategoryListProps {
    categories: Category[],
    onCategorySelected: (string) => void,
    currentCategory: string,
}

const useStyles = makeStyles(() => ({
    drawerPaper: {
      width:'40vw',
    },
    iconButton: {
        color: 'white'
    },
    feedBackButton: {
        position: "absolute",
        bottom: '1em',
        left:'3em',
    }
  }));

const CategoryList: React.FC<CategoryListProps> = (props: CategoryListProps) => {
    const { categories=[],onCategorySelected ,currentCategory} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleListItemClick = (key) => {
        onCategorySelected(key);
        handleClose();
    };
    const classes = useStyles();
    return (
        <div>
             <Tooltip title="Categories">
                <Button
                classes={{
                    root: classes.iconButton ,
                }}
                onClick={handleClickOpen}>
                    <CategoryIcon />
                </Button>
            </Tooltip>
              <Drawer 
               classes={{
                paper: classes.drawerPaper ,
                }}
              anchor="left" open={open} onClose={handleClose}>
                <List>
              {categories.map(c =>
              (
              <ListItem 
              selected={currentCategory === c.key}
              onClick={() => handleListItemClick(c.key)}
              button key={c.key}>
                <ListItemText primary={c.title} />
             </ListItem>
             )
            )}
            </List> 
             <Button
                    classes={{
                        root: classes.feedBackButton ,
                    }}
                    size="small"
                    variant="outlined"
                    target="_blank" 
                    rel="noopener"
                    href="https://forms.gle/mZP7hU8UShTuMhnDA"
                    onClick={()=> {
                        ReactGA.event({
                            category: 'feedback',
                            action: 'Feedback link clicked',
                            label: 'Feedback Interaction'
                          });
                    }}
                >
                Share Feedback
            </Button>             
         </Drawer>
        </div>
    );
}

export default CategoryList;