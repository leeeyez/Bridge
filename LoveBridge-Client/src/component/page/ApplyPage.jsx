import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import PagePath from "../ui/PagePath";
import Select from "react-select";
import Button from "../ui/Button";
import ApplyCard from "../ui/ApplyCard";
import Pagination from "react-js-pagination";
import "../style/Pagenation.css";
import Dummy from "../../dummy.json";

const Wrapper = styled.div`
  padding: 45px 136px 0px 123px;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-top: 50px;
`;
const Info = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 350;
  letter-spacing: -0.8px;
  margin-top: 10px;
  margin-bottom: 40px;
  letter-spacing: -0.8px;
`;
const SelectBox = styled.div`
  border: 0.973px solid rgba(0, 0, 0, 0.2);
  padding: 30px 45px 60px 45px;
  background: #F4F2FB;
`;
const PuppleTxt = styled.div`
  color: #ad88eb;
  font-size: 15.565px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.778px;
`;
const SelectContainer = styled.div`
  margin: 3vh 0 3vh 0; 
`;

const SelectLine = styled.div`
  display: flex;
  padding: 3vh 0 0 10vw;
`;
const RegionSelect = styled(Select)`
  width: 20vw;
  margin-left: 25px;

  .select-placeholder-text {
    color: #4f4f4f;
  }
`;
const CategorySelect = styled(Select)`

  .select-placeholder-text {
    color: #4f4f4f;
  }
`;
const SortSelect = styled(Select)`
  width: 9vw;
`;
const Txt = styled.div`
  color: #222;
  font-size: 15.565px;
  font-weight: 500;
  letter-spacing: -0.778px;
  padding: 7.592px 69.07px 16.538px 0px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: auto;
  > Button {
    width: 12vw;
    border-radius: 7.783px;
  }
`;
const StyledButton = styled.div`
  > Button {
    background: #6d6f82;
    width: 12vw;
    margin-right: 5px;
    border-radius: 7.783px;
  }
`;
const Total = styled.div`
  display: flex;
  margin: 5vh 0 1vh 0;
  font-weight: 350;
  font-size: 20px;
  color: #222;
  letter-spacing: -1px;

  .pupple {
    font-size: 20px;
    font-weight: 350;
  }
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 38vw 38vw;
  justify-content: space-between;
`;
// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     '&:active': {
//       ...provided[":active"],
//       borderColor: "#AD88EB"},
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected? "#AD88EB" : "#fff",
//     '&:hover': {backgroundColor: "#F4F2FB"},
//   }),
// };

let regionOption = [
  { value: "선택 없음", label: "선택 없음" },
  { value: "서울특별시", label: "서울특별시" },
  { value: "부산광역시", label: "부산광역시" },
  { value: "인천광역시", label: "인천광역시" },
  { value: "대전광역시", label: "대전광역시" },
  { value: "대구광역시", label: "대구광역시" },
  { value: "광주광역시", label: "광주광역시" },
  { value: "울산광역시", label: "울산광역시" },
]
let seoulOption = [
  { value: "강남구", label: "강남구" },
  { value: "광진구", label: "광진구" },
  { value: "노원구", label: "노원구" },
  { value: "도봉구", label: "도봉구" },
  { value: "종로구", label: "종로구" },
  { value: "중랑구", label: "중랑구" },
  { value: "서초구", label: "서초구" },
  { value: "영등포구", label: "영등포구" },
  { value: "용산구", label: "용산구" },
  { value: "은평구", label: "은평구" },
]
let busanOption = [
  { value: "해운대구", label: "해운대구" },
  { value: "북구", label: "북구" },
]
let daeguOption = [
  { value: "달서구", label: "달서구" },
  { value: "북구", label: "북구" },
]
let daejeonOption = [
  { value: "동구", label: "동구" },
  { value: "북구", label: "북구" },
]
let incheonOption = [
  { value: "부평구", label: "부평구" },
  { value: "미추홀구", label: "미추홀구" },
]
let noOption = [
  { value: "지역 없음", label: "지역 없음" },
]

let categoryOption = [
  { value: "선택 없음", label: "선택 없음" },
  { value: "자격증", label: "자격증" },
  { value: "취미", label: "취미" },
  { value: "체험", label: "체험" },
  { value: "운동", label: "운동" },
  { value: "음악", label: "음악" },
]

let sortOption = [
  { value: "최신순", label: "최신순" },
  { value: "인기순", label: "인기순" },
  { value: "마감임박순", label: "마감임박순" },
]
const defaultSort = sortOption[0];

function ApplyPage() {
  const isDesktop = useMediaQuery({ minWidth: 750 });
  const navigate = useNavigate();
  const location = useLocation();
  const [invalidated, setInvalidated] = useState(0);

  const [total, setTotal] = useState(30);
  const [region, setRegion] = useState("");
  const [ region2, setRegion2 ] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [ region2Option, setRegion2Option ] = useState([]);

  const handleRegion2Option = (e) => {
    if (e.value === "서울특별시") {
        setRegion2Option(seoulOption);
    }
    else if (e.value === "부산광역시") {
        setRegion2Option(busanOption);
    }
    else if (e.value === "대구광역시") {
      setRegion2Option(daeguOption);
    }
    else if (e.value === "대전광역시") {
      setRegion2Option(daejeonOption);
    }
    else if (e.value === "인천광역시") {
      setRegion2Option(incheonOption);
    }
    else {
      setRegion2Option(noOption);
    }
  } // 시 선택에 따른 구 옵션 설정

  const [page, setPage] = useState(1);
  
  const handlePageChange = (page) => {
    setPage(page);
  }; // pagenation에서 page 설정



  const RegionSelectRef = useRef(null);
  const Region2SelectRef = useRef(null);
  const CategorySelectRef = useRef(null);
  const SortSelectRef = useRef(null);

  const handleReset = () => {
    if (
      RegionSelectRef.current || Region2SelectRef.current || CategorySelectRef.current || SortSelectRef.current
    ) {
      RegionSelectRef.current.setValue("선택 없음");
      Region2SelectRef.current.setValue("선택 없음");
      CategorySelectRef.current.setValue("선택 없음");
      SortSelectRef.current.setValue("");
    } //console.log('초기화');
  }; // 초기화 기능

  const confirmApply = (e, Id) => {
    console.log(e.target);
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

  const handleLike = (e, Id, iflike, like) => {
    var programName = e.target.parentElement.parentElement.parentElement.parentElement.children[2].textContent;
    if (iflike === true) {
      if (window.confirm(`[${programName}] 찜을 취소하시겠습니까?`)) {
        axios.post(`http://127.0.0.1:8000/programs/mylike/${Id}/`, {
          iflike: iflike,
        })
        alert(`[${programName}] 찜이 취소되었습니다.`);
        window.location.reload();
      } else {
        alert("아직 찜 상태입니다.");
      }
    } else {
      if (window.confirm(`[${programName}] 찜하시겠습니까?`)) {
        axios.post(`http://127.0.0.1:8000/programs/mylike/${Id}/`, {
          iflike: iflike,
        })
        alert(`[${programName}] 찜 목록에 저장되었습니다. \n 마이페이지의 내가 찜한 목록 페이지로 이동합니다.`);
        navigate('/my/like');
        // setEditedCards(prevEditedCards => ({
        //   ...prevEditedCards,
        //   [Id]: {
        //     ...prevEditedCards[Id],
        //     ['like']: like+1,
        //   },
        // }));
      } else {
        alert("취소합니다.");
      }
    }
  } // 좋아요 handle

  const [applyCards, setApplyCards] = useState([]);
  const [editedCards, setEditedCards] = useState({});

  const handleSearch = () => {
    console.log(region+' '+region2, category, sort)
    axios.post(`http://127.0.0.1:8000/programs/search/`, {
      district: region+' '+region2, 
      category: category, 
      sort: sort
    })
    .then(response => {
      console.log(response);
      setRegion('');
      setRegion2('');
      setCategory('');
      setSort('');
      setApplyCards(response.data);
    console.log(response.data);
    for ( var i = 0; i < response.data.length; i++) {
      applyCards[i] = { 
            id: response.data[i].id,
            title: response.data[i].title,
            district: response.data[i].district,
            image: 'http://127.0.0.1:8000/'+response.data[i].image,
            agency: response.data[i].agency,
            deadline_yy: response.data[i].deadline_yy,
            deadline_mm: response.data[i].deadline_mm,
            deadline_dd: response.data[i].deadline_dd,
            phone: response.data[i].phone,
            category1: response.data[i].category1,
            category2: response.data[i].category2,
            applicant: response.data[i].applicant,
            like: response.data[i].like,
            iflike: response.data[i].iflike,
            // userid: card.userid, 
          };
      }
      setTotal(response.data.length);
    })
    .catch(error => {
      console.error('Error handle search: ', error);
    });
    console.log(applyCards);
    setTotal(applyCards.length);
    console.log('검색 성공');
};

useEffect(() => {
  fetchApplyCards();
}, []);

var bridge = [];

const fetchApplyCards = () => {
  axios.get('http://127.0.0.1:8000/programs/list/')
    .then(response => {
      setApplyCards(response.data);
      console.log(applyCards);
      const initialEditedCards = {};
      response.data.forEach(item => {
        const fullImageUrl = `http://127.0.0.1:8000${item.image}`;
        initialEditedCards[item.id] = {
          id: item.id,
          title: item.title,
          district: item.district,
          image: fullImageUrl,
          agency: item.agency,
          deadline_yy: item.deadline_yy,
          deadline_mm: item.deadline_mm,
          deadline_dd: item.deadline_dd,
          phone: item.phone,
          category1: item.category1,
          category2: item.category2,
          applicant: item.applicant,
          like: item.like,
          iflike: item.iflike,
        }
      });
      console.log(initialEditedCards);
      setEditedCards(initialEditedCards);
      console.log(editedCards);
    })
    .catch(error => {
      console.error('Error fetching cards: ', error);
    });
};

  return (
    <>
    {isDesktop? 
    <Wrapper>
      <PagePath pathname1="프로그램 신청" />
      <Title>지원프로그램 검색</Title>
      <Info>한 눈에 보고 , 클릭 한번으로 서비스를 신청할 수 있습니다.</Info>
        <SelectBox>
          <PuppleTxt>항목을 선택해주세요.</PuppleTxt>
          <SelectContainer>
            <SelectLine>
              <Txt>지역</Txt>
              <RegionSelect
                className="react-select-container"
                placeholder={
                  <div className="select-placeholder-text">시 선택</div>
                }
                onChange={(e) => {
                  if (e) {
                    setRegion(e.value);
                  } else {
                    setRegion("선택 없음");
                  }
                  handleRegion2Option(e)
                }}
                options={regionOption}
                ref={RegionSelectRef}
                //styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
              <RegionSelect className="react-select-container"
                    placeholder={<div className="select-placeholder-text">구 선택</div>}
                    onChange={ (e) => {
                      if (e) {
                        setRegion2(e.value);
                      } else {
                        setRegion2("선택 없음");
                      }
                    }}
                    options={region2Option}
                    ref={Region2SelectRef}
                    //styles={customStyles}
                    components={{
                        IndicatorSeparator: () => null
                    }}/>
            </SelectLine>
            <SelectLine>
              <Txt>카테고리</Txt>
              <CategorySelect className="react-select-container"
                placeholder={<div className="select-placeholder-text">선택없음</div>}
                onChange={(e) => {
                  if (e) {
                    setCategory(e.value);
                  } else {
                    setCategory("선택 없음");
                  }
                }}
                options={categoryOption}
                ref={CategorySelectRef}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </SelectLine>
            <SelectLine>
              <Txt>검색정렬</Txt>
              <SortSelect
                className="react-select-container"
                placeholder=""
                value={defaultSort}
                onChange={(e) => {
                  if (e) {
                    setSort(e.value);
                  } else {
                    setSort("최신순");
                  }
                }}
                options={sortOption}
                ref={SortSelectRef}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </SelectLine>
          </SelectContainer>
          <ButtonContainer>
            <StyledButton>
              <Button
                className="reset"
                type="button"
                title="초기화"
                onClick={() => handleReset()}
              />
            </StyledButton>
            <Button
              className="search"
              title="검색"
              type="submit" 
              onClick={handleSearch}
            />
          </ButtonContainer>
        </SelectBox>


      <Total>
        총 &nbsp;<PuppleTxt className="pupple">{total}</PuppleTxt> &nbsp;건의
        복지서비스가 있습니다.
      </Total>
      <CardContainer>
          {applyCards && applyCards.map(card => (
            <div key={card.id} className='card-div'>
              <ApplyCard
                title={editedCards[card.id]?.title}
                image={editedCards[card.id]?.image}
                agency={editedCards[card.id]?.agency}
                deadline={editedCards[card.id]?.deadline_yy+'.'+editedCards[card.id]?.deadline_mm+'.'+editedCards[card.id]?.deadline_dd}
                district={editedCards[card.id]?.district}
                tel={editedCards[card.id]?.phone}
                like={editedCards[card.id]?.like}
                iflike={editedCards[card.id]?.iflike}
                tag1={editedCards[card.id]?.category1}
                tag2={editedCards[card.id]?.category2}
                applicants={editedCards[card.id]?.applicant+'명'}
                onClickApply={(e) => confirmApply(e, card.id)}
                onClickLike={(e) => handleLike(e, card.id, card.iflike, card.like)}
              />
            </div>
          ))}
        {/* <ApplyCard 
          id="1"
          onClickApply={(e) => confirmApply(e)}/> */}

        {/* {Dummy.programs.map((card) => (
          <ApplyCard key={card.id}
          id={card.id}
          image = {card.img}
          title={card.title}
          agency={card.agency}
          deadline={'20'+card.deadline}
          phone={card.tel}
          like={card.like}
          iflike={card.iflike}
          tag1={card.tag1}
          tag2={card.tag2}
          onClickApply={(e) => confirmApply(e)}
          /> 
        ))}*/}
      </CardContainer>
    </Wrapper>
    :
    <MobileWrapper>
      <PagePath pathname1="프로그램 신청" />
      <MobileTitle>지원프로그램 검색</MobileTitle>
      <MobileInfo>한 눈에 보고 , 클릭 한번으로 서비스를 신청할 수 있습니다.</MobileInfo>
        <SelectBox>
          <PuppleTxt>항목을 선택해주세요.</PuppleTxt>
          <SelectContainer>
            <MobileSelectLine>
              <Txt>지역(시)</Txt>
              <MobileRegionSelect
                className="react-select-container"
                placeholder={
                  <div className="select-placeholder-text">시 선택</div>
                }
                onChange={(e) => {
                  if (e) {
                    setRegion(e.value);
                  } else {
                    setRegion("선택 없음");
                  }
                  handleRegion2Option(e)
                }}
                options={regionOption}
                ref={RegionSelectRef}
                //styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </MobileSelectLine>
            <MobileSelectLine>
              <Txt>지역(구)</Txt>
            <MobileRegionSelect className="react-select-container"
                    placeholder={<div className="select-placeholder-text">구 선택</div>}
                    onChange={ (e) => {
                      if (e) {
                        setRegion2(e.value);
                      } else {
                        setRegion2("선택 없음");
                      }
                    }}
                    options={region2Option}
                    ref={Region2SelectRef}
                    //styles={customStyles}
                    components={{
                        IndicatorSeparator: () => null
                    }}/>
            </MobileSelectLine>
            <MobileSelectLine>
              <Txt>카테고리</Txt>
              <MobileCategorySelect className="react-select-container"
                placeholder={<div className="select-placeholder-text">선택없음</div>}
                onChange={(e) => {
                  if (e) {
                    setCategory(e.value);
                  } else {
                    setCategory("선택 없음");
                  }
                }}
                options={categoryOption}
                ref={CategorySelectRef}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </MobileSelectLine>
            <MobileSelectLine>
              <Txt>검색정렬</Txt>
              <MobileSortSelect
                className="react-select-container"
                placeholder=""
                onChange={(e) => {
                  if (e) {
                    setSort(e.value);
                  } else {
                    setSort("최신순");
                  }
                }}
                options={sortOption}
                ref={SortSelectRef}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </MobileSelectLine>
          </SelectContainer>
          <MobileButtonContainer>
            <MobileStyledButton>
              <Button
                className="reset"
                type="button"
                title="초기화"
                onClick={() => handleReset()}
              />
            </MobileStyledButton>
            <Button
              className="search"
              title="검색"
              type="submit" 
              onClick={handleSearch}
            />
          </MobileButtonContainer>
        </SelectBox>
        <MobileTotal>
        총 &nbsp;<PuppleTxt className="pupple">{total}</PuppleTxt> &nbsp;건의
        복지서비스가 있습니다.
      </MobileTotal>
      <MobileCardContainer>
          {applyCards && applyCards.map(card => (
            <div key={card.id} className='card-div'>
              <ApplyCard
                title={editedCards[card.id]?.title}
                image={editedCards[card.id]?.image}
                agency={editedCards[card.id]?.agency}
                deadline={editedCards[card.id]?.deadline_yy+'.'+editedCards[card.id]?.deadline_mm+'.'+editedCards[card.id]?.deadline_dd}
                district={editedCards[card.id]?.district}
                tel={editedCards[card.id]?.phone}
                like={editedCards[card.id]?.like}
                iflike={editedCards[card.id]?.iflike}
                tag1={editedCards[card.id]?.category1}
                tag2={editedCards[card.id]?.category2}
                applicants={editedCards[card.id]?.applicant+'명'}
                onClickApply={(e) => confirmApply(e, card.id)}
                onClickLike={(e) => handleLike(e, card.id, card.iflike, card.like)}
              />
            </div>
          ))}
          </MobileCardContainer>
      </MobileWrapper>}
    </>
  );
}
const MobileWrapper = styled.div`
  padding: 45px 50px 0px 50px;
`
const MobileTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -2px;
  margin-top: 50px;
`;
const MobileInfo = styled.div`
  color: #222;
  font-size: 12px;
  font-weight: 350;
  letter-spacing: -0.8px;
  margin-top: 10px;
  margin-bottom: 40px;
  letter-spacing: -0.8px;
`;
const MobileSelectLine = styled.div`
  display: flex;
  padding: 3vh 0 0 3vw;
`;
const MobileRegionSelect = styled(Select)`
  width: 25vw;

  .select-placeholder-text {
    color: #4f4f4f;
  }
`;
const MobileCategorySelect = styled(Select)`

  .select-placeholder-text {
    color: #4f4f4f;
  }
`;
const MobileSortSelect = styled(Select)`
  width: 25vw;
`;
const MobileButtonContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: auto;
  > Button {
    width: 25vw;
    border-radius: 7.783px;
  }
`;
const MobileStyledButton = styled.div`
  > Button {
    background: #6d6f82;
    width: 25vw;
    margin-right: 5px;
    border-radius: 7.783px;
  }
`;
const MobileTotal = styled.div`
  display: flex;
  margin: 5vh 0 1vh 0;
  font-weight: 350;
  font-size: 20px;
  color: #222;
  letter-spacing: -1px;

  .pupple {
    font-size: 20px;
    font-weight: 350;
  }
`;
const MobileCardContainer = styled.div`
`;

export default ApplyPage;
