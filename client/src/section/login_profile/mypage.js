import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

// import codecubelogo from '../../dummy/board/codecubelogo.png'

axios.defaults.withCredentials = true

const Mypage = (props) => {
  /* TODO : props로 받은 유저정보를 화면에 표시하세요. */
  // if (!props.userinfo) {
  //   return null
  //   // 리턴에 null 넣으면 랜더링 안됨
  // } else {
  //   console.log('인증후받아온정보', props.userinfo)
  // const { email, username, stacks, description } = props.userinfo
  //https://jess2.xyz/vue/data-undefined-error/
  // TypeError: Cannot read property of undefined
  // const { username, stacks, description, image, email } = props.userinfo[0]
  const { username, stacks, description, image, email } = props.userinfo
  console.log('유제인포포포포ㅗ', props.userinfo)
  // console.log('스택만보여주기', stacks)
  const navigate = useNavigate()

  // const [cartStacks, setCartStacks] = useState(stacks)
  const [file, setFile] = useState('')
  const [checkedStacks, setCheckedStacks] = useState([])
  const [editProfileBtn, setEditProfileBtn] = useState(false)
  // const [saveProfileBtn, setSaveProfileBtn] = useState(false)
  const [userInfoEdited, setUserInfoEdited] = useState({
    image: image,
    email: email,
    username: username,
    description: description,
  })

  // const [isChecked, setIsChecked] = useState(false)

  const checkboxhandler = (checked, id) => {
    if (checked) {
      setCheckedStacks([...checkedStacks, id])
      // setUserInfoEdited[stacks] = checkedStacks
      // console.log('스택추가되는거', userInfoEdited)
    } else {
      setCheckedStacks(checkedStacks.filter((el) => el !== id))
      // setUserInfoEdited[stacks] = checkedStacks
      // console.log('스택제거되는거', userInfoEdited)
    }
  }

  // 패스워드는 어떻게 수정해야할까?? 다시 엑시오스 요청보내서 받아와아함까?
  // 기존 비밀번호? 요청보내서 확인하고 확인됐으면 비번 바꿀수있게???
  // 현재 패스워드 바꿀패스 한버더 확인패스워드 ~~~~~~일단은
  // 회원탈퇴~~모달창으로 컴펌 띠우기
  //https://velog.io/@edie_ko/React-%EC%84%B8%EC%83%81-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EB%AA%A8%EB%8B%AC%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-X

  //https://getbootstrap.com/docs/4.0/components/modal/

  const [errorMessage, setErrorMessage] = useState('')

  const [myStackList, setMyStackList] = useState({ stacks })

  const handleInputValue = (key) => (e) => {
    setUserInfoEdited({ ...userInfoEdited, [key]: e.target.value })
  }

  const handleEdit = () => {
    // axios.put('https://localhost:4000/').then((res) => {
    //   setUserinfo(null)
    //   setisLoggedIn(true)
    //   navigate('/')
    // })
    setEditProfileBtn(true)
    // props.setisLoggedIn(true)
    navigate('/')
  }
  // console.log('프롭스로받아온유져인포', props.userinfo)
  // console.log('수정전', userInfoEdited)

  const handleSave = async () => {
    console.log('ssssssss', userInfoEdited)
    // props.setUserinfo([userInfoEdited])
    // setEditProfileBtn(false)
    // navigate('/')
    userInfoEdited['stacks'] = checkedStacks
    console.log('체크박스데이터 하니씩 추가!!!!!!!!!!!!', checkedStacks)
    console.log(`전달되는 값 ${userInfoEdited}`)
    await axios.put('http://localhost:4000/', userInfoEdited).then((res) => {
      console.log('데이터수정후받아온데이터ddddddd ', res) //사인업후 받아온데이터  { message: 'ok' }
      setEditProfileBtn(false)
      props.isAuthenticated()
      navigate('/')

    })
  }

  function changeFile(data) {
    const { target: { files } } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(theFile)
    reader.onloadend = (finishedEvent => {
      const { currentTarget: { result } } = finishedEvent
      setFile(result)
    })
  }

  function clearPhoto() {
    setFile('')
  }

  const handleWithdraw = () => {
    axios.delete('http://localhost:4000/users').then((res) => {
      confirm('정말로 탈퇴하시겠습니까?')
      alert('회원가입이 탈퇴되었습니다')
      props.setisLoggedIn(false)
      navigate('/')
    })
  }
  // }
  //비밀번호 매치 함수
  const 마이페이지 = () => {
    setEditProfileBtn(false)
    navigate('/')
  }

  const stacklist = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Node.js' },
    { id: 4, name: 'express' },
    { id: 5, name: 'Docker' },
    { id: 6, name: 'css_styled' },
    { id: 7, name: 'Mysql' },
    { id: 8, name: 'MongoDB' },
    { id: 9, name: 'redis' },
    { id: 10, name: 'Python' },
    { id: 11, name: 'C#' },
  ]

  const checkboxstyle = {
    justifycontent: 'center',
    alignitems: 'center',
  }

  // const listItems = array01.map((el) => <li>{el.name}</li>)

  return (
    <div>
      {editProfileBtn ? (
        <center>
          <h1>프로필수정</h1>
          <button onClick={마이페이지}>내페이지</button>
          <div>{email}</div>
          <form className="loginformA" action="" onSubmit={(e) => e.preventDefault()}>
            <input type="file" accept="image/*" onChange={changeFile} />
            <input type='submit' value="your_Image" />
            <input
              className="inputA"
              type="password"
              placeholder="password"
              // value={userInfoEdited.password}
              onChange={handleInputValue('password')}
            ></input>
            <input
              className="inputA"
              type="text"
              placeholder="username"
              value={userInfoEdited.username}
              // value={username}
              onChange={handleInputValue('username')}
            ></input>
            {/* <textarea
              className="inputA"
              type="text"
              placeholder="stacks"
              value={userInfoEdited.stacks}
              // value={stacks}
              onChange={handleInputValue('stacks')}
            ></textarea> */}
            <div>
              <h3>My Stacks</h3>
              {stacklist.map((el) => {
                return (
                  <div key={el.id}>
                    <input
                      type="checkbox"
                      value={el.name}
                      key={el.id}
                      className={checkboxstyle}
                      // checked={isChecked}
                      onChange={(e) => {
                        checkboxhandler(e.currentTarget.checked, el.id)
                      }}
                      checked={checkedStacks.includes(el.id) ? true : false}
                    ></input>
                    <lable style={checkboxstyle}>{el.name}</lable>
                  </div>
                )
              })}
            </div>

            <textarea
              className="inputA"
              type="text"
              placeholder="description"
              value={userInfoEdited.description}
              // value={description}
              onChange={handleInputValue('description')}
            ></textarea>
            <input
              className="inputA"
              type="submit"
              value="저장버튼"
              onClick={handleSave}
            ></input>
          </form>
        </center>
      ) : (
        <center>
          <h1>Mypage</h1>
          {file && <div>
            <img src={file} width="50px" height="50px" />
            <button onClick={clearPhoto}> Clear IMG</button>
          </div>}
          <div className="username">{username}</div>
          <div className="email">{email}</div>
          <div className="stacks">
            <ul>
              {stacks && stacks.map((el) => (
                <li key={el.id}> {el.name} </li>
              ))}
            </ul>
          </div>
          <div className="description">{description}</div>
          <button className="btn btn-logout" onClick={props.handleLogout}>
            logout
          </button>
          <button className="btn btn-edit" onClick={handleEdit}>
            edit profile
          </button>
          <button className="btn btn-withdrawal" onClick={handleWithdraw}>
            Account Withdraw(회원탈퇴)
          </button>
        </center>
      )}
    </div>
  )
}

export default Mypage