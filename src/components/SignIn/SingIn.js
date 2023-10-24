import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiAlert from '../Alert/Alert';
import { Alert, Snackbar } from '@mui/material';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


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
           //props.loadUser(data);
          props.handleRoutes("home");
          props.loadUser(data.user);
          console.log("LOGGED IN SUUCSEED !")
          console.log(data.user);
        } else {
          setAlertMsg("All fields are required !");
          setOpenAlert(true);
          console.log(data);
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
      // console.log("Please fill in the all form");
      setAlertMsg("All fields are required !");
      setOpenAlert(true);
    } else{
      fetchData();
      console.log(email, password)
    }
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPassChange = (event) => {
    setPassword(event.target.value)
  }

  return (

    // <ThemeProvider theme={defaultTheme}>
    // <Card additionalStyle={additionalBoxStyle}>
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
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
              autoFocus
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
              Sign In
            </Button>
            
          </Box>
          
        </Box>
         {/* {openAlert && <MuiAlert message={"Email or Password does'nt exist. Please try again."}/>}      */}
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} 
        anchorOrigin={{
        vertical: 'top', 
        horizontal: 'center', 
      }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {alertMsg} 
        </Alert>
      </Snackbar>
        
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}