import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from '../../ui/Button';
import PagePath from '../../ui/PagePath';
import saveIcon from '../../img/save.svg';

const Wrapper = styled.div`
padding: 45px 136px 0px 123px;
`
const Txt = styled.div`
    text-align: center;
    font-size: 25px;
    color: #4E4E4E;
    font-weight: 500;
`
const GoMypage = styled.div`
    text-align: center;
    margin-top: 30px;
    
    > Button {
        background: #4E4E4E;
        &:hover {
            background: #AD88EB;
        }
    }
`
const Save = styled.div`
    text-align: center;
    margin: 8% 0 2% 0;
`

function SaveDocPage() {
    const navigate = useNavigate();
  return (
    <Wrapper>
        <PagePath pathname1="마이페이지" pathname2="내 서류 등록"/>
        <hr style={{ margin: "50px 0px 50px 0px"}}/>
        <Save><img src={saveIcon}/></Save>
        <div>
        <Txt>서류 저장이 완료되었습니다.</Txt>
        <GoMypage>
            <Button title="마이페이지로 이동" onClick={() => navigate('/my')}/>
        </GoMypage>
        </div>
    </Wrapper>
  )
}

export default SaveDocPage