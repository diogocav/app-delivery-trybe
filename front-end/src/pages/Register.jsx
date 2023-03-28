import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Register() {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
    handleClick,
    isDisabled,
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
          onClick={ handleClick }
        >
          Login
        </button>
        <button
          className="button"
          data-testid="common_login__button-register "
          type="button"
        >
          Register
        </button>
      </form>
    </div>
  );
}
