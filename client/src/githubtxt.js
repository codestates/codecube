// const url = new URL(window.location.href)
// const authorizationCode = url.searchParams.get('code')

//받은 authorization 코드이용 서버로 callback api 요청
// const getAccessTocken = async (authorizationCode) => {
//   await axios
//     .post(process.env.REACT_APP_API__URL + '/github/callback', {
//       authorizationCode: authorizationCode,
//     })
//     .then((res) => {
//       setGtiAccessToken(res.data.accessToken)
//       window.localStorage.setItem('accessToken', res.data.accessToken)
//       getGithudInfo(res.data.accessToken)
//     })
// }

// const getGithudInfo = async (gitAccessToken) => {
//   await axios
//     .get(process.env.REACT_APP_API__URL + '/github/userInfo', {
//       headers: { authorization: gitAccessToken },
//     })
//     .then((res) => {
//       const { login, calendar } = res.data.userInfo
//       setUserinfo({ email: login + '@github.com', username: login })
//       setGitContri(calendar)
//       setisLoggedIn(true)
//     })
// }

// useEffect(() => {
//   getAccessTocken(authorizationCode)
// }, [])
