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

const AddTextDialog = ({ open, handleClose, presentationId, slideId }) => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [colour, setColour] = useState('');
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
  const handleAddText = async () => {
    const newErrors = {};
    if (!/^\d+(\.\d+)?$/.test(width)) {
      newErrors.width = 'Please enter text width';
    }
    if (!/^\d+(\.\d+)?$/.test(height)) {
      newErrors.height = 'Please enter text height';
    }
    if (!text) {
      newErrors.text = 'Please enter text content';
    }
    if (!/^\d+(\.\d+)?$/.test(fontSize)) {
      newErrors.fontSize = 'Please enter text font size';
    }
    if (!colour) {
      newErrors.colour = 'Please enter text colour';
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
      text,
      fontSize,
      colour
    }
    const store = await fetchStore('/store');
    if (store) {
      const presentations = store.presentations;
      const texts = presentations[presentationId].slides[slideId].texts;
      if (texts) {
        presentations[presentationId].slides[slideId].texts[id] = data;
      } else {
        presentations[presentationId].slides[slideId].texts = {};
        presentations[presentationId].slides[slideId].texts[id] = data;
      }
      store.presentations = presentations;
      const returnRes = await updateStore(store);
      if (!returnRes) {
        alertStore.getState().openAlert('Added text finished', 'success');
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
        <DialogTitle>Add text</DialogTitle>
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
            label='Text'
            variant='outlined'
            fullWidth
            margin='dense'
            value={text}
            onChange={(e) => setText(e.target.value)}
            error={!!errors.text}
            helperText={errors.text}
          />
          <TextField
            autoFocus
            label='Font Size(em)'
            variant='outlined'
            fullWidth
            margin='dense'
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            error={!!errors.fontSize}
            helperText={errors.fontSize}
          />
          <TextField
            autoFocus
            label='Colour(HEX color code)'
            variant='outlined'
            fullWidth
            margin='dense'
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            error={!!errors.colour}
            helperText={errors.colour}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddText} variant='outlined' type='button'>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddTextDialog;
