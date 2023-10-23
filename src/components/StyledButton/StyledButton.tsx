import { Button } from '@mui/material';
import React from 'react';

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
        backgroundColor: '#0E166E',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'gray',
        color: 'black',
      },
    };

    const buttonSizeStyles = {
      small: {
        width: '100px',
        height: '30px',
        fontSize: '12px',
        borderRadius: '5px',
      },
      medium: {
        width: '158px',
        height: '38px',
        fontSize: '14px',
        borderRadius: '30px',
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
        border: 'none',
      }}
    >
    {children}
    </Button>
  );
};

export default StyledButton;


