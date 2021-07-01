import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';
import CreatePayment from './pages/CreatePayment';
import Home from './pages/Home';
import Payments from './pages/Payments';
import NavBar from './components/NavBar';
// react-icons
const ethers = require('ethers');
let provider, signer;

async function connectWallet() {
  window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
  signer = await provider.getSigner();
  let signerAddress = signer.getAddress();
  return signerAddress;
}

function App() {
  let [signerAdx, updateSignerAdx] = useState('Not available');
  let [page, updatePage] = useState(0);

  useEffect(() => connectWallet().then((address) => updateSignerAdx(address)));
  return (
    <div className="App">
      <NavBar items={[{ title: 'Home', href: '/' }, { title: 'Create', href: '/create' }, { title: 'Pay', href: '/pay' }]} state={[page, updatePage]} />
      <div className="px-4">
        <Route exact path="/">
          <Home />
        </Route>

        <Route path='/create'>
          <CreatePayment signerAdx={signerAdx} />
        </Route>

        <Route path='/pay'>
          <Payments />
        </Route>
      </div>
    </div >
  );
}

export default App;
