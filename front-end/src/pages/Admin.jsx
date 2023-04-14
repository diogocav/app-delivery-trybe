import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import NavBarAdmin from '../components/NavBarAdmin';
import UserRow from '../components/UserRow';
import RegisterForm from '../components/RegisterForm';
import fetchApi from '../services/fetchApi';

export default function Admin() {
  const [usersList, setUsersList] = useState([]);
  const [validate, setValidate] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const currentUserInfo = JSON.parse(localStorage.getItem('user'));
    setUserInfo(currentUserInfo);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const getAllUsers = await fetchApi('GET', 'admin/users', userInfo.token);
      setUsersList(getAllUsers);
    }
    if (userInfo) fetchData();
  }, [userInfo]);

  useEffect(() => {}, [usersList, validate]);

  const handleClickRemoveItem = async (userId, userName) => {
    const result = await fetchApi('DELETE', 'admin/delete', userInfo.token, userId);
    const newUserList = usersList.filter((user) => user.name !== userName);
    setUsersList(newUserList);
    if (result.message === 'success') {
      return (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          User removed successfully!
        </Alert>
      );
    }
  };

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleRole = ({ target }) => {
    setRole(target.value);
  };

  const handleClickFinishRegister = async () => {
    const newUser = { name, email, password, role };

    const result = await fetchApi('POST', 'admin/new_user', userInfo.token, newUser);
    setValidate(result);

    usersList.push(newUser);
    setUsersList(usersList);

    // return (
    //   <Alert
    //     severity="error"
    //     data-testid="admin_manage__element-invalid-register"
    //   >
    //     <AlertTitle>Error</AlertTitle>
    //     {result.message}
    //   </Alert>
    // );
    return (
      <h1
        data-testid="admin_manage__element-invalid-register"
      >
        {result.message}
      </h1>
    );
  };
  /* admin_manage__element-invalid-register [Elemento oculto (Mensagens de erro)] */

  return (
    <div>
      <div>
        {validate.message
      && (
        <Alert
          severity="error"
          data-testid="admin_manage__element-invalid-register"
        >
          <AlertTitle>Error</AlertTitle>
          {validate.message}
        </Alert>
      )}
      </div>
      <NavBarAdmin />
      <h2>Cadastrar novo usuário</h2>
      <RegisterForm
        registerForm={ { name, email, password, role } }
        handleName={ handleName }
        handleEmail={ handleEmail }
        handlePassword={ handlePassword }
        handleRole={ handleRole }
        handleClickFinishRegister={ handleClickFinishRegister }
        setRole={ setRole }
      />
      <h2>Lista de usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usersList ? (
            usersList.map((user, index) => (
              <UserRow
                key={ index }
                user={ user }
                index={ index }
                handleClickRemoveItem={ handleClickRemoveItem }
              />
            ))
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
