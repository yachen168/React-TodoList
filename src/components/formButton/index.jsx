import React from 'react';
import './index.scss';

const FormButton = ({children, className ,buttonType, clickHandler}) => {
  return (
    <button
      className={className}
      type={buttonType}
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}

export default FormButton
