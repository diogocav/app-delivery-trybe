import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Context from './Context';
import fetchApi from '../services/fetchApi';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledR, setIsDisabledR] = useState(true);
  const [isDisabledLoginError, setIsDisabledLoginError] = useState(false);
  const [isDisabledRegisterError, setIsDisabledRegisterError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const verifyBtn = () => {
      const validEmail = /\S+@\S+\.\S+/;
      const verifyEmail = validEmail.test(email);
      const numeroMin = 6;
      const numeroName = 12;
      const verifyName = name.length >= numeroName;
      const verifyPassword = password.length >= numeroMin;
      if ((verifyName && verifyEmail && verifyPassword)) {
        return setIsDisabledR(false);
      }
      if ((verifyPassword && verifyEmail)) {
        setIsDisabledR(true);
        return setIsDisabled(false);
      }
      setIsDisabled(true);
      return setIsDisabledR(true);
    };
    verifyBtn();
  }, [email, password, name]);

  const handleEmail = useCallback(({ target }) => {
    setEmail(target.value);
  }, [setEmail]);

  const handlePassword = useCallback(({ target }) => {
    setPassword(target.value);
  }, [setPassword]);

  const handleName = useCallback(({ target }) => {
    setName(target.value);
  }, [setName]);

  const handleInputChange = useCallback(({ target }) => {
    setValue(target.value);
  }, [setValue]);

  const handleClickLogin = useCallback(async () => {
    const result = await fetchApi('POST', 'login', { email, password });
    if (result.message !== undefined) setIsDisabledLoginError(true);
    if (result.token) {
      const { token } = result;
      const decoded = jwtDecode(token);
      history.push('/customer/products');
      localStorage.setItem('user', JSON.stringify({
        ...decoded.data,
        token }));
    }
    // localStorage.setItem('user', JSON.stringify({ email }));
  }, [setIsDisabledLoginError, email, password, history]);

  const handleClickRegister = useCallback(async () => {
    const result = await fetchApi('POST', 'register', { name, email, password });
    if (result.message === 'account created') {
      history.push('/customer/products');
    } else {
      setIsDisabledRegisterError(true);
    }
  }, [setIsDisabledRegisterError, name, email, password, history]);

  const context = useMemo(() => ({
    value,
    email,
    password,
    name,
    isDisabled,
    isDisabledR,
    isDisabledLoginError,
    isDisabledRegisterError,
    handleName,
    handleEmail,
    handlePassword,
    handleClickLogin,
    handleClickRegister,
    handleInputChange,
  }), [
    value,
    name,
    email,
    password,
    isDisabled,
    isDisabledR,
    isDisabledLoginError,
    isDisabledRegisterError,
    handleName,
    handleEmail,
    handlePassword,
    handleClickLogin,
    handleClickRegister,
    handleInputChange,
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
