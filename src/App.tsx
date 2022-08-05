import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import {
  selectItems, selectLoading, useAppDispatch, fetchBlocksData,
} from './store';
import { Header } from './components/header';
import { List } from './components/virtualized-list';
import { Loading } from './components/loading';
import { Search } from './components/search';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectLoading);
  const storeData = useSelector(selectItems);

  useEffect(() => {
    dispatch(fetchBlocksData());
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Search />
        {isLoading ? <Loading /> : <List items={storeData} />}
      </main>
    </div>
  );
}

export default App;
