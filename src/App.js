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
import AboutPage from './pages/AboutUsPage/AboutPage';
import AdminNav from './pages/AdminPanel/AdminNav/AdminNav';
import Layout from './pages/Layout/Layout';
import BuyInstructionsPage from './pages/Layout/BuyInstructionsPage/BuyInstructionsPage';
import PrivacyPage from './pages/Layout/PrivacyPage/PrivacyPage';
import ContactPage from './pages/Layout/ContactPage/ContactPage';
import MainCategoryTable from './pages/AdminPanel/MainCategoryTable/MainCategoryTable';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/*"  element={<Layout/>} >
            <Route index element={<HomePage/> }></Route>
            <Route path="article/:categoryId/:id" element={<ArticlePage/>} ></Route>
            <Route path="browse/:categoryId/*" element={<BrowsePage />} ></Route>
            <Route path="browse"  element={<BrowsePage />} ></Route>
            <Route path="cart" element={<CartPage/>}></Route>
            <Route path="about" element={<AboutPage/>}></Route>
            <Route path="UputstvoZaKupovinu" element={<BuyInstructionsPage/>}></Route>
            <Route path="privacy" element={<PrivacyPage/>}></Route>
            <Route path="contact" element={<ContactPage/>}></Route>

          </Route> */}

          <Route path="/*" element={<AdminNav/>}>
            <Route index element={<CategoryPage/>}></Route>
            <Route path=":categoryId" element={<ArticleTable/>}></Route>
            <Route path="orders" element={<OrdersTable/>}></Route>
            <Route path="main-categorys" element={<MainCategoryTable/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Outlet></Outlet>
    </div>
  );
}

export default App;
