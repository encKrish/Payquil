import React, { useState, useEffect } from 'react';
import SelectorGroup from '../components/SelectorGroup';
import Switcher from '../components/Switcher';

// const SuperfluidSDK = require("@superfluid-finance/js-sdk");
// const { Web3Provider } = require("@ethersproject/providers");

const CreatePayment = ({ signerAdx }) => {
    const durationState = useState(-1);
    const typeState = useState(-1);
    const contPayState = useState(-1);

    let inputStyle = "p-3 mt-1 w-full rounded-md text-gray-300 placeholder-gray-700 outline-none active:border-red-500 bg-gray-900";
    const SingleComp = <div className=""><input type="number" placeholder="Enter amount" className={inputStyle} /></div>;
    const ContComp = <div className="flex space-x-2"><input type="number" placeholder="Enter amount" className={inputStyle} /><SelectorGroup items={['D', 'W', 'M', 'Y']} state={contPayState} space={2} /></div>;

    return (
        <div>
            <div className="flex pt-20 items-center space-x-2">
                <div className="rounded-full h-6 w-10 bg-red-600 border-4 border-red-800"></div>
                <span className="text-3xl font-bold text-white">Create new payment</span>

            </div>
            <SelectorGroup title="Paygate duration" items={['One-time', 'Perpetual',]} state={durationState} />
            <SelectorGroup title="Payment type" items={['Single', 'Continuous']} state={typeState} />
            <Switcher components={[SingleComp, ContComp]} state={typeState} />

            <h3 className="text-sm text-gray-400 mt-5">Deposit address <i className="italic">(from Metamask)</i></h3>
            <p className="text-xs overflow-hidden p-3 mb-4 mt-1 w-full rounded-md text-gray-800 outline-none active:border-red-500 bg-gray-700" >{signerAdx}</p>

        </div>
    )
}

export default CreatePayment
