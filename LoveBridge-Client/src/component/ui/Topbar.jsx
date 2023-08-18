import React, { useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { useMediaQuery } from 'react-responsive';

const Bar = styled.div`
  background: #fff;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;
const NavContainer = styled.div`
  display: flex;
  margin-top: 10px;
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
  background-color: #AD88EB;
  margin-top: 27px;
  opacity: 1;
  border-radius: 50px;
  transition: all ease 0.3s;
`;
const SearchContainer = styled.div`
  display: flex;
  line-height: 17px;
  border-radius: 50px;
  border: solid 1.5px #959393;
  padding: 10px 0px 10px 20px;
  width: 40vw;
`;
const Search = styled.input`
  border: none;
  width: 38vw;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #c8cad2;
  }
`;
const ButtonContainer = styled.div`
  margin-right: 75px;
`;
const StyledButton = styled.button`
  background: #fff;
  margin: 0px 5px 0px 0px;
  border: 0px;
  cursor: pointer;
`;
const LogoImg = styled.div`
  margin-left: 50px;
  margin-right: 52px;
  margin-top: 5px;
  cursor: pointer;
`;
const LogoNaviContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Topbar = () => {
  const isDesktop = useMediaQuery({ minWidth: 1300 });
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Bar>
      <LogoNaviContainer
        style={
          location.pathname === "/" || location.pathname === "/login"
            ? { marginBottom: "35.7px" }
            : {}
        }
      >
        <LogoImg onClick={() => navigate("/")}>
          <img src={logo} />
        </LogoImg>
        <NavContainer>
          <Navi onClick={() => navigate("/apply")}>
            프로그램 신청
            {location.pathname !== "/login" &&
              location.pathname !== "/" &&
              location.pathname === "/apply" && (
                <Line style={{background:"AD88EB"}}initial={{ scale: 0 }} animate={{ scale: 1 }} />
              )}
          </Navi>
          <Navi onClick={() => navigate("/my")}>
            마이페이지
            {location.pathname !== "/login" &&
              location.pathname !== "/" &&
              location.pathname.substring(0, 3) === "/my" && (
                <Line initial={{ scale: 0 }} animate={{ scale: 1 }} />
              )}
          </Navi>
        </NavContainer>
      </LogoNaviContainer>
      {isDesktop? <SearchContainer>
        <Search
          type="text"
          value={search}
          placeholder="필요한 프로그램을 찾아보세요. (예: 바리스타)"
          onChange={onChange}
        />
        <StyledButton>
          <BsSearch />
        </StyledButton>
      </SearchContainer> : <div/>}
      <ButtonContainer>
        <StyledButton
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인/회원가입
        </StyledButton>
      </ButtonContainer>
    </Bar>
  );
};

export default Topbar;
