import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function LoginDialog({ history }) {
  const { setCurrentUser } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      sessionStorage.setItem('user', response.data);
      setCurrentUser(response.data);
      handleClose();
      history.push('/');
    } catch (error) {
      alert('Login Error: ', error.error);
    }
  };

  return (
    <div>
      <p className="navbar-login" onClick={handleClickOpen}>
        Login
      </p>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <div className="top-dialog-form">
          <DialogTitle id="form-dialog-title">Welcome Back!</DialogTitle>
          <Button id="close-dialog-form" onClick={handleClose} color="primary">
            <CloseIcon />
          </Button>
        </div>
        <form onSubmit={handleLogin}>
          <DialogContent>
            <TextField
              onChange={handleChange}
              autoFocus
              required
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              autoComplete="off"
              name="email"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              required
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              autoComplete="off"
            />
          </DialogContent>

          <Typography>
            <Checkbox defaultChecked color="primary" variant="body1" />
            Remember Me
          </Typography>

          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="Primary"
              size="large"
            >
              Login
            </Button>
          </DialogActions>
          <Typography align="center" role="button" variant="body1">
            Forgot password?
          </Typography>
        </form>
      </Dialog>
    </div>
  );
}
