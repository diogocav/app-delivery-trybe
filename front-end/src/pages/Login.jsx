import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import fetchApi from '../services/fetchApi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabledLoginError, setIsDisabledLoginError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    if (data?.token) history.push('/customer/products');
  }, [history]);

  const handleChange = (value, func) => func(value);
  const validateEmail = (emailInput) => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(emailInput);
  };

  const validatePassword = (passwordInput) => {
    const minPasswordLength = 6;
    return passwordInput.length >= minPasswordLength;
  };

  const validateLogin = () => validateEmail(email) && validatePassword(password);

  const handleClickLogin = useCallback(async () => {
    const result = await fetchApi('POST', 'login', '', { email, password });
    if (result.message !== undefined) setIsDisabledLoginError(true);
    if (result.token) {
      const { token } = result;
      const decoded = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify({
        ...decoded.data,
        token,
      }));
      if (decoded.data.role === 'customer') {
        history.push('/customer/products');
      }
      if (decoded.data.role === 'seller') {
        history.push('/seller/orders');
      }
      if (decoded.data.role === 'administrator') {
        history.push('/admin/manage');
      }
    }
  }, [setIsDisabledLoginError, email, password, history]);
  return (
    <div className="login">
      <form>
        <h1 className="login-title">Login</h1>
        <input
          data-testid="common_login__input-email"
          placeholder="E-mail"
          value={ email }
          onChange={ ({ target: { value } }) => (handleChange(value, setEmail)) }
        />
        <input
          className="password"
          type="password"
          data-testid="common_login__input-password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target: { value } }) => (handleChange(value, setPassword)) }
        />
        <button
          className="button"
          data-testid="common_login__button-login"
          type="button"
          disabled={ !validateLogin() }
          onClick={ handleClickLogin }
        >
          login
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            register
          </button>
        </Link>
        {
          isDisabledLoginError && (
            <h3 data-testid="common_login__element-invalid-email">
              Login não foi realizado com sucesso
            </h3>)
        }
      </form>
    </div>
  );
}
