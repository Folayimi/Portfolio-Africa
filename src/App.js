import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ShopPage from './Components/ShopPage/ShopPage'
import ProductPage from './Components/ProductPage/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ShopPage/>}/>
        <Route path="/products/:Id" element={<ProductPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
