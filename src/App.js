import './App.css';
import VsPage from './vsPage';
import FinalRanking from './finalRanking';
import Home from './home';
import { useState } from 'react';

function App() {
  // 0 : Home Page, 1 : Vs Page, 2 : Final Ranking
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div>
      {currentPage === 0 && <Home onPageChange={changePage} setItemsToSort={setItems} />}
      {currentPage === 1 && <VsPage onPageChange={changePage} items={items} onSortFinished={setItems} />}
      {currentPage === 2 && <FinalRanking items={items} onPageChange={changePage} />}
    </div>
  );
}

export default App;
