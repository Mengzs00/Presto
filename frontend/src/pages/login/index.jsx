import { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import authStore from '../../store/auth';
import alertStore from '../../store/alert'
import { http } from '../../util/http'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    // email checking
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    }

    // password checking
    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
    }

    // showing the error message if they exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = { email, password };
    const res = await http('/admin/auth/login', 'POST', data, false);
    if (res.token) {
      // record the token into store
      authStore.getState().setToken(res.token);
      alertStore.getState().openAlert('Successfully', 'success');
      setInterval(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } else {
      alertStore.getState().openAlert('Your account or password is error.', 'error');
    }
  };

  return (
    <>
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <Grid item xs={10} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant='h5' align='center' gutterBottom>
              Login Page
            </Typography>

            <form onSubmit={handleLogin} method='POST'>
              <TextField
                id='email'
                label='Email'
                variant='outlined'
                fullWidth
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                id='password'
                label='Password'
                type='password'
                variant='outlined'
                fullWidth
                margin='normal'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />

              <Button type='submit' id='login-btn' variant='contained' color='primary' fullWidth>
                Login
              </Button>
            </form>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Typography variant='body2'>
                <Link to='/register' style={{ textDecoration: 'none', color: 'blue' }}>
                  Register
                </Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
