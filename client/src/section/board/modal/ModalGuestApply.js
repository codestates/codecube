import React from 'react';
import "./ModalGuestApply.css";

const ModalGuestApply = () =>{
    return (
        <div id='container'>
        <div class='row h10'>
            <div class='title'>타이틀</div>
        </div>
        <div class='row h80'>
            <div class='content'>본문</div>
        </div>
        <div class='row h10'>
            <div class='col w50'>
                <div>현재참여인원</div>
                <div class="accepted">
                    <a class="h10" href="https://username">
                        <img src="userimage.jpg" alt="accepted user"/>
                        username
                    </a>
                    <a class="h10" href="https://username">
                        <img src="userimage.jpg" alt="accepted user"/>
                        username2
                    </a>
                </div>
            </div>
            <div class='col w50 button'>
                {/* <!-- <div class="button"> --> */}
                    <input type="button" value="참여"/>
                    {/* <!-- <input type="button" value="대기"> -->
                <!-- </div> --> */}

            </div>
        </div>

    </div>
    
    )

}

export default ModalGuestApply;