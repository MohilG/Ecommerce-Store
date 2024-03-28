import React from 'react'
import './Footer.css'
import footer_logo from '../Assests/logo_big.png'
import inst_icon from '../Assests/instagram_icon.png'
import pin_icon from'../Assests/pintester_icon.png'
import wsp_icon from '../Assests/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon"><div className="icon-container">
            <img src={inst_icon} alt="" /></div>
        <div className="icon-container">
            <img src={pin_icon} alt="" /></div>
        <div className="icon-container">
            <img src={wsp_icon} alt="" /></div></div>
            <div className="copyrights">
                <hr />
                
                <p>Coyright @2024 - All Right Reserved</p>
            </div>
    </div>
  )
}

export default Footer