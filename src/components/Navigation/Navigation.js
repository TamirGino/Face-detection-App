import React, { useEffect, useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const Navigation = (props) => {
  const [navRoute,setNavRoute] = useState("")

  useEffect(() => {
    console.log(navRoute)
    const handleNav = () => {
      props.handleRoutes(navRoute);
    };

    handleNav();
}, [navRoute]);

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    display:'flex',
    position:'absolute',
    justifyContent:'flex-end',
    alignContent:'right',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));

  const actions = [
    { icon: <LoginIcon />, name: 'Login', route:'login' },
    { icon: <AppRegistrationIcon />, name: 'Register', route:'register' },
    { icon: <HomeIcon />, name: 'Home', route:'home' },
  ];

    return(
        
        <div 
        style={{ padding:'0px' }}
        >
            <div style={{}}>
            <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setNavRoute(action.route)}
            />
          ))}
        </StyledSpeedDial>
        </div>
        </div>
    )

};

export default Navigation;