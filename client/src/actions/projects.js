import axios from 'axios'
import { login } from './login'

const serverUrl = process.env.REACT_APP_API__URL
export const PROJECTS = 'PROJECTS'

const projects = (projects) => {
  return {
    type: PROJECTS,
    payload: {
      projects,
    },
  }
}

export const getProjects = () => async (dispatch) => {
  // 공개게시판을 불러옵니다.
  axios
    .get(serverUrl + '/projects')
    .then(({ data }) => {
      // ! 게시글을 최신순으로 보여주기 위해 reverse()를 통해 일시적으로 배열 순서를 뒤집었지만 서버에서 최신순으로 데이터를 건네받도록 수정이 필요합니다.
      dispatch(projects(data.list.reverse()))
    })
    .catch((err) => console.log('공개게시판 불러오는 과정에서 발생한 오류입니다.', err))

  // 유저가 로그인 상태인지 확인합니다.
  axios.get(serverUrl + '/users').then(({ data }) => {
    // 로그인한 상태가 아니더라도 서버에서는 200코드를 주기때문에 응답메세지로 조건분기합니다.
    if (data.message === 'invailid authorization') return
    else {
      // App.js에서 새로고침 직후 삭제된 로컬스토리지 'userInfo'를 새로 채워넣습니다.
      window.localStorage.setItem('userInfo', JSON.stringify(data.data))
      // 리덕스 loginReducer에 유저정보를 입력합니다.
      dispatch(login(data.data))
    }
  })
}
