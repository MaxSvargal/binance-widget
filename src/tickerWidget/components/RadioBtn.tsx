import React, { FC } from 'react';

type IProps = React.InputHTMLAttributes<HTMLInputElement>;

export const RadioBtn: FC<IProps> = ({ children, id, ...rest }) => {
  return (
    <div>
      <label htmlFor={id}>
        {children}
        <input type="radio" id={id} {...rest} />
      </label>
    </div>
  );
};
