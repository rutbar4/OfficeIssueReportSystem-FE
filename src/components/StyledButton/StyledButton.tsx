import { Button } from '@mui/material';
import React from 'react';

type Props = {
    width: string;
    height: string;
    backgroundColor: string;
    color: string;
    borderRadius: string;
    border: string;
    cursor: string;
    fontSize: string;
  onClick?: () => void;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
}

const StyledButton: React.FC<Props> = ({
    width,
    height,
    backgroundColor,
    color,
    borderRadius,
    border,
    cursor,
    fontSize,
    children,
    startIcon,
    onClick
  }) => {
  return (
    <Button
      type="button"
      startIcon={startIcon}
      onClick={onClick}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        color: color,
        borderRadius: borderRadius,
        border: border,
        cursor:cursor,
        fontSize: fontSize,
        textTransform: 'capitalize',
      }}
    >
    {children}
    </Button>
  );
};

export default StyledButton;
