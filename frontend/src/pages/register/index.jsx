import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { http } from '../../util/http';
import authStore from '../../store/auth';
import alertStore from '../../store/alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // store all the validation errors
    const newErrors = {};

    // name checking
    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    // email checing
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter valid email';
    }

    // password checking
    if (!password.trim()) {
      newErrors.password = 'Please enter your password';
    }

    // confirm password checking
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Password does not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    // submit register request
    const data = { email, password, name };
    const res = await http('/admin/auth/register', 'POST', data, false);
    if (res.token) {
      authStore.getState().setToken(res.token);
      alertStore.getState().openAlert('Register successfully', 'success');
      // redirect to home page after register successfully
      setInterval(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      // register fail and showing error message
      alertStore.getState().openAlert(res.error, 'error');
    }
  };

  return (
    <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant='h5' align='center' gutterBottom>
            Register Page
          </Typography>

          <form onSubmit={handleRegister} method='POST'>
            <TextField
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
              label='Name'
              variant='outlined'
              fullWidth
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              label='Password'
              variant='outlined'
              type='password'
              fullWidth
              margin='normal'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              label='Confirm Password'
              variant='outlined'
              type='password'
              fullWidth
              margin='normal'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button type='submit' sx={{ marginTop: '1rem' }} variant='contained' color='primary' fullWidth>
              Register
            </Button>
          </form>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Typography variant='body2'>
              <Link to='/login' style={{ textDecoration: 'none', color: 'blue' }}>
                Go login
              </Link>
            </Typography>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
