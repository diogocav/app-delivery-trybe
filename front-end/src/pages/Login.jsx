import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function Login() {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
    handleClickLogin,
    isDisabled,
    isDisabledLoginError,
  } = useContext(Context);
  return (
    <div className="login">
      <form>
        <h1 className="login-title">Login</h1>
        <input
          data-testid="common_login__input-email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleEmail }
        />

        <input
          className="password"
          type="password"
          data-testid="common_login__input-password"
          placeholder="Password"
          value={ password }
          onChange={ handlePassword }
        />

        <button
          className="button"
          data-testid="common_login__button-login"
          type="button"
          disabled={ isDisabled }
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
