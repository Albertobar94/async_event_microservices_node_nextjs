import { renderHook } from '@testing-library/react-hooks';
import useRequest from '../../hooks/useRequest';

test(`
  Initial hooks state,
  must be:
    errors = null
    doRequest = typeof 'function'
  `, () => {
  const { result } = renderHook(() =>
    useRequest({
      url: '/api/tickets',
      method: 'GET',
      body: {},
    })
  );
  expect(result.current.errors).toEqual(null);
  expect(typeof result.current.doRequest).toEqual('function');
});
// test(`
//   Fetching for tickets must return the same exact mocked ticket
//   `, async () => {
//   const ticket = {
//     title: 'agega',
//     price: 20.1,
//     id: 'adgadgdag',
//     userId: 'agadgdag',
//   };

//   // fetch.mockResponseOnce(JSON.stringify(ticket));

//   const { result } = renderHook(() =>
//     useRequest({
//       url: '/api/tickets',
//       method: 'GET',
//       body: {},
//     })
//   );
//   const res = await result.current.doRequest();

//   expect(res.body).toEqual(ticket);
// });
