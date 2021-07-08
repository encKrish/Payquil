import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CreatePayment from './pages/CreatePayment';

import Payments from './pages/Payments';
import NavBar from './components/NavBar';
import { connectAll } from './api/ethersSf';

function App() {
  let [signerAdx, updateSignerAdx] = useState('Not available');
  let [page, updatePage] = useState(0);

  useEffect(() => connectAll().then((res) => {
    updateSignerAdx(res[0])
  }))

  return (
    <div className="App">
      <NavBar items={[{ title: 'Create', href: '/' }, { title: 'Pay', href: '/pay' }]} state={[page, updatePage]} colors={['cyan']} />
      <div className="px-4">
        <Route exact path="/">
          <CreatePayment signerAdx={signerAdx} />
        </Route>

        <Route path='/pay'>
          <Payments signerAdx={signerAdx} />
        </Route>
      </div>
    </div>
  );
}

export default App;
