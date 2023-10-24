import { Button, Typography } from '@mui/material';
import React from 'react';

const Rank = (props) => {

    const capitalizeFirst = (name) => {
        if (name){
            return name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            return "Guest"
        }
        
      };

    return(      
  <div>
    <Typography sx={{fontFamily:"Courier New",color:"white"}} variant="h5" component="h2">
        Hello {capitalizeFirst(props.name)},
        {props.name ? (
            <Typography sx={{fontFamily:"Courier New",color:"white"}} variant="h5" component="div">
            Your current entry count is
                    <Typography sx={{fontFamily:"Courier New",color:"white"}} variant="h3" component="div">
                        {props.count ? props.count : "0"}
                    </Typography>
            </Typography>
        ) : <Typography sx={{fontFamily:"Courier New",color:"white"}} variant="h5" component="div">
            sign in to see how many images you have detected so far !
        </Typography>} 
    </Typography>
   
</div>
    
    )

};

export default Rank;