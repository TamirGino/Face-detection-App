import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../ImageLinkForm/ImageLink.module.css'
import Card from '../Wraper/Card';
import SelectLabels from '../Select/SelectUrl';

const ImageLinkForm = (props) => {
  const additionalBoxStyle = {
    height:'100px',
    borderRadius:'10px',
    display: 'flex',  
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10em',
    padding:'10px',
    width:'70%',
  };

  const [inputUrl,setInputUrl] = useState("")
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const onInputChange = (event) => {
    setInputUrl(event.target.value)
  }

  const copyLink = (url) => {
    setInputUrl(url)
  }

  const handleDetectBtn = () =>{
    const imageUrlRegex = /\.(jpeg|jpg|gif|png)/i;
    const isValidImageUrl = imageUrlRegex.test(inputUrl);
    if(isValidImageUrl){
      props.sendImageUrl(inputUrl);
    } else {
      setOpenAlert(true);
    }
  }
  
  return(      
  
    <div className='container'>
      <Typography sx={{fontFamily:"Courier New"}} variant="h5" >
        This Magic Brain will detect faces in your pictures. Git it a try ! 
      </Typography>
        <Card additionalStyle={additionalBoxStyle}>
        <div className={styles.input_btn} >
        <TextField id="outlined-basic" value={inputUrl} label="Enter your Url here" variant="filled" type={"url"} sx={{
        backgroundColor: 'white', borderRadius:'5px', flex:'80%'
      }} onChange={onInputChange} />
        <Button variant='outlined' onClick={handleDetectBtn} sx={{color:'white',flex: '20%'}}>detect</Button>
        </div>

        <div>
          <SelectLabels copyLink={copyLink} />
        </div>
        </Card>
      <Snackbar open={openAlert} autoHideDuration={6000} on onClose={handleClose} 
        anchorOrigin={{
        vertical: 'top', 
        horizontal: 'center', 
      }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          Please enter a valid image URL 
        </Alert>
      </Snackbar>
    </div>
    
    )

};

export default ImageLinkForm;