const registerUrl = 'http://localhost:3001/prodcuts';

const productsgetAllFetch = async () => {
  const result = await fetch(
    registerUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error);

  return result;
};

export default productsgetAllFetch;
