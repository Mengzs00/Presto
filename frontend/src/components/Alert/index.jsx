import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import AlertMui from '@mui/material/Alert';
import alertStore from '../../store/alert'

const Alert = () => {
  const { vertical, horizontal, isOpen, message, severity, closeAlert } = alertStore();
  useEffect(() => {

  }, [isOpen]);
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={closeAlert} anchorOrigin={{ vertical: vertical || 'top', horizontal: horizontal || 'center' }}>
      <AlertMui onClose={closeAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </AlertMui>
    </Snackbar>
  );
};

export default Alert;
