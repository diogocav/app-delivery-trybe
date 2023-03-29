const loginUrl = 'http://localhost:3001/login';

const loginFetch = async (email, password) => {
  const result = await fetch(
    loginUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )
    .then((response) => response.json())
    .catch((error) => error);

  console.log(result);
  return result;
};

export default loginFetch;

// const loginUrl = 'http://localhost:3001/login';

// const loginFetch = async (email, password) => {
//   const result = await fetch(
//     loginUrl,
//     {
//       mode: 'no-cors',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     },
//   )
//     .then((response) => response.json().then((data) => data))
//     .catch((error) => error);

//   console.log(result);
//   return result;
// };

// export default loginFetch;
