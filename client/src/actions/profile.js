import axios from 'axios'

export const MY_STATE = 'MY_STATE'
export const CHAT = 'CHAT'

export const handleStateMode = () => {
  return {
    type: MY_STATE,
    payload: {
      index: 0,
    },
  }
}

export const handleChatMode = () => {
  return {
    type: CHAT,
    payload: {
      index: 1,
    },
  }
}
