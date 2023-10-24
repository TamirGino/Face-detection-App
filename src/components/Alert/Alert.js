import { Snackbar, Alert } from '@mui/material';
import React, {useState, useEffect} from 'react';


const MuiAlert = (props) => {

    useEffect(() => {
        setOpenAlert(true);
    }, [openAlert]);

  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

    return(
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} 
        anchorOrigin={{
        vertical: 'top', 
        horizontal: 'center', 
      }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {props.message} 
        </Alert>
      </Snackbar>
    )

};

export default MuiAlert;