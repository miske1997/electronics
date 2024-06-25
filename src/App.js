import './App.css';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import NavBar from './components/NavBar/NavBar';
import CategoryPage from './pages/AdminPanel/CategoryTabel/CategoryPanel';
import ArticleTable from './pages/AdminPanel/ArticleTable/ArticlePanel';
import OrdersTable from './pages/AdminPanel/OrdersTable/OrdersPanel';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*"  element={<NavBar/>} >
            <Route index element={<HomePage/> }></Route>
            <Route path="article/:categoryId/:id" element={<ArticlePage/>} ></Route>
            <Route path="browse/:categoryId/*" element={<BrowsePage />} ></Route>
            <Route path="browse"  element={<BrowsePage />} ></Route>
            <Route path="cart" element={<CartPage/>}></Route>
          </Route>  
          <Route path="/admin" element={<CategoryPage/>}></Route>
          <Route path="/admin/:categoryId" element={<ArticleTable/>}></Route>
          <Route path="/admin/orders" element={<OrdersTable/>}></Route>
        </Routes>
      </BrowserRouter>
     
      <Outlet></Outlet>
    </div>
  );
}

export default App;
