import React from 'react';
import "./ModalHostCreate.css";

const ModalHostCreate = () =>{
    return (
        <div id='container'>
        <div class='row h10'>
            <div class='title'>타이틀</div>
        </div>
        <div class='row h80'>
            <div class='content w50'>본문</div>
        </div>
        <div class='row h10'>
            <div class='confirmed'>
                <input class="button" type="button" value="게시물생성버튼"/>
            </div>
        </div>

    </div>
    
    )

}

export default ModalHostCreate;