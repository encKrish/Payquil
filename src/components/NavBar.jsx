import React, { } from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = ({ items, state, colors }) => {
    if (colors === undefined) colors = ['red'];
    if (colors.length === 1)
        for (let i = 0; i < items.length - 1; i++)
            colors.push(colors[0]);

    const disabledStyle = "text-gray-500 hover:text-gray-300";
    const activeStyle = "font-bold";
    return (
        <nav className="flex space-x-2 w-full border-b bg-gray-900 border-gray-600 px-2 py-1 sticky top-0">
            {items.map((item, idx) => <NavLink key={idx} to={item.href}
                className={`w-1/2 p-2 cursor-pointer text-center ${state[0] === idx ? `text-${colors[idx]}-500 ${activeStyle}` : disabledStyle}`}
                onClick={() => state[1](idx)}>{item.title}</NavLink>)}
        </nav>
    )
}

export default NavBar
