import React from 'react'
import styled from 'styled-components';
import PagePath from '../../ui/PagePath';
import mydocIcon from '../../img/mydocIcon.svg';
import myapplyIcon from '../../img/myapplyIcon.svg';
import mylikeIcon from '../../img/mylikeIcon.svg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
  padding: 45px 136px 0px 123px;
`
const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-top: 50px;
`
const Info = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 350;
  letter-spacing: -0.8px;
  margin-top: 10px;
  margin-bottom: 40px;
  letter-spacing: -0.8px;
`
const MenuBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const MenuBtn = styled(motion.button)`
  border-radius: 30px;
  border: 1px solid #DBDBDB;
  background: #FDFDFD;
  width: 32%;
  text-align: left;
  padding: 4%;
  cursor: pointer;
  &:hover {
    background: #F4F2FB;
    border: 1px solid #AD88EB;
  }
`
const Icon = styled.img`
  margin-lefth:
`
const MenuName = styled.div`
  color: #585858;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;
  margin-top: 4%;
`
const MenuInfo = styled.div`
  color: #8D8D8D;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.8px;
  margin-top: 2%;
  margin-bottom: 10%;
`
const hoverVariants = {
  grow: {
    scale: 1.05
  },
};

function MyPage() {
  const isDesktop = useMediaQuery({ minWidth: 870 });
  const navigate = useNavigate();
  return (
    <>
    {isDesktop?
    <Wrapper>
      <PagePath pathname1='마이페이지'/>
      <Title>마이페이지</Title>
      <Info>복지서비스 신청에 필요한 서류를 관리하고,  내가 신청한 프로그램과 찜한 목록을 확인할 수 있습니다. </Info>
      <MenuBox>
        <MenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/doc')}>
          <Icon src={mydocIcon}/><MenuName>내 서류 등록</MenuName><MenuInfo>신청 관련 서류를 <br/>등록하고 관리할 수 있어요.</MenuInfo>
        </MenuBtn>
        <MenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/apply')}>
          <Icon src={myapplyIcon}/><MenuName>내가 신청한 프로그램</MenuName><MenuInfo>내가 신청한 프로그램의  심사 여부를 <br/>확인할 수 있어요.</MenuInfo>
        </MenuBtn>
        <MenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/like')}>
          <Icon src={mylikeIcon}/><MenuName>내가 찜한 목록</MenuName><MenuInfo>내가 찜한 프로그램을 확인할 수 있어요.<br/>&nbsp;</MenuInfo>
        </MenuBtn>
      </MenuBox>
    </Wrapper>
    :
    <MobileWrapper>
      <PagePath pathname1='마이페이지'/>
      <MobileTitle>마이페이지</MobileTitle>
      <MobileInfo>복지서비스 신청에 필요한 서류를 관리하고,  내가 신청한 프로그램과 찜한 목록을 확인할 수 있습니다. </MobileInfo>
      <MobileMenuBox>
        <MobileMenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/doc')}>
          <Icon src={mydocIcon}/><MenuName>내 서류 등록</MenuName><MenuInfo>신청 관련 서류를 <br/>등록하고 관리할 수 있어요.</MenuInfo>
        </MobileMenuBtn>
        <MobileMenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/apply')}>
          <Icon src={myapplyIcon}/><MenuName>내가 신청한 프로그램</MenuName><MenuInfo>내가 신청한 프로그램의  심사 여부를 <br/>확인할 수 있어요.</MenuInfo>
        </MobileMenuBtn>
        <MobileMenuBtn whileHover={["grow"]} variants={hoverVariants} onClick={() => navigate('/my/like')}>
          <Icon src={mylikeIcon}/><MenuName>내가 찜한 목록</MenuName><MenuInfo>내가 찜한 프로그램을 확인할 수 있어요.<br/>&nbsp;</MenuInfo>
        </MobileMenuBtn>
      </MobileMenuBox>
    </MobileWrapper>}
    </>
  )
}
const MobileWrapper = styled.div`
  padding: 45px 50px 0px 50px;
`
const MobileTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-top: 50px;
`
const MobileInfo = styled.div`
  color: #222;
  font-size: 12px;
  font-weight: 350;
  letter-spacing: -0.8px;
  margin-top: 10px;
  margin-bottom: 40px;
  letter-spacing: -0.8px;
`
const MobileMenuBox = styled.div`
  display: block;
`
const MobileMenuBtn = styled(motion.button)`
  border-radius: 30px;
  border: 1px solid #DBDBDB;
  background: #FDFDFD;
  width: 100%;
  text-align: left;
  padding: 5%;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background: #F4F2FB;
    border: 1px solid #AD88EB;
  }
`
export default MyPage