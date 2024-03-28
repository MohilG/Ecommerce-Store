import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assests/logo.png';
import cart from '../Assests/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import dropdown_icon from '../Assests/dropdown_icon.png'
export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotItem}=useContext(ShopContext)
    const menuRef=useRef();
    const dropDown=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Logo" />
                <p>Shopper</p>
            </div>
            <img  className='nav-dropdown' onClick={dropDown} src={dropdown_icon} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
                    {menu === 'shop' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("men") }}>
                    <Link to='/men' style={{ textDecoration: 'none' }}>Men</Link>
                    {menu === 'men' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("women") }}>
                    <Link to='/women' style={{ textDecoration: 'none' }}>Women</Link>
                    {menu === 'women' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>
                    {menu === 'kids' ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-login-cart">
            {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Sign Out</button>:<Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>}

                <Link to='/cart'><img src={cart} alt="Cart" /></Link>
                <div className="nav-cart-count">{getTotItem()}</div>
            </div>
        </div>
    );
};
