
const api = "http://localhost:5000";


// // Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token
// if (!token)
//   token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
//   'Authorization': token
}

export const create = (extractionStep) =>
  fetch(`${api}/extractionStep`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ extractionStep })
  }).then(res => res.json())

export const get1 = (id) =>
  fetch(`${api}/extractionStep/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const update = (extractionStep) =>
  fetch(`${api}/extractionStep/${extractionStep.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ extractionStep })
  }).then(res => res.json())

export const get = (id) => {
  return fetch(`${api}/extractionStep/${id}`, headers)
    .then(response => {
        if (!response.ok) {
            throw Error('Network request failed.')
        }
        return response;
    })
    .then(data => data.json())
    .then(data => 
      {
        console.log('parsed json', data);
        return data.data
    }
    , (ex) => {
        console.log('parsing failed', ex)
    }) 
}