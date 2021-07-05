import React, { useState } from 'react';
import SelectorGroup from '../components/SelectorGroup';
import Switcher from '../components/Switcher';
import ipfs from 'ipfs';
import { getSelfAdx, initIpfs, sendToIpfs, sendToIpns } from '../api/ipfsUtils';

getSelfAdx().then(res => console.log('IPNS address: ', res[0].id));

let createdList = [];
async function updateList(newHash) {
    createdList.push(newHash);
    let result = await sendToIpns(JSON.stringify(createdList));
    console.log('Resolved IPNS path:', result.value.split('/')[2]);
    return result;
}

// const SuperfluidSDK = require("@superfluid-finance/js-sdk");
// const { Web3Provider } = require("@ethersproject/providers");

const CreatePayment = ({ signerAdx }) => {
    const currencyState = useState(0);
    // const durationState = useState(0);
    const typeState = useState(0);
    const contPayState = useState(0);
    const [amount, setAmount] = useState('');
    const [ipfsAdx, setIpfsAdx] = useState('');

    let inputStyle = "p-2 rounded-lg bg-gray-900 w-full outline-none placeholder-gray-600 text-gray-200";
    const SingleComp = <div className="py-1"><input value={amount} type="number" placeholder="Enter amount" className={`py-3 ${inputStyle}`} onChange={e => setAmount(e.target.value)} /></div>;
    const ContComp = <div className="flex space-x-2 py-1">
        <input value={amount} type="number" placeholder="Enter amount" className={`py-3 ${inputStyle}`} onChange={e => setAmount(e.target.value)} />
        <SelectorGroup items={['D', 'W', 'M', 'Y']} state={contPayState} space={2} colors={['cyan']} />
    </div>

    async function submitEvent() {
        // Structure payment info
        let payInfo = {
            'currency': currencyState[0],
            'type': typeState[0],
            'contPayState': contPayState[0],
            'amount': amount,
            'depositAccount': signerAdx,
        };

        // Send to IPFS
        let result = await sendToIpfs(payInfo);
        updateList(result.path);
        setIpfsAdx(result.path);
        payInfo = { ...payInfo, 'ipnsAddress': ipfsAdx };

        // Reset states
        currencyState[1](0);
        //durationState[1](0);
        typeState[1](0);
        contPayState[1](0);
        setAmount('');

        setTimeout(() => setIpfsAdx(''), 10000);
    }
    return (
        <div>
            <div className="flex pt-20 items-center space-x-2">
                <div className="rounded-full h-6 w-10 bg-cyan-600 border-4 border-cyan-800"></div>
                <span className="text-3xl font-bold text-white">Create new payment</span>
            </div>

            <SelectorGroup title='Currency' items={typeState === 0 ? ['ETHx', 'fDAI', 'fTUSD'] : ['ETHx', 'fDAIx', 'fTUSDx']} state={currencyState} colors={['blue', 'yellow', 'green']} />

            <SelectorGroup title="Payment type" items={['Single', 'Continuous']} state={typeState} colors={['cyan']} />
            <Switcher components={[SingleComp, ContComp]} state={typeState} />

            <h3 className="text-sm text-gray-400 mt-5">Deposit address <i className="italic">(from Metamask)</i></h3>
            <p className="text-xs overflow-hidden p-3 w-full rounded-md text-gray-800 outline-none active:border-cyan-500 bg-gray-700" >{signerAdx}</p>

            {ipfsAdx !== '' ? (<><h3 className="pt-6 text-sm text-gray-400">UNIQUE PAYMENT ID</h3><div className="text-xs rounded-lg bg-gray-700 text-gray-200 p-2 m-1">{ipfsAdx}</div></>) : <></>}

            <button onClick={submitEvent} className='p-2 w-full rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-colors text-white font-bold text-lg tracking-wide border-cyan-900 border-2 mt-8 mb-8'>Submit</button>
        </div>
    )
}

export default CreatePayment
