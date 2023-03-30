const registerUrl = 'http://localhost:3001/register';

const registerFetch = async (name, email, password) => {
  const result = await fetch(
    registerUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    },
  )
    .then((response) => response.json())
    .catch((error) => error);

  return result;
};

export default registerFetch;
