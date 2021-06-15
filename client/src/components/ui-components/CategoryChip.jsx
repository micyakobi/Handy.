import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const CategoryChip = ({ category, onSelect, isSelectedCategory }) => {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState(isSelectedCategory);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onSelect(category);
  };

  const renderSelectIcon = () => isSelected ? <CheckIcon /> : <AddIcon />;

  return (
    <div className={classes.root}>
      <Chip
        icon={renderSelectIcon()}
        label={category.categoryTitle}
        clickable
        color="secondary"
        onClick={handleClick}
      />
    </div>
  );
}

export default CategoryChip;
