import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { http } from '../../../util/http';
import { getUUID } from '../../../util/uuid';
import alertStore from '../../../store/alert';

const PresentationCreate = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const handlePresentationCreate = async () => {
    if (!name) {
      setError('Please enter name.');
      return;
    }
    const id = getUUID();
    // const slideId = getUUID();
    const data = {
      id,
      name,
      description,
      thumbnail: '/static/imgs/default-presentation-bg.jpg'
    }
    // // default add one empty slide
    // data['slides'] = {
    //   [slideId]: {
    //     texts: {},
    //     images: {},
    //     videos: {},
    //     codes: {}
    //   }
    // }
    // firstly fetch presentation list and then add new one into it
    const res = await http('/store');
    if (!res.error) {
      const store = res.store;
      console.log('store: ', store);
      let presentations = store.presentations;
      if (presentations) {
        presentations[id] = data;
      } else {
        presentations = {};
        presentations[id] = data;
      }
      store.presentations = presentations;
      // add new presentation to database
      const res1 = await http('/store', 'PUT', { store });
      if (!res1.error) {
        alertStore.getState().openAlert('Create successfully.', 'success');
        setName('');
        setDescription('');
        handleClose();
        // navigate('/dashboard');
        window.location.href='/dashboard';
      } else {
        alertStore.getState().openAlert(res1.error, 'error');
      }
    } else {
      alertStore.getState().openAlert(res.error, 'error');
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>New presentation</DialogTitle>
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
            multiline
            rows={3}
            margin='dense'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePresentationCreate} variant='outlined' type="button">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PresentationCreate;
