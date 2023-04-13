import React from 'react';
import PropTypes from 'prop-types';

export default function UserRow({ user, index, handleClickRemoveItem = () => {} }) {
  const { name, email, role, id } = user;

  return (
    <tr>
      <td
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {+index + 1}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {role}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-remove-${index}` }
      >
        <button
          type="button"
          onClick={ () => handleClickRemoveItem(id, name) }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleClickRemoveItem: PropTypes.func,
};

UserRow.defaultProps = {
  handleClickRemoveItem: () => {},
};
