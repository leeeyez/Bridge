import React from 'react'
import styled from 'styled-components';
import footerimg from '../img/footer.svg';

const Bottom = styled.div`
margin-top: 200px;
text-align: center;
  > img {
    width: 90%;
  }
`

function Footbar() {
  return (
    <Bottom>
        <img src={footerimg}/>
    </Bottom>
  )
}

export default Footbar