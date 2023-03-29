const loginUrl = 'https://www.http://localhost:3001/login';

export default loginFetch = async (email, password) => {
  const result = fetch(
    loginUrl,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);

  console.log(result);
  return result;
};
