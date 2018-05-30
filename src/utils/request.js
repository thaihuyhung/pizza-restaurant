import 'whatwg-fetch';

const parseJSON = (response) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

const checkStatus = (response, url, options, stopRefreshToken) => {
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response);
  } else if (response.status === 401 && !stopRefreshToken) {
    return fetch('https://mockapi.pizza.de/v1/auth').then((authRes) => {
      if (authRes.status === 200) {
        return authRes.json().then(response => {
          localStorage.setItem('TOKEN', response.token);
        }).then(() => {
          return request(url, options, true);
        }).catch(throwError)
      } else {
        throwError(authRes);
      }
    })
  } else {
    throwError(response);
  }
}

const throwError = (response) => {
  if (!response) throw Error('Error');
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const request = (url, options = {}, stopRefreshToken) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      token: localStorage.getItem('TOKEN')
    }
  })
  .then(response => checkStatus(response, url, options, stopRefreshToken));
}

export default request;
