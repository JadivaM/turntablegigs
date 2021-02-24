import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export default function SignupDialog({ history }) {
  const { push } = useHistory();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(null);
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/', formData);
      sessionStorage.setItem('user', response.data);
      setCurrentUser(response.data.user);
      handleClose();
      push('/');
    } catch (error) {
      alert('SignUp Error: ', error.error);
    }
  };

  return (
    <div>
      <p onClick={handleClickOpen}>Signup</p>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <div className="top-dialog-form">
          <DialogTitle id="form-dialog-title">Create your account</DialogTitle>
          <Button id="close-dialog-form" onClick={handleClose} color="primary">
            <CloseIcon />
          </Button>
        </div>
        <form id="signup-form" onSubmit={handleSignUp}>
          <DialogContent>
            <div className="signup-radio">
              <p className="radio-prompt">I am a:</p>

              <input
                className="radio-button"
                type="radio"
                id="dj-selection"
                name="dj"
                value="true"
              ></input>
              <label className="radio-button">DJ</label>

              <input
                className="radio-button"
                type="radio"
                id="venue-selection"
                name="dj"
                value="false"
              ></input>
              <label className="radio-button">Venue</label>
            </div>
            <TextField
              onChange={handleChange}
              autoFocus
              required
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              autoComplete="off"
              name="name"
            />
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
              name="password"
            />
            <TextField
              onChange={handleChange}
              autoFocus
              required
              margin="dense"
              id="name"
              label="Confirm password"
              type="password"
              fullWidth
              autoComplete="off"
              name="password"
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="Primary"
              size="large"
            >
              Create account
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
