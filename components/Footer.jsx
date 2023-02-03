import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'


const Footer = () => {
  return (
    <div className='footer-container'>
      <p> 
        2023 PuraVoce All rights reserved
      </p>
      <p className='icons'>
        <a href='https://instagram.com/hadrami_cheikh_tourad?igshid=YmMyMTA2M2Y=' target='blank' >
          <AiFillInstagram  />
        </a>
        <a  href='https://mobile.twitter.com/hadrami13' target='blank'>
          <AiOutlineTwitter />
        </a>
         
         
      </p>
    </div>
  )
}

export default Footer
