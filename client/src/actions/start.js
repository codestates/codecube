export const LANDING_PAGE = 'LANDING_PAGE'
export const MAIN_PAGE = 'MAIN_PAGE'

export const handleLandingPage = () => {
  return {
    type: LANDING_PAGE,
    // payload: {
    //   isLanding: true,
    // },
  }
}

export const handleMainPage = () => {
  return {
    type: MAIN_PAGE,
    // payload: {
    //   isLanding: false,
    // },
  }
}
