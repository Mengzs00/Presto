import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  FormControlLabel
} from '@mui/material';
import { http } from '../../../../util/http';
import { getUUID } from '../../../../util/uuid';
import alertStore from '../../../../store/alert';
const label = { inputProps: { 'aria-label': 'Size switch' } };
const AddVideoDialog = ({ open, handleClose, presentationId, slideId }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [url, setUrl] = useState('');
  const [autoPlayed, setAutoPlayed] = useState(false);
  const [errors, setErrors] = useState({});
  const fetchStore = async () => {
    const res = await http('/store');
    if (!res.error) {
      return res.store;
    } else {
      alertStore.getState().openAlert(res.error, 'error');
      return null;
    }
  }

  const updateStore = async (store) => {
    const res = await http('/store', 'PUT', { store });
    if (!res.error) {
      return null;
    } else {
      return res.error;
    }
  }
  const handleAddVideo = async () => {
    const newErrors = {};
    if (!/^\d+(\.\d+)?$/.test(width)) {
      newErrors.width = 'Please enter video width';
    }
    if (!/^\d+(\.\d+)?$/.test(height)) {
      newErrors.height = 'Please enter video height';
    }
    if (!url) {
      newErrors.url = 'Please enter video url';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const id = getUUID();
    const data = {
      id,
      width,
      height,
      url,
      autoPlayed
    }
    const store = await fetchStore('/store');
    if (store) {
      const presentations = store.presentations;
      const videos = presentations[presentationId].slides[slideId].videos;
      if (videos) {
        presentations[presentationId].slides[slideId].videos[id] = data;
      } else {
        presentations[presentationId].slides[slideId].videos = {};
        presentations[presentationId].slides[slideId].videos[id] = data;
      }
      store.presentations = presentations;
      const returnRes = await updateStore(store);
      if (!returnRes) {
        alertStore.getState().openAlert('Added video finished', 'success');
        handleClose();
      } else {
        alertStore.getState().openAlert(returnRes, 'error');
      }
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Width(%)'
            variant='outlined'
            fullWidth
            margin='dense'
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            error={!!errors.width}
            helperText={errors.width}
          />
          <TextField
            autoFocus
            label='Height(%)'
            variant='outlined'
            fullWidth
            margin='dense'
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            error={!!errors.height}
            helperText={errors.height}
          />
          <TextField
            autoFocus
            label='URL'
            variant='outlined'
            fullWidth
            margin='dense'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!errors.url}
            helperText={errors.url}
          />
          <FormControlLabel control={<Switch {...label} checked={autoPlayed} onChange={(e) => setAutoPlayed(e.target.checked)} size="small" />} label="Auto played" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddVideo} type='button'>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddVideoDialog;
