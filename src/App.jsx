import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CustomerReviewsPage from './components/CustomerReviewsPage.jsx';
import MyCart from './components/MyCart.jsx';
import Wishlist from './components/Wishlist.jsx';

import './style/Product.css';
import './style/Shop.css';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* --- MODIFIED: Shop is now the main page --- */}
                <Route path="/" element={<Shop />} />

                {/* --- MODIFIED: Product page is now at /product --- */}
                <Route path="/product" element={<Product />} />

                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<CustomerReviewsPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<MyCart />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
