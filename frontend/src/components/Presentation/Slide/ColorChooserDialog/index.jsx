import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { SketchPicker } from 'react-color';

const ColorChooserDialog = ({ open, handleClose, handleChangeColor }) => {
  const [color, setColor] = useState('#ffffff');
  const handleChange = (newColor) => {
    setColor(newColor.hex);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Change slide color</DialogTitle>
        <DialogContent>
          <SketchPicker color={color} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleChangeColor(color) } type="button">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ColorChooserDialog;
