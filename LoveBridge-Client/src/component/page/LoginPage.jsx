import React, {useState} from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Button from '../ui/Button';
import kako from '../img/kakao-logo.svg';
import google from '../img/google-logo.svg';
import naver from '../img/naver-logo.svg';
import logo from '../img/logo.svg';
import {motion} from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
padding: 100px 136px 0px 123px;
`
const LoginContainer = styled.div`
    margin: auto;
`
const TitleTxt = styled.div`
    font-size: 2.3em;
    color: #454545;
    font-weight: 700;
    margin-top: 10px;
`
const Line = styled.hr`
    border: 0;
    height: 4px;
    background: #AD88EB;
    margin-top: 2vh;
    opacity: 1;
    border-radius: 50px;
    margin-bottom: 70px;
    margin-top: 50px;
`
const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const KaKaO = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #FFDE00;
        width: 26vw;
        color: #000000;
        margin-bottom: 20px;
    }
`
const Google = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #ECECEC;
        width: 26vw;
        color: #000;
        margin-bottom: 20px;
    }
`
const Naver = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #2DB400;
        width: 26vw;
        color: #fff;
        margin-bottom: 20px;
    }
`
const StyledButton = styled(motion.button)`
    font-size: 1.3em;
    font-weight: 700;
    border: 0px;
    cursor: pointer;
    border-radius: 30px;
    background: #AD88EB;
    padding: 15px;
    color: #fff;
    height: 100px;
    > img {
        margin-right: 15px;
        padding-top: 1px;
    }
`
const LoginInfo = styled.div`
`
const SubTxt = styled.div`
    margin-bottom: 30px;
`
const hoverVariants = {
    grow: {
      scale: 1.05
    },
  };
  

function LoginPage() {
    const isDesktop = useMediaQuery({ minWidth: 1000 });
    const navigate = useNavigate();
    
  return (
    <>
    {isDesktop? 
    <Wrapper>
        <LoginInfo><img src={logo}/><TitleTxt>간편 소셜 로그인</TitleTxt><SubTxt>이미 소유하고 계신 소셜 계정으로 간편하게 로그인해보세요.</SubTxt></LoginInfo>
            <LoginContainer>
            <Line/>
                <BtnContainer>
                    <KaKaO onClick={() => navigate('http://127.0.0.1:8000/accounts/login/kakao/')}><StyledButton whileHover={["grow"]} variants={hoverVariants}><img src={kako}/>카카오 로그인</StyledButton></KaKaO>
                    <Google onClick={() => navigate('http://127.0.0.1:8000/accounts/login/google/')}><StyledButton whileHover={["grow"]} variants={hoverVariants}><img src={google}/>구글 로그인</StyledButton></Google>
                    <Naver onClick={() => navigate('http://127.0.0.1:8000/accounts/login/naver/')}><StyledButton whileHover={["grow"]} variants={hoverVariants}><img src={naver}/>네이버 로그인</StyledButton></Naver>
                </BtnContainer>
            </LoginContainer>
    </Wrapper>
    :
    <MobileWrapper>
        <MobileLoginInfo><img src={logo}/><MobileTitleTxt>간편 소셜 로그인</MobileTitleTxt><MobileSubTxt>이미 소유하고 계신 소셜 계정으로 간편하게 로그인해보세요.</MobileSubTxt></MobileLoginInfo>
            <MobileLoginContainer>
            <MobileLine/>
                <MobileBtnContainer>
                    <MobileKaKaO ><MobileStyledButton whileHover={["grow"]} variants={hoverVariants}><img src={kako}/>카카오 로그인</MobileStyledButton></MobileKaKaO>
                    <MobileGoogle><MobileStyledButton whileHover={["grow"]} variants={hoverVariants}><img src={google}/>구글 로그인</MobileStyledButton></MobileGoogle>
                    <MobileNaver><MobileStyledButton whileHover={["grow"]} variants={hoverVariants}><img src={naver}/>네이버 로그인</MobileStyledButton></MobileNaver>
                </MobileBtnContainer>
            </MobileLoginContainer>
    </MobileWrapper>}
    </>
  )
}
const MobileWrapper = styled.div`
padding: 100px 50px 0px 50px;
`
const MobileLoginContainer = styled.div`
    margin: auto;
`
const MobileTitleTxt = styled.div`
    font-size: 2em;
    color: #454545;
    font-weight: 700;
    margin-top: 10px;
`
const MobileLine = styled.hr`
    border: 0;
    height: 4px;
    background: #AD88EB;
    margin-top: 2vh;
    opacity: 1;
    border-radius: 50px;
    margin-bottom: 70px;
    margin-top: 50px;
`
const MobileBtnContainer = styled.div`

`
const MobileKaKaO = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #FFDE00;
        width: 100%;
        color: #000000;
        margin-bottom: 20px;
    }
`
const MobileGoogle = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #ECECEC;
        width: 100%;
        color: #000;
        margin-bottom: 20px;
    }
`
const MobileNaver = styled.div`
    display: flex;
    align-items: center;
    >button {
        background: #2DB400;
        width: 100%;
        color: #fff;
        margin-bottom: 20px;
    }
`
const MobileStyledButton = styled(motion.button)`
    font-size: 1.3em;
    font-weight: 700;
    border: 0px;
    cursor: pointer;
    border-radius: 30px;
    background: #AD88EB;
    padding: 10px;
    color: #fff;
    height: 100px;
    > img {
        margin-right: 15px;
        padding-top: 1px;
    }
`
const MobileLoginInfo = styled.div`
`
const MobileSubTxt = styled.div`
    margin-bottom: 30px;
    font-size: 1em;
`
export default LoginPage