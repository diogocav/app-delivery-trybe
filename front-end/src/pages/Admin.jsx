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
    const result = await fetchApi(
      'DELETE',
      `admin/delete/${userId}`,
      userInfo.token,
    );
    console.log(result);
    const newUserList = usersList.filter((user) => user.name !== userName);
    setUsersList(newUserList);
    setValidate({ message: result.message });
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
  };

  const renderAlert = () => {
    console.log(validate);

    if (validate.message === 'account created') {
      return (
        <Alert severity="success" onClose={ () => { setValidate({}); } }>
          <AlertTitle>Success</AlertTitle>
          Account created successfully!
        </Alert>
      );
    }

    if (validate.errorMessage) {
      return (
        <Alert
          onClose={ () => { setValidate({}); } }
          severity="error"
          data-testid="admin_manage__element-invalid-register"
        >
          <AlertTitle>Error</AlertTitle>
          {validate.errorMessage}
        </Alert>
      );
    }

    if (validate.message === 'Finished') {
      return (
        <Alert severity="success" onClose={ () => { setValidate({}); } }>
          <AlertTitle>Success</AlertTitle>
          User removed successfully!
        </Alert>
      );
    }
  };

  return (
    <section className="flex flex-col h-full place-items-center">
      <NavBarAdmin />
      <div className="w-3/12 mt-2">
        {
          renderAlert()
        }
      </div>
      <div className="flex flex-col w-3/4 gap-4 p-4">
        <h2>CADASTRAR NOVO USUÁRIO</h2>
        <RegisterForm
          registerForm={ { name, email, password, role } }
          handleName={ handleName }
          handleEmail={ handleEmail }
          handlePassword={ handlePassword }
          handleRole={ handleRole }
          handleClickFinishRegister={ handleClickFinishRegister }
          setRole={ setRole }
        />
      </div>
      <div className="flex flex-col w-3/4 gap-4 p-4">
        <h2>LISTA DE USUÁRIOS</h2>
        <table
          className="flex flex-col place-items-center
          border-black border-2 rounded-md gap-2"
        >
          <thead className="flex w-full justify-between">
            <th className="w-20 text-center">ITEM</th>
            <th className="w-1/5 text-center">NOME</th>
            <th className="w-1/5 text-center">E-MAIL</th>
            <th className="w-24 text-center">TIPO</th>
            <th className="w-1/5 text-center">EXCLUIR</th>
          </thead>
          <tbody
            className="flex flex-col gap-2 w-full px-8"
          >
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
    </section>
  );
}
