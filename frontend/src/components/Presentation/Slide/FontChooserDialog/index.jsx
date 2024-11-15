import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { http } from '../../../../util/http';
import alertStore from '../../../../store/alert';

const FontChooserDialog = ({ presentationId, slideId, textId, open, handleClose, handleChangeFontFamlityFinish }) => {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [error, setError] = useState(null);
  const fetchStore = async () => {
    const res = await http('/store');
    if (!res.error) {
      return res.store.store;
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
  const fetchTextFont = useCallback(async () => {
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const slide = presentations[presentationId].slides[slideId];
      if (slide.texts && slide.texts[textId] && slide.texts[textId].fontFamily) {
        setFontFamily(slide.texts[textId].fontFamily);
      }
    }
  }, [presentationId, slideId, textId]);

  const handleChangeFont = async () => {
    if (!fontFamily) {
      setError('Please enter a font family');
      return;
    }
    const store = await fetchStore();
    if (store) {
      const presentations = store.presentations;
      const text = presentations[presentationId].slides[slideId]?.texts[textId];
      console.log('text: ', text, presentations[presentationId], slideId);
      if (text) {
        text.fontFamily = fontFamily;
        presentations[presentationId].slides[slideId].texts[textId] = text;
        store.presentations = presentations;
        const returnRes = await updateStore(store);
        if (!returnRes) {
          handleClose();
          handleChangeFontFamlityFinish();
          // window.location.href = `/presentation/${presentationId}`;
        } else {
          console.log('error', returnRes);
        }
      }
    }
    // console.log(name);
  }
  useEffect(() => {
    fetchTextFont();
  }, [fetchTextFont]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update slide font famlity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Font Famliy'
            variant='standard'
            fullWidth
            margin='dense'
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangeFont} type="button">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FontChooserDialog;
