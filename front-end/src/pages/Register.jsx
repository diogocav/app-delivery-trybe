import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Register() {
  const {
    name,
    email,
    password,
    handleName,
    handleEmail,
    handlePassword,
    handleClickRegister,
    isDisabledR,
    isDisabledRegisterError,
  } = useContext(Context);
  return (
    <div className="login">
      <form>
        <h3 className="register-name">Nome</h3>
        <input
          data-testid="common_register__input-name"
          placeholder="Seu nome"
          value={ name }
          onChange={ handleName }
        />
        <h3 className="register-email">Email</h3>
        <input
          data-testid="common_register__input-email"
          placeholder="seu-email@site.com.br"
          value={ email }
          onChange={ handleEmail }
        />
        <h3 className="register-password">Senha</h3>
        <input
          data-testid="common_register__input-password"
          placeholder="**********"
          value={ password }
          onChange={ handlePassword }
        />

        <button
          className="button"
          data-testid="common_register__button-register"
          type="button"
          disabled={ isDisabledR }
          onClick={ handleClickRegister }
        >
          CADASTRAR
        </button>
        {
          isDisabledRegisterError && (
            <h3 data-testid="common_register__element-invalid_register">
              O cadastro não foi realizado com sucesso.
            </h3>)
        }
      </form>
    </div>
  );
}
