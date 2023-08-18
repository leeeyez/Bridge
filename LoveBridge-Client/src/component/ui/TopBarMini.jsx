import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../style/Dropdown.css'

const Bar = styled.div`
  background: #fff;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;
const NavContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;
const Navi = styled.div`
  font-weight: 600;
  color: #222;
  font-size: 1.1em;
  cursor: pointer;
  margin-right: 40px;
`;
const Line = styled(motion.hr)`
  border: 0;
  height: 4px;
  background: #ad88eb;
  margin-top: 27px;
  border-radius: 50px;
  transition: all ease 0.3s;
`;
const DropdownContainer = styled.div`
  margin-right: 75px;
  display: flex;
  align-items: center;
  .dropdownbtn {
    background: #ad88eb;
  }
`;
const LogoImg = styled.div`
  margin-left: 50px;
  margin-right: 52px;
  margin-top: 5px;
  cursor: pointer;
`;
const LogoNaviContainer = styled.div`
  display: flex;
  margin-top: 25px;
`;

const TopbarMini = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Bar>
      <LogoNaviContainer
        style={
          location.pathname === "/" || location.pathname === "/login"
            ? { marginBottom: "28px" }
            : {marginBottom: "28px"}
        }
      >
        <LogoImg onClick={() => navigate("/")}>
          <img src={logo} />
        </LogoImg>
      </LogoNaviContainer>
      <DropdownContainer>
      <DropdownButton id="dropdown-basic-button" title="메뉴">
      <Dropdown.Item className="item" onClick={() => navigate("/apply")}>프로그램 신청</Dropdown.Item>
      <Dropdown.Item className="item" onClick={() => navigate("/my")}>마이페이지</Dropdown.Item>
      <Dropdown.Item className="item" onClick={() => navigate("/login")}>로그인/회원가입</Dropdown.Item>
    </DropdownButton>
    </DropdownContainer>
    </Bar>
  );
};



export default TopbarMini;
