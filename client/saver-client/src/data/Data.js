import Auth from '../components/account/Auth'
const baseUrl = 'http://localhost:11754/api/'

const getOptions = (method, data) => {
  let options = {
    method: method,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  if (method === 'POST' || method === 'PUT') {
    let reqBody = []
    for (let property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      reqBody.push(encodedKey + "=" + encodedValue);
    }
    reqBody = reqBody.join("&");

    options.body = reqBody
  }

  return options
}

const handleJsonResponse = res => res.json()

const handleServerError = err => ({
  error: err || 'An error occured, please try again.'
})


const applyAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    options.headers['Authorization'] = `bearer ${Auth.getToken()}`
  }
}

class Data {
  static get(url, authenticated) {
    let options = getOptions('GET')

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(
      `${baseUrl}${url}`,
      options
    )
      .then(handleJsonResponse)
      .catch(handleServerError)
  }

  static post(url, data, authenticated, ignoreBaseUrl) {
    let options = getOptions('POST', data)

    let reqUrl = ignoreBaseUrl ? url : `${baseUrl}${url}`

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(
      reqUrl,
      options
    )
    .then(handleJsonResponse)
    .catch(handleServerError)
  }

  static put(url, data, authenticated) {
    let options = getOptions('PUT', data)
    
    applyAuthorizationHeader(options, authenticated)

    return window.fetch(
      `${baseUrl}${url}`,
      options
    )
    .then(handleJsonResponse)
    .catch(handleServerError)
  }
}

export default Data
