import axios from 'axios'

const serverUrl = process.env.REACT_APP_API__URL
axios.defaults.withCredentials = true

export const LOGGED_OUT = 'LOGGED_OUT'
export const LOGGED_IN = 'LOGGED_IN'

export const handleLoggedOut = () => {
  return {
    type: LOGGED_OUT,
    payload: {
      description: '',
      email: '',
      id: '',
      oauth: '',
      username: '',
    },
  }
}

export const login = (userInfo) => {
  return {
    type: LOGGED_IN,
    payload: { ...userInfo },
  }
}

export const handleLoggedIn =
  (dispatch, email, password, navigate, setIsCorrectP) => async () => {
    try {
      const res = await axios.post(serverUrl + '/login', { email, password })
      const userInfo = res.data.userInfo

      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      dispatch(login(userInfo))
      navigate('/')
    } catch (err) {
      console.log('❗️로그인실패\n', err)

      if (err.response.status === 400) {
        setIsCorrectP('INCORRECT')
      }
    }
  }
