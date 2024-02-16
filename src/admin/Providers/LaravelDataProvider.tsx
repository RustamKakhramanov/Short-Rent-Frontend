// import { stringify } from 'query-string';
// import { fetchUtils, DataProvider } from 'ra-core';

// const Provider = (apiUrl:string, httpClient = fetchUtils.fetchJson) => ({
//     getList: (resource:string, params:any) => {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//             ...fetchUtils.flattenObject(params.filter),
//             _sort: field,
//             _order: order,
//             _start: (page - 1) * perPage,
//             _end: page * perPage,
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;

//         return httpClient(url).then(({ headers, json }) => {
//             return {
//                 data: json.data,
//                 total: parseInt(json.meta.pagination.total),
//             };
//         });
//     },

//     getOne: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
//             data: json,
//         })),

//     getMany: (resource:any, params:any) => {
//         const query = {
//             id: params.ids,
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;
//         return httpClient(url).then(({ json }) => ({ data: json }));
//     },

//     getManyReference: (resource:any, params:any) => {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//             ...fetchUtils.flattenObject(params.filter),
//             [params.target]: params.id,
//             _sort: field,
//             _order: order,
//             _start: (page - 1) * perPage,
//             _end: page * perPage,
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;

//         return httpClient(url).then(({ headers, json }) => {
//             if (!headers.has('x-total-count')) {
//                 throw new Error(
//                     'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
//                 );
//             }
//             return {
//                 data: json,
//                 total: parseInt(
//                     '10'
//                 ),
//             };
//         });
//     },

//     update: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: 'PUT',
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({ data: json })),

//     // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
//     updateMany: (resource:any, params:any) =>
//         Promise.all(
//             params.ids.map(id =>
//                 httpClient(`${apiUrl}/${resource}/${id}`, {
//                     method: 'PUT',
//                     body: JSON.stringify(params.data),
//                 })
//             )
//         ).then(responses => ({ data: responses.map(({ json }) => json.id) })),

//     create: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}`, {
//             method: 'POST',
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({
//             data: { ...params.data, id: json.id },
//         })),

//     delete: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: 'DELETE',
//         }).then(({ json }) => ({ data: json })),

//     // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
//     deleteMany: (resource:any, params:any) =>
//         Promise.all(
//             params.ids.map(id =>
//                 httpClient(`${apiUrl}/${resource}/${id}`, {
//                     method: 'DELETE',
//                 })
//             )
//         ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
// });

// export default Provider