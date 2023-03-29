const loginUrl = 'https://www.http://localhost:3001/register';

export default regiterFetch = async (name, email, password) => {
  const result = fetch(
    loginUrl,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    },
  )
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);

  console.log(result);
  return result;
};
