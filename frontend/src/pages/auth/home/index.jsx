import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';

function Dashboard () {
  const [open, setOpen] = useState(false);
  const handleCreatePresentation = () => {
    setOpen(true);
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <Fab onClick={handleCreatePresentation} variant='extended' size='small' color='primary'>
        Create presentation
      </Fab>
    </>
  );
}

export default Dashboard;
