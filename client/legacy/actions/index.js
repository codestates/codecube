// * types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP_PAGE_ON = 'SIGNUP_PAGE_ON'
export const SIGNUP_PAGE_OFF = 'SIGNUP_PAGE_OFF'

// * actions
export const handleLogin = () => {
  return {
    type: LOGIN,
  }
}

export const handleLogout = () => {
  return {
    type: LOGOUT,
  }
}

export const handleSignupPageON = () => {
  return {
    type: SIGNUP_PAGE_ON,
  }
}

export const handleSignupPageOFF = () => {
  return {
    type: SIGNUP_PAGE_OFF,
  }
}
