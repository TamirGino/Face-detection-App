import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';

export default function Register(props) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };


  const isValidForm = () => {
    if (email === "" ||  name === "" || password === "") {
        setAlertMsg("All fields are required !");
        setOpenAlert(true);
        return true;
  } else if(!isValidEmail()) {
      setAlertMsg("Invalid Email")
      setOpenAlert(true);
      return true;
  }else{
    return false;
  }   
  }


  const isValidEmail = () => {
    return /\S+@\S+\.\S+/.test(email);
  }


  const fetchNewUser = async () => {
    try {
        const resp = await fetch('https://face-detection-wn85.onrender.com/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password:password,
            name: name,
          })
        });
        if (resp.status === 200) {
        const user = await resp.json();
          props.loadUser(user);
          props.handleRoutes("home");
        } else if (resp.status === 400) { 
          const errorResponse = await resp.json();
          setAlertMsg("User already exist! Please sign in.")
          setOpenAlert(true);
        } else {
          console.log('Unexpected response:', resp.status);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
};

  const handleSubmit = (event) => {
    if(isValidForm()){
      console.log("NOT FETCHING")
    } else {
      fetchNewUser();
    }
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPassChange = (event) => {
    setPassword(event.target.value)
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  return (

      <Container sx={{
        border:"1px solid black",
        backgroundColor: 'black',
        backgroundImage: `
          radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
          radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
          radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
          radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)
        `,
        backgroundSize: '550px 550px, 350px 350px, 250px 250px, 150px 150px',
        backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px',
        borderRadius:'10px',
      }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{color:"white"}} component="h1" variant="h5">
            Register
          </Typography>
          <Box sx={{ mt: 1 }}>
          <TextField
              onChange={onNameChange}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
              sx={{
                backgroundColor: 'white', borderRadius:'5px',
              }}
            />
            <TextField
              onChange={onEmailChange}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{
                backgroundColor: 'white', borderRadius:'5px',
              }}
            />
            <TextField
              onChange={onPassChange}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                backgroundColor: 'white', borderRadius:'5px',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            
          </Box>
          
        </Box>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} 
        anchorOrigin={{
        vertical: 'top', 
        horizontal: 'center', 
      }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {alertMsg} 
        </Alert>
      </Snackbar>
        
        
      </Container>
  );
}