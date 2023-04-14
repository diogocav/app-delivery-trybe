import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateName, validateEmail, validatePassword } from '../helpers/validations';

export default function RegisterForm({
  registerForm,
  handleName,
  handleEmail,
  handlePassword,
  handleRole,
  handleClickFinishRegister,
  setRole,
}) {
  const { name, email, password, role } = registerForm;

  useEffect(() => {
    setRole('seller');
  }, [setRole]);

  const validateRegister = () => validateName(name)
    && validateEmail(email) && validatePassword(password);

  return (
    <form
      className="flex place-items-center justify-around
    border-black border-2 h-20 rounded-md gap-4 p-4"
    >
      <label
        htmlFor="name"
        className="flex flex-col w-1/6 gap-px"
      >
        Nome:
        <input
          className="border-black border rounded"
          value={ name }
          name="name"
          type="text"
          data-testid="admin_manage__input-name"
          onChange={ (e) => handleName(e) }
        />
      </label>

      <label
        htmlFor="email"
        className="flex flex-col w-1/6 gap-px grow"
      >
        Email:
        <input
          className="border-black border rounded"
          value={ email }
          name="email"
          type="text"
          data-testid="admin_manage__input-email"
          onChange={ (e) => handleEmail(e) }
        />
      </label>

      <label
        htmlFor="password"
        className="flex flex-col w-1/6 gap-px"
      >
        Password
        <input
          className="border-black border rounded"
          value={ password }
          name="password"
          type="text"
          data-testid="admin_manage__input-password"
          onChange={ (e) => handlePassword(e) }
        />
      </label>

      <label
        htmlFor="role"
        className="flex flex-col w-1/6 gap-px"
      >
        Role
        <select
          className="border-black border rounded"
          value={ role }
          name="role"
          data-testid="admin_manage__select-role"
          onChange={ (e) => handleRole(e) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>

      <button
        className="border-black border rounded w-1/6 h-12 bg-darkYellow text-center"
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ !validateRegister() }
        onClick={ () => handleClickFinishRegister() }
      >
        Cadastrar

      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  registerForm: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  handleName: PropTypes.func,
  handleEmail: PropTypes.func,
  handlePassword: PropTypes.func,
  handleRole: PropTypes.func,
  handleClickFinishRegister: PropTypes.func,
  setRole: PropTypes.func,
};

RegisterForm.defaultProps = {
  handleName: () => {},
  handleEmail: () => {},
  handlePassword: () => {},
  handleRole: () => {},
  handleClickFinishRegister: () => {},
  setRole: () => {},
};

/* admin_manage__input-name
- 66: admin_manage__input-email
- 67: admin_manage__input-password
- 68: admin_manage__button-register
- 69: admin_manage__select-role */
