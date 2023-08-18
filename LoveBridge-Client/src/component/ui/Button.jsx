import React from 'react'
import styled from 'styled-components';

const StyleButton = styled.button`
    font-size: 1em;
    font-weight: 700;
    border: 0px;
    cursor: pointer;
    border-radius: 2px;
    background: #AD88EB;
    padding: 15px;
    color: #fff;
`

function Button(props) {
    const { title, onClick, type} = props;
  return (
    <StyleButton onClick={onClick} type={type}>
            { title || "버튼"}
        </StyleButton>
  )
}

export default Button