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
    <form>
      <label htmlFor="name">
        Nome:
        <input
          value={ name }
          name="name"
          type="text"
          data-testid="admin_manage__input-name"
          onChange={ (e) => handleName(e) }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          value={ email }
          name="email"
          type="text"
          data-testid="admin_manage__input-email"
          onChange={ (e) => handleEmail(e) }
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          value={ password }
          name="password"
          type="text"
          data-testid="admin_manage__input-password"
          onChange={ (e) => handlePassword(e) }
        />
      </label>

      <label htmlFor="role">
        Role
        <select
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
