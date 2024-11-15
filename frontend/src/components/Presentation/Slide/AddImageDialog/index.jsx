import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { http } from '../../../../util/http';
import { getUUID } from '../../../../util/uuid';
import alertStore from '../../../../store/alert';

const AddImageDialog = ({ open, handleClose, presentationId, slideId }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
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
  const handleAddImage = async () => {
    console.log('submit image...');
    const newErrors = {};
    if (!/^\d+(\.\d+)?$/.test(width)) {
      newErrors.width = 'Please enter image width';
    }
    if (!/^\d+(\.\d+)?$/.test(height)) {
      newErrors.height = 'Please enter image height';
    }
    if (!url) {
      newErrors.url = 'Please enter image url';
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
      description
    }
    const store = await fetchStore('/store');
    if (store) {
      const presentations = store.presentations;
      const images = presentations[presentationId].slides[slideId].images;
      if (images) {
        presentations[presentationId].slides[slideId].images[id] = data;
      } else {
        presentations[presentationId].slides[slideId].images = {};
        presentations[presentationId].slides[slideId].images[id] = data;
      }
      store.presentations = presentations;
      const returnRes = await updateStore(store);
      if (!returnRes) {
        alertStore.getState().openAlert('Added image finished', 'success');
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
          <TextField
            autoFocus
            label='Description'
            variant='outlined'
            fullWidth
            margin='dense'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddImage} type='button'>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddImageDialog;
