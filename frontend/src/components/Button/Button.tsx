import React from 'react';
import { CompType } from '../../types';
import './Button.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: CompType;
  outlined?: boolean;
}

const Button = ({
  type = 'button',
  className,
  buttonType = 'info',
  outlined,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button
      data-testid='Button'
      type={type}
      className={`Button ${buttonType} ${outlined ? 'outlined' : ''} ${
        className ?? ''
      }`}
      {...rest}
    ></button>
  );
};

export default Button;
