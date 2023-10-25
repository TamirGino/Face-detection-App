import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function SignIn(props) {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("")

  const fetchData = async () => {
    try {
        const resp = await fetch('https://face-detection-wn85.onrender.com/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: email,
            password:password,
          })
        });
        const data = await resp.json();
        if (resp.status === 200){
          props.handleRoutes("home");
          props.loadUser(data.user);
        } else {
          setAlertMsg("All fields are required !");
          setOpenAlert(true);
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleSubmit = (event) => {
    if (email === "" || password === "") {
      setAlertMsg("All fields are required !");
      setOpenAlert(true);
    } else{
      fetchData();
    }
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPassChange = (event) => {
    setPassword(event.target.value)
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
        height:'100%',
      }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography sx={{color:"white"}} component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 5, display:'flex', flexFlow:'column wrap', gap:'20px', width:'100%', justifyContent:'center' }}>
            <TextField
              onChange={onEmailChange}
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                backgroundColor: 'white', borderRadius:'5px',
              }}
            />
            <TextField
              onChange={onPassChange}
              variant="filled"
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
              sx={{ mt: 5, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
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