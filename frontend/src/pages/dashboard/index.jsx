import { useState, useEffect } from 'react';
import { TOKEN } from '../../util/config';
import { getItem } from '../../util/localCache';
import authStore from '../../store/auth';
import alertStore from '../../store/alert';
import Presentation from '../../components/Presentation';
import {
  Box,
  Alert
} from '@mui/material';
import { http } from '../../util/http';

function Dashboard () {
  const [presentationList, setPresentationList] = useState([]);
  const token = authStore.getState().getToken() || getItem(TOKEN);

  // get all the presentations of the current user
  const getPresentationList = async () => {
    const res = await http('/store');
    if (!res.error) {
      const store = res.store;
      if (store.presentations) {
        setPresentationList(Object.values(store.presentations));
      }
    } else {
      alertStore.getState().openAlert(res.error, 'error');
    }
  }

  useEffect(() => {
    if (token) {
      getPresentationList();
    }
  }, [token]);

  return (
    <>
      {
        token ? (
          <Box sx={{ width: '100%', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {
              presentationList.length > 0 ? (presentationList.map((presentation, index) => (<Presentation key={index} presentation={presentation} />))) : (<Alert sx={{ width: '100%' }} severity='warning'>No presentations found</Alert>)
            }
          </Box>
        ) : (<></>)
      }
    </>
  );
}

export default Dashboard;
