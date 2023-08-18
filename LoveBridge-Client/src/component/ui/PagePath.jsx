import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import home from '../img/home.svg';
import arrow from '../img/arrow.svg';

const Wrapper = styled.div`
    display: flex;
    height: 23px;
    width: fit-content;
    align-items: center;
`
const HomeIcon = styled.div`
    margin: 4px 2px 0px 0px;
    cursor: pointer;
`
const PageName = styled.div`
    margin: 0px 5px 0px 5px;
    color: #666;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
`
const ArrowIcon = styled.div`
    margin: 0px 5px 0px 5px;
`
const Path1 = styled.div`
    display: flex;
`
const Path2 = styled.div`
    display: flex;
`
const Home = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`



function PagePath(props) {
    const { pathname1, pathname2 } = props;
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Wrapper>
            <Home onClick={() => { navigate('/') }}>
            <HomeIcon><img src={home}/></HomeIcon>
            <PageName>홈</PageName>
            </Home>
            { pathname1 &&
            <Path1>
            <ArrowIcon><img src={arrow}/></ArrowIcon>
            {pathname1 && location.pathname.substring(0,3) === "/my"? <PageName onClick={() => navigate('/my')}>{pathname1}</PageName> : <PageName >{pathname1}</PageName>}
            </Path1>
            }
            { pathname2 &&
            <Path2>
            <ArrowIcon><img src={arrow}/></ArrowIcon>
            <PageName>{pathname2}</PageName>
            </Path2>
            }
        </Wrapper>
    );
};

export default PagePath;