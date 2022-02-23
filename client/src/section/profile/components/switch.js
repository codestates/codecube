import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { IconContext } from 'react-icons/lib'
import { SiTinder as ICON_tinder } from 'react-icons/si'
import { RiMessage3Fill as ICON_message } from 'react-icons/ri'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1 0 0%;
`

const Ul = styled.ul`
  display: flex;
`

const Li = styled.li`
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: center;

  width: 60px;
  margin: 0 0.3rem;

  svg {
    color: gray;
  }

  cursor: pointer;

  &.active {
    /* cursor: default; */
    svg {
      /* color: white; */
    }
  }
`

const Back = styled.div`
  position: absolute;

  background-color: #1458a4;
  width: 60px;
  height: 70px;
  margin: 0 0.3rem;
  border-radius: 10px 10px 0 0;

  transform: translate(calc(${(props) => props.idx} * (60px + 0.6rem)), -20%);
  transition: 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 27.5px;

    left: -30px;

    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 50%;

    box-shadow: 14px 15px #1458a4;
  }

  &:after {
    content: '';
    position: absolute;
    top: 27.5px;

    right: -30px;

    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 50%;

    box-shadow: -14px 15px #1458a4;
  }
`

const Switch = () => {
  const [backIndex, setBackIndex] = useState(0)
  const ulRef = useRef(null)

  const onSwitching = (idx) => {
    setBackIndex(idx)
  }

  useEffect(() => {
    const target = ulRef.current.children[backIndex]
    target.classList.add('active')
  }, [backIndex])

  return (
    <IconContext.Provider value={{ size: '2.2rem' }}>
      <Wrapper>
        <Ul ref={ulRef}>
          <Li onClick={() => onSwitching(0)}>
            <ICON_tinder />
          </Li>
          <Li onClick={() => onSwitching(1)}>
            <ICON_message />
          </Li>
          <Back idx={backIndex} />
        </Ul>
      </Wrapper>
    </IconContext.Provider>
  )
}

export default Switch
