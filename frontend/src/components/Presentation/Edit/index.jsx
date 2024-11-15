import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { http } from '../../../util/http';
import alertStore from '../../../store/alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fileToDataUrl } from '../../../util/helper'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PresentationEdit = ({ id, open, handleClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState(null);
  const handlePresentationEdit = async () => {
    if (!name) {
      setError('Please enter presentation title.');
      return;
    }
    const res = await http('/store');
    if (!res.error) {
      const store = res.store;
      const presentations = store.presentations;
      if (presentations && Object.keys(presentations).length) {
        if (presentations[id]) {
          presentations[id].name = name;
          if (description) {
            presentations[id].description = description;
          }
          if (thumbnail) {
            presentations[id].thumbnail = thumbnail;
          }
        }
      }
      store.presentations = presentations;
      const res1 = await http('/store', 'PUT', { store });
      if (!res1.error) {
        alertStore.getState().openAlert('Edit finished.', 'success');
        handleClose();
      } else {
        alertStore.getState().openAlert(res1.error, 'error');
      }
    } else {
      alertStore.getState().openAlert(res.error, 'error');
    }
  }

  const fetchPresentation = useCallback(async () => {
    const res = await http('/store');
    if (!res.error) {
      const store = res.store;
      if (store.presentations && Object.keys(store.presentations).length) {
        setName(store.presentations[id].name);
        setDescription(store.presentations[id].description);
        setThumbnail(store.presentations[id].thumbnail);
      }
    } else {
      alertStore.getState().openAlert(res.error, 'error');
    }
  }, [id]);

  const handleUploadFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      fileToDataUrl(e.target.files[0]).then(imgSrc => {
        setThumbnail(imgSrc);
      });
    }
  }

  useEffect(() => {
    fetchPresentation();
  }, [fetchPresentation]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit presentation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='name'
            label='Name'
            variant='outlined'
            fullWidth
            margin='dense'
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
            id='description'
            label='Description'
            variant='outlined'
            fullWidth
            margin='dense'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Choose image
            <VisuallyHiddenInput
              type="file"
              onChange={handleUploadFileChange}
              multiple
            />
          </Button>
          {
            thumbnail ? (<Box style={{ width: '150px', height: '150px', marginTop: '1rem' }}><img style={{ width: '100%', height: '100%' }} src={thumbnail} /></Box>) : (<></>)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePresentationEdit} type="button">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PresentationEdit;
