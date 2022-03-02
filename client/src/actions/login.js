export const LOGGED_OUT = 'LOGGED_OUT'
export const LOGGED_IN = 'LOGGED_IN'

export const handleLandingPage = () => {
  return {
    type: LOGGED_OUT,
  }
}

export const handleMainPage = () => {
  return {
    type: LOGGED_IN,
  }
}
