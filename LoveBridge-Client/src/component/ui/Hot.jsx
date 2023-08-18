import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Dummy from "../../dummy.json";
import PrevArrow from "../img/prev.svg";
import NextArrow from "../img/next.svg";
import hotIcon from "../img/hot-program.svg";
import axios from "axios";

const Hot = () => {
  const prevArrow = useCallback(() => slickRef.current.slickPrev(), []);
  const nextArrow = useCallback(() => slickRef.current.slickNext(), []);

  const [applyCards, setApplyCards] = useState([]);
  const [editedCards, setEditedCards] = useState({});

  useEffect(() => {
    fetchHotCards();
  }, []);

  const fetchHotCards = () => {
    axios
      .get("http://127.0.0.1:8000/programs/popular/")
      .then((response) => {
        setApplyCards(response.data);
        const initialEditedCards = {};
        response.data.forEach((item) => {
          const fullImageUrl = `http://127.0.0.1:8000${item.image}`;
          initialEditedCards[item.id] = {
            id: item.id,
            title: item.title,
            district: item.district,
            image: fullImageUrl,
            deadline_yy: item.deadline_yy,
            deadline_mm: item.deadline_mm,
            deadline_dd: item.deadline_dd,
            like: item.like,
          };
        });
        console.log(initialEditedCards);
        setEditedCards(initialEditedCards);
        console.log(editedCards);
      })
      .catch((error) => {
        console.error("Error fetching cards: ", error);
      });
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    slidesSpacing: 0,
    prevArrow: (
      <PrevBtn onClick={prevArrow}>
        <img src={PrevArrow} />
      </PrevBtn>
    ),
    nextArrow: (
      <NextBtn onClick={nextArrow}>
        <img src={NextArrow} />
      </NextBtn>
    ),
  };

  const slickRef = useRef(null);

  const navigate = useNavigate();

  const confirmApply = (e, Id) => {
    var programName =
      e.target.parentElement.parentElement.parentElement.children[1].textContent;
    console.log(Id, programName);
    if (window.confirm(`[${programName}] 정말 신청하시겠습니까?`)) {
      axios.post(`http://127.0.0.1:8000/programs/list/${Id}/`);
      alert(
        `[${programName}] 신청이 완료되었습니다. \n 마이페이지의 내가 신청한 프로그램 페이지로 이동합니다. `
      );
      navigate("/my/apply");
    } else {
      alert("취소합니다.");
    }
  };

  return (
    <div>
      <Header>
        <Topic>
          <img src={hotIcon} />
          인기 프로그램
        </Topic>
        <p>실시간으로 가장 인기있는 프로그램이에요.</p>
      </Header>
      <Wrap>
        <Slider ref={slickRef} {...settings}>
          {applyCards.map((hot) => (
            <Item key={hot.id}>
              <Img src={editedCards[hot.id]?.image}></Img>
              <Title>{editedCards[hot.id]?.title}</Title>
              <Info2>
                <Address><Icon src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1QgYHzN6PBUabIa3QemaYjAU19wv_Xxd0AF-PTM&s" alt="지역 이미지" /> {editedCards[hot.id]?.district}</Address>
                <Deadline><Icon src="https://cdn-icons-png.flaticon.com/512/2983/2983723.png" alt="마감일 이미지" /> {editedCards[hot.id]?.deadline_yy+'.'+editedCards[hot.id]?.deadline_mm+'.'+editedCards[hot.id]?.deadline_dd}</Deadline>
                <Info1>
                  <Like><Icon src="https://cdn-icons-png.flaticon.com/512/39/39559.png" alt="좋아요 이미지" /> {editedCards[hot.id]?.like}</Like>
                  <button onClick={(e) => confirmApply(e, hot.id)}>신청</button>
                </Info1>
              </Info2>
            </Item>
          ))}
        </Slider>
      </Wrap>
    </div>
  );
};

export default Hot;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: -10px;
  p {
    color: #939393;
    font-family: Noto Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-left: 80px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
`;

const Topic = styled.h3`
  color: #3a3a3a;
  font-family: Akshar;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 60px;
  margin-left: 40px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-right: 10px;
    margin-top: 3px;
    width: 30px;
    height: 30px;
  }
`;

const Wrap = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  .slick-list {
    width: 1440px;
    height: 357px;
  }
  .slick-active {
    width: 290px !important;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px !important;
  height: 345px;
  padding: 16px 16px;
  margin-left: 0px;
  margin-right: 0px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid #666;
  background: #fff;
  box-shadow: 0px 30px 44px 0px rgba(198, 198, 198, 0.25);
`;

const Img = styled.img`
  width: 235px;
  margin-right: 0px !important;
  flex-shrink: 0;
  border-radius: 22px;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  color: #1b1b1b;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 240px;
  margin-left: 7px;
  margin-right: 0px !important;
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 7px;
`;

const Address = styled.p`
  color: #5c5c5c;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 240px;
  margin-left: 7px;
  margin-bottom: 6px;
  margin-right: 0px !important;
  display: flex;
  flex-direction: row;
`;

const Deadline = styled.div`
  color: #5c5c5c;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 240px;
  margin-left: 7px;
  margin-right: 0px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Like = styled.div`
  color: #5c5c5c;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 240px;
  margin-left: 7px;
  margin-top: 6px;
  margin-right: 0px !important;
  display: flex;
  flex-direction: row;
`;

const Info1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: -7px;
  button {
    display: flex;
    width: 68px;
    height: 30px;
    border-radius: 4px;
    background: #AD88EB;
    border: none;
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    margin-right: 5px;
    bottom: 5px;
  }
`;

const Info2 = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const PrevBtn = styled.button`
  position: relative;
  left: -32px;
  top: 150px;
  border: none;
  background-color: white;
  z-index: 10;
`;

const NextBtn = styled.button`
  right: 20px;
  top: 150px;
  border: none;
  background-color: white;
  z-index: 10;
`;
