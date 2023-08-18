import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import PagePath from '../../ui/PagePath';
import ApplyCard from "../../ui/ApplyCard";
import nolikeIcon from '../../img/nolike.svg';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 45px 136px 150px 123px;
  background: #F4F2FB;
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 38vw 38vw;
  justify-content: space-between;
`
const NoLike = styled.div`
  text-align: center;
  > img {
    width: 40px;
  }
`
const Txt = styled.div`
  margin-top: 20px;
  color: #454545;
  font-family: Noto Sans KR;
  font-size: 1em;
  font-weight: 400;
`

function MyLikePage() {
  const isDesktop = useMediaQuery({ minWidth: 750 });
  const navigate = useNavigate();
  const [likeCards, setLikeCards] = useState([]);
  const [editedCards, setEditedCards] = useState({});
  const [isexist, setExist] = useState(false);

useEffect(() => {
  fetchLikeCards();
}, [likeCards]);

const fetchLikeCards = () => {
  axios.get('http://127.0.0.1:8000/mypage/mylike/')
    .then(response => {
      setLikeCards(response.data);
      console.log(likeCards);
      const initialEditedCards = {};
      response.data.forEach(item => {
        const fullImageUrl = `http://127.0.0.1:8000${item.program.image}`;
        initialEditedCards[item.program.id] = {
          id: item.program.id,
          title: item.program.title,
          district: item.program.district,
          image: fullImageUrl,
          agency: item.program.agency,
          deadline_yy: item.program.deadline_yy,
          deadline_mm: item.program.deadline_mm,
          deadline_dd: item.program.deadline_dd,
          phone: item.program.phone,
          category1: item.program.category1,
          category2: item.program.category2,
          applicant: item.program.applicant,
          like: item.program.like,
          iflike: item.program.iflike,
        }
      });
      console.log(initialEditedCards);
      setEditedCards(initialEditedCards);
      console.log(editedCards);
    })
    .catch(error => {
      console.error('Error fetching cards: ', error);
    });
    if(likeCards.length > 0) {setExist(true);}
};

// const fetchLikeCards = () => {
//   axios.get('http://127.0.0.1:8000/mypage/mylike/')
//   .then(response => {
//     setLikeCards(response.data);
//     console.log(response.data);
//     for ( var i = 0; i < response.data.length; i++) {
//       likeCards[i] = { 
//             id: response.data[i].program.id,
//             title: response.data[i].program.title,
//             district: response.data[i].program.district,
//             image: response.data[i].program.image,
//             agency: response.data[i].program.agency,
//             deadline: '20'+response.data[i].program.deadline_yy+response.data[i].program.deadline_mm+response.data[i].program.deadline_dd,
//             phone: response.data[i].program.phone,
//             category1: response.data[i].program.category1,
//             category2: response.data[i].program.category2,
//             applicant: response.data[i].program.applicant,
//             like: response.data[i].program.like,
//             iflike: response.data[i].program.iflike,
//             // userid: card.userid, 
//           };
//     };
//   })
//   .catch(error => {
//     console.error('Error fetching cards: ', error);
//   });
//   if(likeCards.length > 0) {setExist(true);}
//   console.log('ee');
// };

const confirmApply = (e, Id) => {
  var programName = e.target.parentElement.parentElement.children[2].textContent;
  console.log(Id);
  //var Id = e.target
  if (window.confirm(`[${programName}] 정말 신청하시겠습니까?`)) {
    axios.post(`http://127.0.0.1:8000/programs/list/${Id}/`)
    alert(`[${programName}] 신청이 완료되었습니다. \n 마이페이지의 내가 신청한 프로그램 페이지로 이동합니다. `);
    navigate('/my/apply');
  } else {
    alert("취소합니다.");
  }
  
}; // 신청 시 alert

const handleLike = (e, Id, iflike) => {
  console.log(iflike);
  var programName = e.target.parentElement.parentElement.parentElement.parentElement.children[2].textContent;
    if (window.confirm(`[${programName}] 찜을 취소하시겠습니까?`)) {
      axios.post(`http://127.0.0.1:8000/programs/mylike/${Id}/`, {
        iflike: iflike,
      })
      alert(`[${programName}] 찜이 취소되었습니다.`);
      window.location.reload();
    } else {
      alert("아직 찜 상태입니다.");
    }
} // 좋아요 handle

  return (
    <>
    {isDesktop? 
    <Wrapper>
      <PagePath pathname1="마이페이지" pathname2="내가 찜한 목록"/>
          {!isexist? 
          <>
          <hr style={{margin: "50px 0px 50px 0px"}}/>
          <NoLike>
            <img src={nolikeIcon}/>
            <Txt>내가 찜한 목록이 없습니다.<br/>관심 있는 프로그램에 좋아요를 눌러 담아보세요.</Txt>
          </NoLike>
          </>
        :
        <>
        <hr style={{margin: "50px 0px 50px 0px"}}/>
        <CardContainer>
        {likeCards && likeCards.map(card => (
          <div key={card.program.id} className='card-div'>
            <ApplyCard
              id={card.program.id}
              title={card.program.title}
              agency={card.program.agency}
              image={editedCards[card.program.id]?.image}
              deadline={card.program.deadline_yy+'.'+card.program.deadline_mm+'.'+card.program.deadline_dd}
              district={card.program.district}
              tel={card.program.phone}
              like={card.program.like}
              iflike={card.program.iflike}
              tag1={card.program.category1}
              tag2={card.program.category2}
              applicants={card.program.applicant+'명'}
              onClickApply={(e) => confirmApply(e, card.program.id)}
              onClickLike={(e) => handleLike(e, card.program.id, card.program.iflike)}
            />
          </div>
        ))}</CardContainer></>}
    </Wrapper>
    :
    <MobileWrapper>
      <PagePath pathname1="마이페이지" pathname2="내가 찜한 목록"/>
          {!isexist? 
          <>
          <hr style={{margin: "50px 0px 50px 0px"}}/>
          <NoLike>
            <img src={nolikeIcon}/>
            <Txt>내가 찜한 목록이 없습니다.<br/>관심 있는 프로그램에 좋아요를 눌러 담아보세요.</Txt>
          </NoLike>
          </>
        :
        <>
        <hr style={{margin: "50px 0px 50px 0px"}}/>
        <MobileCardContainer>
        {likeCards && likeCards.map(card => (
          <div key={card.id} className='card-div'>
            <ApplyCard
              id={card.program.id}
              title={card.program.title}
              agency={card.program.agency}
              image={editedCards[card.program.id]?.image}
              deadline={card.program.deadline_yy+'.'+card.program.deadline_mm+'.'+card.program.deadline_dd}
              district={card.program.district}
              tel={card.program.phone}
              like={card.program.like}
              iflike={card.program.iflike}
              tag1={card.program.category1}
              tag2={card.program.category2}
              applicants={card.program.applicant+'명'}
              onClickApply={(e) => confirmApply(e, card.program.id)}
              onClickLike={(e) => handleLike(e, card.program.id, card.program.iflike)}
            />
          </div>
        ))}</MobileCardContainer></>}
    </MobileWrapper>}
    </>
  )
}
const MobileWrapper = styled.div`
  padding: 45px 50px 0px 50px;
`
const MobileCardContainer = styled.div`

`

export default MyLikePage