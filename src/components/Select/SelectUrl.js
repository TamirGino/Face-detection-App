import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels(props) {
  const [exampleUrl, setExampleUrl] = React.useState('');

  const handleChange = (event) => {
    setExampleUrl(event.target.value);
    props.copyLink(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }} >
        <InputLabel variant="filled" id="demo-select-small-label">Url ex.</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={exampleUrl}
          onChange={handleChange}
          sx={{backgroundColor: 'white !important', borderRadius:'5px',}}
        >
          
          <MenuItem value={'https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-little-girl-boy-standing-outside.jpg?t=1695668353616'}>
            First ex.</MenuItem>
          <MenuItem value={'https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-family-with-light-blue-shirts.jpg?t=1695668353616'}>
           Second ex.</MenuItem>
          <MenuItem value={'https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-three-men-sitting-in-van.jpg?t=1695668353616'}>
           Third ex.</MenuItem>
        </Select>
        {/* <FormHelperText>With label + helper text</FormHelperText> */}
      </FormControl>
      
    </div>
  );
}
