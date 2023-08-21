import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  border-radius: 30px;
  border: 1px solid #dbdbdb;
  background: #fdfdfd;
  padding: 30px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const InfoContainer = styled.div``;
const Title = styled.div`
  color: #1c1c1c;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const District = styled.div`
  color: #4f4f4f;
  font-size: 16px;
  font-weight: 350;
  letter-spacing: -0.8px;
  margin-top: 10px;
`;
const BtnContainer = styled.div``;
const State = styled.div`
  border-radius: 10px;
  border: 1px solid #ad88eb;
  background: #ad88eb;
  width: 198.219px;
  color: #fff;
  text-align: center;
  letter-spacing: 0px;
  padding: 8px 0;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Cancel = styled.button`
  border-radius: 10px;
  border: 1px solid #b8b8b8;
  background: #fff;
  width: 198.219px;
  color: #4f4f4f;
  text-align: center;
  padding: 8px 0;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    border: 1px solid #f62f2f;
    color: #f62f2f;
  }
`;

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
  );
}

export default Applied;
