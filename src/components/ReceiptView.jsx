import React, { useState } from 'react'
import { sf, getflowRate, transferERC20 } from '../api/ethersSf';

const ReceiptView = ({ data, signerAdx, setSuccess }) => {
    let tokenName = ['ETHx', 'fDAIx', 'fTUSDx'][data.currency]
    if ((tokenName !== 'ETHx') && (data.type === 0))
        tokenName = tokenName.slice(0, -1);
    const payBill = async () => {
        let amount = getflowRate(data.amount, data.contPayState);
        if (data.type === 0) {
            await transferERC20(sf.tokens[tokenName].address, data.depositAccount, data.amount);
            console.log(`Successfully sent ${amount} ${tokenName} to ${data.depositAccount}.`)
            setSuccess(1);
        }
        else {
            let thisUser = sf.user({ address: signerAdx, token: sf.tokens.fDAIx.address });
            // let creator = sf.user({ address: data.depositAccount, token: sf.tokens[tokenName].address });
            await thisUser.flow({ recipient: data.depositAccount, flowRate: amount });
            console.log(`Successfully started flow of ${amount} ${tokenName} to ${data.depositAccount}.`)
            setSuccess(1);
        }

    }

    return (
        <div className="border border-gray-600 p-4 rounded-lg">
            <div className="border-b border-gray-500 mb-4 pb-1">
                <p className="text-cyan-500 font-bold">Reciever's address: </p>
                <p className="text-gray-400 text-xs">{data.depositAccount}</p>
            </div>
            <p className="text-lg font-bold text-cyan-200">{`${data.amount} 
            ${tokenName} 
            ${data.type === 1 ? 'per ' + ['day', 'week', 'month', 'year'][data.contPayState] : ''}`}</p>

            {signerAdx !== undefined ? <button onClick={payBill} className="p-2 mt-4 w-full bg-blue-600 hover:bg-blue-500 rounded-md font-bold text-lg">Pay</button> : <></>}
        </div>
    )
}

ReceiptView.defaultProps = {
    pay: false
}

export default ReceiptView
