const fetchApi = async (methodHttp, endpoint, auth = '', payload) => {
  const url = `http://localhost:3001/${endpoint}`;
  const method = methodHttp.toUpperCase();
  let result;
  if (payload) {
    result = await fetch(
      url,
      {
        method,
        headers: {
          Authorization: auth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )
      .then((response) => response.json())
      .catch((error) => error);
  } else {
    result = await fetch(
      url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    )
      .then((response) => response.json())
      .catch((error) => error);
  }

  return result;
};

export default fetchApi;
