import React from 'react'
import styled from 'styled-components';

const ListContainer = styled.div`
    border-radius: 30px;
    border: 1px solid #DBDBDB;
    background: #FDFDFD;
    padding: 50px 50px 50px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const InfoContainer = styled.div`
`
const Title = styled.div`
    color: #1C1C1C;
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 10px;
`
const District = styled.div`
    color: #4F4F4F;
    font-size: 16px;
    font-weight: 350;
    letter-spacing: -0.8px;
    margin-top: 10px;
`
const BtnContainer = styled.div`
`
const State = styled.div`
    border-radius: 10px;
    border: 1px solid #AD88EB;
    background: #AD88EB;
    width: 198.219px;
    color: #fff;
    text-align: center;
    letter-spacing: 0px;
    padding: 8px 0;
    font-size: 23px;
    font-weight: 500;
    margin-bottom: 10px;
`
const Cancel = styled.button`
    border-radius: 10px;
    border: 1px solid #B8B8B8;
    background: #fff;
    width: 198.219px;
    color: #4F4F4F;
    text-align: center;
    padding: 8px 0;
    font-size: 23px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
        border: 1px solid #F62F2F;
        color: #F62F2F;
    }
`

function Applied(props) {
    const { title, district, process, onClick } = props;
  return (
    <ListContainer>
        <InfoContainer>
            <Title>{title || "프로그램 이름"}</Title>
            <District>{district || "OO시 OO구"}</District>
        </InfoContainer>
        <BtnContainer>
            <State>{process}</State>
            <Cancel onClick={onClick}>신청취소</Cancel>
        </BtnContainer>
    </ListContainer>
  )
}

export default Applied