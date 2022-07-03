import { navigate } from '@reach/router';
import React from 'react';

export const ErrorPage: React.FC = () => {
  function handlerClick() {
    navigate(-1);
  }
  return (
    <>
      <button onClick={handlerClick}>Return back</button>
    </>
  );
};
