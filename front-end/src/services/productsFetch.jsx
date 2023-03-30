const productsUrl = 'http://localhost:3001/products';

const productsGetAllFetch = async () => {
  const result = await fetch(
    productsUrl,
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

export default productsGetAllFetch;
