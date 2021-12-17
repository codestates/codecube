import React from 'react';
import "./ModalSignup.css";

const ModalSignup = () =>{
    return (
        <div class="container">
        <h1 class="h02">회원가입</h1>
        <form class="h08" action="">
            <img class="h02 image"src="" alt="사용할이미지"/>
            <input class="h01" type="text" placeholder="아이디로 사용하실 이메일"/>
            <input class="h01" type="password" placeholder="사용하실 비밀번호"/>
            <input class="h01" type="text" placeholder="username"/>
            {/* <!-- <input class="h01" type="text" placeholder="stacks"> --> */}
            <label for="stacks">Stacks:</label>
            <textarea id="stacks" name="stacks" rows="4" cols="50" value="ddd">
            </textarea>
            {/* <!-- <input class="h03" type="text" placeholder="description"> --> */}
            <label for="description">Description:</label>
            <textarea id="description" name="description" rows="4" cols="50" placeholder="description">
                </textarea>
            <input class="h01" type="submit" value="signup"/> 
        </form>

    </div>
    )

}

export default ModalSignup;