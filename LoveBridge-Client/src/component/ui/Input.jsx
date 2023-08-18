import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 95%;
    height: 4vh;
    border-radius: 2px;
    border: 1px solid #D4D4D4;
    background: #FFF;
    padding: 5px 10px 5px 10px;
    margin: 5px 0px 5px 0px;
    &:focus{
        outline: none;
    }
`

function Input(props){
    const { type, name, defaultValue, value, onChange, readOnly, placeholder } = props;

    return <StyledInput type={type} defaultValue={defaultValue} name={name} value={value} onChange={onChange} readOnly={readOnly} placeholder={placeholder}/>
};

export default Input;