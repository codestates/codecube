// ? 문자열
export const PRIVATE = 'private'

export const WAITING_USERS_LINK = 'waiting'

export const CONTENT = '본문'
export const WAITING_USERS = '신청자'

export const CONFIRM_WAITING = '수락 대기중'

export const ACCEPT = 'accept'
export const REJECT = 'reject'

// const pp = window.localStorage.getItem('userinfo')
// export const mi = pp ? JSON.parse(pp).id : ''

// ? initials

export const projectInitial = {
  host: {
    projectId: '',
    title: '',
    confirmed: '',
    recruitment: '',
    content: '',
    start: 0,
    done: 0,
  },
  guest: {
    confirmed: {
      projectId: '',
      title: '',
      confirmed: '',
      recruitment: '',
      content: '',
      start: 0,
      done: 0,
    },
    wishList: [{}],
  },
}
