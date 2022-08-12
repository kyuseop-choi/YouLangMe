import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from '@emotion/styled';

const MyBox = styled(Box)`
  background-color: purple !important;
  font-size: 100px;

  transform: translateZ(0px);
`;

const actions = [
  { icon: <HelpIcon />, name: 'Help' },
  { icon: <LogoutIcon />, name: 'Quit' },
];

export default function MenuSpeedDial(props) {
  const handleAction = (event) => {
    switch (event.currentTarget.ariaLabel) {
      case 'Help':
        props.help();
        break;
      case 'Quit':
        props.quit();
        break;

      default:
        return;
    }
  };
  return (
    <MyBox>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleAction}
          />
        ))}
      </SpeedDial>
    </MyBox>
  );
}
