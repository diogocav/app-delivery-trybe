import fetchApi from '../services/fetchApi';

export default async function handleStatusChange(saleId, token, status) {
  const response = await fetchApi(
    'PATCH',
    `sale/${saleId}`,
    token,
    { status },
  );
  /*  window.location.reload(); */

  return response;
}
