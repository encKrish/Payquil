import React, { useState } from 'react'
import ReceiptView from '../components/ReceiptView';
import { readJsonfromIpfs } from '../api/ipfsUtils';

const Payments = ({signerAdx}) => {
		const [success, setSuccess] = useState(0);
    let inputStyle = "p-2 rounded-lg bg-gray-900 w-full outline-none placeholder-gray-600 text-gray-400";
    const [cid, setCid] = useState('')
    const [receipt, setReceipt] = useState(undefined)

    let submitEvent = () => {
console.log("Submit event triggered");
        readJsonfromIpfs(cid).then((res) => { setReceipt(res); console.log(receipt) });
        setSuccess(0);
    }

    return (
        <div>
            <input value={cid} type="text" placeholder="Enter amount" className={`py-3 mt-3 ${inputStyle}`} onChange={e => setCid(e.target.value)} />
            <button onClick={submitEvent} className='p-2 w-full rounded-lg bg-cyan-500 hover:bg-cyan-400 transition-colors text-white font-bold text-lg tracking-wide border-cyan-900 border-2 mt-2 mb-8'>Submit</button>
            {success === 0 ? (receipt !== undefined
                ? <ReceiptView data={receipt} signerAdx={signerAdx} setSuccess={setSuccess}/>
                : <></>) : <p className="text-cyan-200">Transaction successful!</p>}
        </div>
    )
}

export default Payments
