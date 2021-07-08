
const SelectorGroup = ({ items, state, title, colors, space }) => {
    if (colors === undefined) colors = ['red'];
    if (colors.length === 1)
        for (let i = 0; i < items.length - 1; i++)
            colors.push(colors[0]);

    space = space === undefined ? 4 : space;
    const disabledStyle = "text-gray-500 hover:text-gray-300 border-gray-900 bg-gray-900";
    const activeStyle = "text-white font-bold bg-gray-900";
    return (
        <div>
            {title !== undefined ? <h3 className="pt-6 text-sm text-gray-400">{title}</h3> : <></>}
            <div className={`py-1 flex space-x-${space}`}>
                {items.map((item, idx) => <button key={idx} className={`border-2 w-1/2 p-2 cursor-pointer rounded-lg text-center ${state[0] === idx ? `border-${colors[idx]}-500 ${activeStyle}` : disabledStyle}`} onClick={() => state[1](idx)}>{item}</button>)}
            </div>
        </div>
    )
}

export default SelectorGroup
