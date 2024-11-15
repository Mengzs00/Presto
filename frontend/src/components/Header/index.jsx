import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import authStore from '../../store/auth';
import { http } from '../../util/http';
import { getItem } from '../../util/localCache';
import { TOKEN } from '../../util/config';
import PresentationCreate from '../Presentation/Create';

// the dropdown menu items
const dropdownMenuList = [
  {
    text: 'Logout',
    handleClick: async () => {
      const res = await http('/admin/auth/logout', 'POST');
      if (!res.error) {
        authStore.getState().clear();
        window.location.href = '/dashboard';
      }
    }
  }
];

// header bar component
export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const token = authStore.getState().getToken() || getItem(TOKEN);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <PresentationCreate open={open} handleClose={handleClose} />
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AdbIcon />
              <Typography
                variant='h6'
                noWrap
                component='a'
                href='/dashboard'
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Presto.com
              </Typography>
            </Box>
            {
              token ? (
                <>
                  <Box>
                    <Button onClick={() => { setOpen(true) }} color="inherit">New Presentation</Button>
                  </Box>
                  <Box>
                    <Tooltip title='Open settings'>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt='Avatar' src='/static/avatar/avatar.png' />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {dropdownMenuList.map((menuItem) => (
                        <MenuItem key={menuItem.text} onClick={menuItem.handleClick}>
                          <Typography textAlign='center'>{menuItem.text}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </>
              ) : (<></>)
            }
            {
              !token ? (
                <Box>
                  <Button onClick={() => { navigate('/login'); }} color="inherit">Login</Button>
                  <Button onClick={() => { navigate('/register'); }}  color="inherit">Register</Button>
                </Box>
              ) : (<></>)
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
