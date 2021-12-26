import React from 'react';
import { deleteTodo, toggleComplete } from '../../features/todo/todosSlice';
import { useDispatch } from 'react-redux';
import { IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

import HoverPopover from 'material-ui-popup-state/HoverPopover';
import {
  usePopupState,
  bindPopover,
  bindHover,
} from 'material-ui-popup-state/hooks';

export const Todo = ({ todo }) => {
  const { id, name, info, isCompleted } = todo;
  const dispatch = useDispatch();
  const handleToggle = (event) => {
    event.preventDefault();
    const newToggle = {
      id: id,
      isCompleted: isCompleted,
    };
    dispatch(toggleComplete(newToggle));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const todoToDelete = {
      id: id,
    };
    dispatch(deleteTodo(todoToDelete));
  };

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  });

  return (
    <>
      <Paper
        {...bindHover(popupState)}
        sx={{
          width: 'fit-content',
          m: 0.5,
          p: 2,
          bgcolor: isCompleted ? 'success.main' : '',
          float: 'left',
          transition: 'all .5s',
        }}
        elevation={3}
        id={id}
      >
        <Typography variant="h5" color={isCompleted ? 'white' : ''}>
          {name}
        </Typography>
        <Typography variant="p">{info}</Typography>
      </Paper>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Tooltip title="delete" placement="top">
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color="error" fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={isCompleted ? 'uncomplete' : 'complete'}
          placement="top"
        >
          <IconButton aria-label="complete" onClick={handleToggle}>
            {!isCompleted ? (
              <CheckIcon color="success" fontSize="small" />
            ) : (
              <CloseIcon color="warning" fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </HoverPopover>
    </>
  );
};
