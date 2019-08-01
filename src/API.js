

//const endpoint = 'http://localhost:3000/api/v1/'
const endpoint = 'https://safe-anchorage-93805.herokuapp.com/api/v1'
const cardsUrl = `${endpoint}/cards`
//Sam's Auth code:
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const validateUrl = `${endpoint}/validate`
const totalsUrl = `${endpoint}/totals`
const gameUrl = `${endpoint}/games`


//const postsUrl = `${endpoint}/posts`

const jsonify = res => {
  // return res.json()
  if (res.ok)
    return res.json()
  else {
    const jsonData = res.json()
    return jsonData.then(data => {
      if (data.errors) {
        throw data.errors
      } else {
        return data
      }
    })
  }
}

const handleServerError = errors => {
  console.error(errors)
  throw errors
} //only called in catch

const cards = () => {
  return fetch(cardsUrl)
    .then(jsonify)
    // .then(console.log)
    .catch(handleServerError)
}
//Sam's Auth Code...
const constructHeaders = (moreHeaders = {}) => (
  {
    'Authorization': localStorage.getItem('token'),
    ...moreHeaders
  }
)

const signUp = (user) => fetch(signupUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    console.log("token: ", data.token)
    localStorage.setItem('token', data.token)
    return data.user
  })
  .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user })
}).then(jsonify)
  .then(data => {
    console.log("token: ", data.token)
    localStorage.setItem('token', data.token)
    return data.user
  })
  .catch(handleServerError)                       //WHY don't we save token to localStorage here?

const validateUser = () => {
  if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

  return fetch(validateUrl, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      localStorage.setItem('token', data.token)
      return data.user
    })
    .catch(handleServerError)
}

const fetchTotalScores = () => {
  return fetch(totalsUrl)
    .then(jsonify)
    .catch(handleServerError)
}

const postGame = (game) => fetch(gameUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ game })
}).then(jsonify)
  .then(game => {
    console.log("game: ", game)
    return game
  })
  .catch(handleServerError)

const clearToken = () => localStorage.removeItem('token')

export default {
  signUp,
  logIn,
  validateUser,
  clearToken,
  cards,
  fetchTotalScores,
  postGame
}



