import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
/* import { useHistory } from 'react-router-dom'; */
import Context from './Context';
import loginFetch from '../services/loginFetch';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledLoginError, setIsDisabledLoginError] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const history = useHistory(); */

  useEffect(() => {
    const verifyBtn = () => {
      const validEmail = /\S+@\S+\.\S+/;
      const verifyEmail = validEmail.test(email);
      const numeroMin = 6;
      const verifyPassword = password.length >= numeroMin;
      if ((verifyPassword && verifyEmail)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    verifyBtn();
  }, [email, password]);

  const handleEmail = useCallback(({ target }) => {
    setEmail(target.value);
  }, [setEmail]);

  const handlePassword = useCallback(({ target }) => {
    setPassword(target.value);
  }, [setPassword]);

  const handleClickLogin = useCallback(async () => {
    const result = await loginFetch(email, password);

    if (result.message !== undefined) setIsDisabledLoginError(true);
    setIsDisabledLoginError(false);
    // localStorage.setItem('user', JSON.stringify({ email }));
    // history.push('/meals');
  }, [setIsDisabledLoginError, email, password]);

  const context = useMemo(() => ({
    email,
    password,
    isDisabled,
    isDisabledLoginError,
    handleEmail,
    handlePassword,
    handleClickLogin,
  }), [
    email,
    password,
    isDisabled,
    isDisabledLoginError,
    handleEmail,
    handlePassword,
    handleClickLogin,
  ]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
