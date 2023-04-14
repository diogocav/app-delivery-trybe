import React from 'react';
import PropTypes from 'prop-types';

export default function UserRow({ user, index, handleClickRemoveItem = () => {} }) {
  const { name, email, role, id } = user;

  return (
    <tr
      className="flex justify-between place-items-center gap-4
    my-2"
    >
      <td
        className="text-center"
        data-testid={
          `admin_manage__element-user-table-item-number-${index}`
        }
      >
        {+index + 1}
      </td>
      <td
        className="text-center"
        data-testid={ `admin_manage__element-user-table-name-${index}` }
      >
        {name}
      </td>
      <td
        className="text-center"
        data-testid={ `admin_manage__element-user-table-email-${index}` }
      >
        {email}
      </td>
      <td
        className="text-center"
        data-testid={ `admin_manage__element-user-table-role-${index}` }
      >
        {role}
      </td>
      <td
        className="text-center"
        data-testid={ `admin_manage__element-user-table-remove-${+index + 1}` }
      >
        <button
          className="text-center bg-darkYellow border-black border-2 rounded w-20 h-8"
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
