import { Button } from '@mui/material';
import React from 'react';

import {COLORS} from '../../values/colors';

type Props = {
  buttonType: 'primary' | 'secondary';
  buttonSize: 'large' | 'medium' | 'small';
  type: 'button' | 'submit';
  onClick?: () => void;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const StyledButton: React.FC<Props> = ({
    buttonType,
    buttonSize,
    type,
    children,
    startIcon,
    onClick
  }) => {

    const buttonStyles = {
      primary: {
        backgroundColor: COLORS.blue,
        color: 'white',
      },
      secondary: {
        backgroundColor: 'white',
        color: COLORS.blue ,
        borderColor: '#6B706D',
        borderWidth: '1px',
        borderStyle: 'solid'
      },
    };

    const buttonSizeStyles = {
      small: {
        width: '70px',
        height: '30px',
        fontSize: '12px',
        borderRadius: '35px',
        marginLeft: '10px'
      },
      medium: {
        width: '158px',
        height: '38px',
        fontSize: '14px',
        borderRadius: '30px',
        marginRight:'4px'
      },
      large: {
        width: '200px',
        height: '50px',
        fontSize: '16px',
        borderRadius: '35px',
      },
    };

  return (
    <Button
      type={type}
      startIcon={startIcon}
      onClick={onClick}
      style={{
        ...buttonStyles[buttonType],
        ...buttonSizeStyles[buttonSize],
        cursor: 'pointer',
        textTransform: 'capitalize',
      }}
    >
    {children}
    </Button>
  );
};

export default StyledButton;


