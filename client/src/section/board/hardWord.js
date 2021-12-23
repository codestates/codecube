export const PRIVATE_BOARD = '개인게시판'
export const PUBLIC_BOARD = '공개게시판'

export const PRIVATE = 'private'

export const PRIVATE_LINK = '/private'
export const CONTENT_LINK = ''
export const WAITING_USERS_LINK = 'waiting'

export const CONTENT = '본문'
export const WAITING_USERS = '신청자'

export const WISH_LIST = '수락 대기중'

export const ACCEPT = 'accept'
export const REJECT = 'reject'

const pp = window.localStorage.getItem('userinfo')
export const mi = pp ? JSON.parse(pp).id : ''

export const localhost = process.env.REACT_APP_API_URL + ''
