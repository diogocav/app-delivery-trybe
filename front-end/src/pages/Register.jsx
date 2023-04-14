import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import fetchApi from '../services/fetchApi';
import { validateName, validateEmail, validatePassword } from '../helpers/validations';
import blackLogo from '../images/logo-birita-preto.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabledRegisterError, setIsDisabledRegisterError] = useState(false);
  const history = useHistory();

  const handleChange = (value, func) => func(value);

  // const validateName = (nameInput) => {
  //   const maxNameLength = 12;
  //   return nameInput.length >= maxNameLength;
  // };
  // const validateEmail = (emailInput) => {
  //   const validEmail = /\S+@\S+\.\S+/;
  //   return validEmail.test(emailInput);
  // };
  // const validatePassword = (passwordInput) => {
  //   const minPasswordLength = 6;
  //   return passwordInput.length >= minPasswordLength;
  // };

  const validateRegister = () => validateName(name)
    && validateEmail(email) && validatePassword(password);

  const handleClickRegister = useCallback(async () => {
    const result = await fetchApi('POST', 'register', '', { name, email, password });
    if (result.message === 'account created') {
      history.push('/customer/products');
    } else {
      setIsDisabledRegisterError(true);
    }
  }, [setIsDisabledRegisterError, name, email, password, history]);
  return (
    <div className="flex flex-col place-items-center h-full border-black border">
      <img className="h-1/4 my-10" src={ blackLogo } alt="Logo Trybirita." />
      <form
        className="h-2/4 flex flex-col place-items-center place-content-center gap-2
        border-black border-2 rounded-md mb-4"
      >
        <h1>Registro</h1>
        <input
          className="border-black border rounded w-3/4"
          data-testid="common_register__input-name"
          placeholder="Nome"
          value={ name }
          onChange={ ({ target: { value } }) => (handleChange(value, setName)) }
        />
        <input
          className="border-black border rounded w-3/4"
          data-testid="common_register__input-email"
          placeholder="seu-email@site.com.br"
          value={ email }
          onChange={ ({ target: { value } }) => (handleChange(value, setEmail)) }
        />
        <input
          className="border-black border rounded w-3/4"
          data-testid="common_register__input-password"
          placeholder="Senha"
          value={ password }
          onChange={ ({ target: { value } }) => (handleChange(value, setPassword)) }
        />
        <button
          className="border-black border rounded w-3/4 bg-darkYellow"
          data-testid="common_register__button-register"
          type="button"
          disabled={ !validateRegister() }
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
