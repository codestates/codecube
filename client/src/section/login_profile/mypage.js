import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// require('dotenv').config()
import './mypage.css'
axios.defaults.withCredentials = true

const Mypage = (props) => {
  const { username, stacks, description, image, email } = props.userinfo
  const navigate = useNavigate()
  const [checkedStacks, setCheckedStacks] = useState([])
  const [editProfileBtn, setEditProfileBtn] = useState(false)
  const [file,setFile] = useState('')
  const [userId, setId] = useState('')

  const [userInfoEdited, setUserInfoEdited] = useState({
    image: image,
    email: email,
    username: username,
    description: description,
  })


  // const userInfo = localStorage.getItem("userinfo")
  // setId(userInfo.id)

  const checkboxhandler = (checked, id) => {
    if (checked) {
      setCheckedStacks([...checkedStacks, id])
    } else {
      setCheckedStacks(checkedStacks.filter((el) => el !== id))
    }
  }

  const handleInputValue = (key) => (e) => {
    setUserInfoEdited({ ...userInfoEdited, [key]: e.target.value })
  }

  const handleEdit = () => {
    setEditProfileBtn(true)
    navigate('/')
  }

  const handleSave = async () => {
    userInfoEdited['stacks'] = checkedStacks
    await axios
      .put(process.env.REACT_APP_API__URL + '/users', userInfoEdited, {
        withCredentials: true,
      })
      .then((res) => {
        setEditProfileBtn(false)
        props.isAuthenticated()
        navigate('/')
      })
  }

  const saveImage = async (file) => {
    const formData = new FormData();
  formData.append("image",file)

  await axios.post(process.env.REACT_APP_API__URL+ '/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  }


  const upload = async (event) => {
    event.preventDefault()
    await saveImage(file)
  }

  const settingFile = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }


  //사진 삭제 전송 함수
  function changeMyprofile(event) {
    props.changePhoto(event)
  }
  function clearMyProfile(event) {
    props.clearPhoto(event)
  }

  const handleWithdraw = () => {
    axios
      .delete(process.env.REACT_APP_API__URL + '/users', {
        withCredentials: true,
      })
      .then((res) => {
        const ㅅㄱ = confirm('정말로 탈퇴하시겠습니까?')
        ㅅㄱ ? alert('회원가입이 탈퇴되었습니다') : alert('이미 늦음 ㅅㄱ')

        window.localStorage.removeItem('userinfo')
        props.setisLoggedIn(false)
        navigate('/')
      })
  }

  //비밀번호 매치 함수
  const mypage = () => {
    setEditProfileBtn(false)
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

  return (
    <>
      {editProfileBtn ? (
        <div className="main-box left-box">
          <h1>프로필수정</h1>
          <button className="mypage-btn" onClick={mypage}>
            내페이지
          </button>
          <form onSubmit={upload} encType="multipart/form-data">
            <input onChange={settingFile} type="file" accept="image/*" />
            <button type="submit" >사진 업로드하기</button>
          </form>
          <div className="mypage-email">{email}</div>
          <div id="left-image-wrapper">
            <div id="left-pi-wrapper">기본 이미지</div>
            <input
              id="left-profile-button"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={changeMyprofile}
            />
            <label id="left-fake-btn" htmlFor="left-profile-button">
              프로필
            </label>
            <input id="left-delete-button" className="hidden" />
            <label id="left-fake-delete" htmlFor="left-delete-button">
              삭제
            </label>
          </div>
          <form className="form-wrapper" action="" onSubmit={(e) => e.preventDefault()}>
            <input
              className="inputA"
              type="password"
              placeholder="password"
              onChange={handleInputValue('password')}
            />
            <input
              className="inputA"
              type="text"
              placeholder="username"
              value={userInfoEdited.username}
              onChange={handleInputValue('username')}
            ></input>
            <h3>My Stacks</h3>
            <div id="stack-wrapper">
              {stacklist.map((el) => {
                return (
                  <div key={el.id}>
                    <input
                      type="checkbox"
                      value={el.name}
                      key={el.id}
                      className={checkboxstyle}
                      onChange={(e) => {
                        checkboxhandler(e.currentTarget.checked, el.id)
                      }}
                      checked={checkedStacks.includes(el.id) ? true : false}
                    ></input>
                    <label style={checkboxstyle}>{el.name}</label>
                  </div>
                )
              })}
            </div>

            <textarea
              className="left-textarea"
              type="text"
              placeholder="description"
              value={userInfoEdited.description}
              onChange={handleInputValue('description')}
            ></textarea>
            <input
              className="mypage-btn"
              type="submit"
              value="저장버튼"
              onClick={handleSave}
            ></input>
          </form>
        </div>
      ) : (
        <div className="main-box left-box">
          <h1>Mypage</h1>
          <div>
              <img src={`https://codecube-image.s3.ap-northeast-2.amazonaws.com/${1}`} width="200px" height="100px" />
            </div>
          <div id="mypage-userInfo">
            <div>{username}</div>
            <div>{email}</div>
            <div className="stack-wrapper">
              <ul>{stacks && stacks.map((el) => <li key={el.id}> {el.name} </li>)}</ul>
            </div>
            <div className="description">{description}</div>
          </div>
          <div id="mypage-btn-wrapper">
            <button className="mypage-btn" onClick={props.handleLogout}>
              logout
            </button>
            <button className="mypage-btn" onClick={handleEdit}>
              edit profile
            </button>
            <button className="mypage-btn" onClick={handleWithdraw}>
              Account Withdraw(회원탈퇴)
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Mypage
