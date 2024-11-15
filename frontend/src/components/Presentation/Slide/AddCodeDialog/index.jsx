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

const AddCodeDialog = ({ open, handleClose, presentationId, slideId }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState('');
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
  const handleAddCode = async () => {
    const newErrors = {};
    if (!/^\d+(\.\d+)?$/.test(width)) {
      newErrors.width = 'Please enter code width';
    }
    if (!/^\d+(\.\d+)?$/.test(height)) {
      newErrors.height = 'Please enter code height';
    }
    if (!code) {
      newErrors.code = 'Please enter code';
    }
    if (!/^\d+(\.\d+)?$/.test(fontSize)) {
      newErrors.fontSize = 'Please enter code font size';
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
      code,
      fontSize
    }
    const store = await fetchStore('/store');
    if (store) {
      const presentations = store.presentations;
      const codes = presentations[presentationId].slides[slideId].codes;
      if (codes) {
        presentations[presentationId].slides[slideId].codes[id] = data;
      } else {
        presentations[presentationId].slides[slideId].codes = {};
        presentations[presentationId].slides[slideId].codes[id] = data;
      }
      store.presentations = presentations;
      const returnRes = await updateStore(store);
      if (!returnRes) {
        alertStore.getState().openAlert('Added code finished', 'success');
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
            label='Code'
            variant='outlined'
            fullWidth
            multiline
            rows={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={!!errors.code}
            helperText={errors.code}
          />
          <TextField
            label='Font Size(em)'
            variant='outlined'
            fullWidth
            margin='dense'
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            error={!!errors.fontSize}
            helperText={errors.fontSize}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCode} type='button'>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddCodeDialog;
