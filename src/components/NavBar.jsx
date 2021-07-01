import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = ({ items, state }) => {
    const disabledStyle = "text-gray-500 hover:text-gray-300";
    const activeStyle = "text-red-500 font-bold";
    return (
        <nav className="flex space-x-2 w-full border-b bg-gray-900 border-gray-600 px-2 py-1 sticky top-0">
            {items.map((item, idx) => <NavLink key={idx} to={item.href}
                className={`w-1/2 p-2 cursor-pointer text-center ${state[0] === idx ? activeStyle : disabledStyle}`}
                onClick={() => state[1](idx)}>{item.title}</NavLink>)}
        </nav>
    )
}

export default NavBar
