import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './style/Shop.css';
import FilterSort from './FilterSort.jsx';
import img1 from './1.webp';



const heroImages = [
    'https://images.bewakoof.com/uploads/grid/app/newwinter-desktop-menn-1758878437.jpg',
    'https://cdn.shopify.com/s/files/1/1982/7331/files/Artboard_1_copy_a7277561-4d03-44e6-a20e-3e438ce678bf.png?v=1737783671'
];

const sections = [
    {
        id: 'everyday',
        title: 'Everyday Fits',
        desc: 'Comfortable, casual pieces you can wear every day.',
        products: [
            { id: 'e1', name: 'OFFICIAL DC MERCHANDISE T-Shirt', price: 499, category: 'Everyday Fits', neck: 'Round-Neck', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['M', 'L'], img: img1 },
            { id: 'e2', name: 'Men cotton pyjamas', price: 299, category: 'Everyday Fits', neck: 'Round-Neck', sleeves: 'Full', fit: 'Relaxed Fit', fabric: 'Cotton', sizes: ['S', 'M'], img: 'https://images.bewakoof.com/t640/men-s-grey-pyjamas-581594-1747894023-1.jpg' },
            { id: 'e3', name: 'Oversized T-Shirt', price: 899, category: 'Everyday Fits', neck: 'V-Neck', sleeves: 'Half', fit: 'Over-Sized', fabric: 'Cotton', sizes: ['L', 'XL'], img: 'https://images.bewakoof.com/t640/men-s-bold-red-never-stop-graphic-printed-oversized-t-shirt-689696-1758524686-1.jpg' },
        ]
    },
    {
        id: 'gym',
        title: 'Gym & Sports Wear',
        desc: 'Performance fabrics to help you push harder.',
        products: [
            { id: 'g1', name: 'Training Jacket', price: 699, category: 'Gym and Sports Wear', neck: 'Stand Collar', sleeves: 'Full', fit: 'Regular Fit', fabric: 'PP', sizes: ['M', 'L'], img: 'https://images.bewakoof.com/t640/men-s-grey-black-colorblock-windcheater-jacket-367108-1738934367-1.jpg' },
            { id: 'g2', name: 'Women Gym Wear', price: 799, category: 'Gym and Sports Wear', neck: 'Round-Neck', sleeves: 'Half', fit: 'Regular Fit', fabric: 'Dry Fit Softie', sizes: ['S', 'M'], img: 'https://i.pinimg.com/736x/03/4b/73/034b734e73397bf79bafa1ca12921b6e.jpg' },
            { id: 'g3', name: 'Half Sleeve Compression T-shirt', price: 1499, category: 'Gym and Sports Wear', neck: 'Round-Neck', sleeves: 'Half', fit: 'Regular Fit', fabric: 'Dot Net', sizes: ['M', 'L'], img: 'https://cdn.shopify.com/s/files/1/0156/6146/products/GEO_LIGHTWEIGHT_SS_T-SHIRT_-_BLACK_A-EditEdit_DW_1024x1024.jpg?v=1568624357' },
        ]
    },
    {
        id: 'hoodies',
        title: 'Hoodies',
        desc: 'Cozy, oversized and fitted hoodies for every mood.',
        products: [
            { id: 'h1', name: 'Black Hoodie', price: 1599, category: 'Hoodies', neck: 'Round-Neck', sleeves: 'Full', fit: 'Over-Sized', fabric: 'Cotton', sizes: ['M', 'L'], img: 'https://images.bewakoof.com/t640/men-s-black-oversized-hoodies-682748-1757603715-1.jpg' },
            { id: 'h2', name: 'Men Graphic Hoodie', price: 1399, category: 'Hoodies', neck: 'Round-Neck', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['S', 'M'], img: 'https://images.bewakoof.com/t640/men-s-blue-shikamaru-graphic-printed-hoodies-624898-1732791898-1.jpg' },
            { id: 'h3', name: 'Cropped Hoodie', price: 1299, category: 'Hoodies', neck: 'Round-Neck', sleeves: 'Full', fit: 'Over-Sized', fabric: 'Cotton', sizes: ['L', 'XL'], img: 'https://images.bewakoof.com/t640/men-s-black-graphic-printed-oversized-hoodies-682743-1756903747-1.jpg' },
        ]
    },
    {
        id: 'formal',
        title: 'Formal Wear',
        desc: 'Tailored pieces for work and events.',
        products: [
            { id: 'f1', name: 'Stylish Blazer for Women', price: 3499, category: 'Formal Wear', neck: 'Collar', sleeves: 'Full', fit: 'Regular Fit', fabric: '2 Way', sizes: ['M', 'L'], img: 'https://m.media-amazon.com/images/I/61xuf2jhbmL._SX679_.jpg' },
            { id: 'f2', name: 'Men Slim Fit Premium Pant', price: 1199, category: 'Formal Wear', neck: 'Stand Collar', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['M', 'L'], img: 'https://handcmediastorage.blob.core.windows.net/productimages/TR/TRPRAS98-A01-168800-1400px-1820px.jpg' },
            { id: 'f3', name: 'Formal Wear for Men', price: 1599, category: 'Formal Wear', neck: 'Collar', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['M', 'L'], img: 'http://4.bp.blogspot.com/-EW8SIsf29MM/UYHrY37pAVI/AAAAAAAAAdw/6X-rrBv8go8/s1600/Formal-Wear-For-Men.jpg' },
        ]
    },
    {
        id: 'festive',
        title: 'Festive Wear',
        desc: 'Bright, crafted pieces to celebrate in style.',
        products: [
            { id: 'fs1', name: 'Off White Festive Kurta', price: 2499, category: 'Festive Collection', neck: 'Collar', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['M', 'L'], img: 'https://manyavar.scene7.com/is/image/manyavar/I03_3O9A0619_17-01-2016-22-03?wid=1244' },
            { id: 'fs2', name: 'Women Sharara Set', price: 1799, category: 'Festive Collection', neck: 'Round-Neck', sleeves: 'Full', fit: 'Regular Fit', fabric: 'Cotton', sizes: ['S', 'M'], img: 'https://cdn0.weddingwire.in/article/7056/original/1280/jpg/86507-haldi-dress-aza-fashion-gharara.jpeg' },
            { id: 'fs3', name: 'Festive Jacket', price: 2999, category: 'Festive Collection', neck: 'Collar', sleeves: 'Full', fit: 'Over-Sized', fabric: 'Cotton', sizes: ['L', 'XL'], img: 'https://m.media-amazon.com/images/I/61DgoRRGbxL._SY879_.jpg' },
        ]
    }
];

const trending = [
    { id: 't1', name: 'Men Sea Blue Tee', price: 599, img: 'https://images.bewakoof.com/t640/men-s-sea-blue-weird-club-graphic-printed-t-shirt-648367-1745576089-1.jpg' },
    { id: 't2', name: 'Formal Blazer', price: 2199, img: 'https://anninc.scene7.com/is/image/LO/756776_2222_B1?$315x363$' },
    { id: 't3', name: 'Cuffed Joggers', price: 999, img: 'https://images.bewakoof.com/t640/women-s-black-slim-fit-joggers-321346-1736445080-1.jpg' },
    { id: 't4', name: 'Women Oversized t-shirt', price: 2499, img: 'https://images.bewakoof.com/t640/women-s-off-white-all-force-graphic-printed-oversized-t-shirt-677418-1746016819-1.jpg' },
    { id: 't5', name: 'Men Black kurta', price: 899, img: 'https://i.pinimg.com/originals/02/84/c7/0284c7b61010c95f91f65f44a907e97f.jpg' },
    { id: 't6', name: 'Oversized Hoodie', price: 499, img: 'https://images.bewakoof.com/t640/women-s-beige-follow-the-stars-graphic-print-oversized-hoodies-654837-1756207043-1.jpg' }
];

// --- Child Component for Product Card ---
class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: false
        };
    }

    toggleWish = () => {
        this.setState(prevState => ({
            wish: !prevState.wish
        }));
    };

    render() {
        const { product } = this.props;
        const { wish } = this.state;

        return (
            <div className="card">
                <div className="card-image">
                    <img src={product.img} alt={product.name} loading="lazy" />
                </div>
                <div className="card-body">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-price">₹ {product.price}</p>
                    <div className="card-actions">
                        <Link to="/product">
                            <button className="btn-add">Add to cart</button>
                        </Link>
                        <button className="btn-wish" aria-pressed={wish} onClick={this.toggleWish} title="Add to wishlist">
                            {wish ? '❤' : '🤍'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


// --- Main App Component ---
export default class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroIndex: 0,
            trendingIndex: 0,
            filteredSections: sections,
        };
        this.heroTimer = null;
    }

    componentDidMount() {
        this.heroTimer = setInterval(() => {
            this.setState(prevState => ({
                heroIndex: (prevState.heroIndex + 1) % heroImages.length
            }));
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.heroTimer);
    }

    nextTrending = () => {
        this.setState(prevState => ({
            trendingIndex: (prevState.trendingIndex + 1) % (trending.length - 3)
        }));
    };

    prevTrending = () => {
        this.setState(prevState => ({
            trendingIndex: (prevState.trendingIndex - 1 + (trending.length - 3)) % (trending.length - 3)
        }));
    };

    handleFilter = (selected) => {
        const newSections = sections.map(sec => {
            let filteredProducts = sec.products;

            if (selected.category && selected.category !== "All") {
                filteredProducts = filteredProducts.filter(p => p.category === selected.category);
            }
            if (selected.price) {
                filteredProducts = filteredProducts.filter(p => {
                    switch (selected.price) {
                        case "Under ₹1000": return p.price < 1000;
                        case "₹1000–2999": return p.price >= 1000 && p.price <= 2999;
                        case "₹3000–4999": return p.price >= 3000 && p.price <= 4999;
                        case "₹5000+": return p.price >= 5000;
                        default: return true;
                    }
                });
            }
            if (selected.neck.length) {
                filteredProducts = filteredProducts.filter(p => p.neck && selected.neck.includes(p.neck));
            }
            if (selected.sleeves.length) {
                filteredProducts = filteredProducts.filter(p => p.sleeves && selected.sleeves.includes(p.sleeves));
            }
            if (selected.fit.length) {
                filteredProducts = filteredProducts.filter(p => p.fit && selected.fit.includes(p.fit));
            }
            if (selected.fabric.length) {
                filteredProducts = filteredProducts.filter(p => p.fabric && selected.fabric.includes(p.fabric));
            }
            if (selected.sizes.length) {
                filteredProducts = filteredProducts.filter(p => Array.isArray(p.sizes) && p.sizes.some(sz => selected.sizes.includes(sz)));
            }

            return { ...sec, products: filteredProducts };
        });

        this.setState({ filteredSections: newSections });
    };

    handleSort = (sortType) => {
        const sortedSections = this.state.filteredSections.map(sec => {
            const sortedProducts = [...sec.products];
            if (sortType === "low") sortedProducts.sort((a, b) => a.price - b.price);
            if (sortType === "high") sortedProducts.sort((a, b) => b.price - a.price);
            if (sortType === "newest") sortedProducts.reverse();
            return { ...sec, products: sortedProducts };
        });
        this.setState({ filteredSections: sortedSections });
    };

    render() {
        const { heroIndex, filteredSections, trendingIndex } = this.state;

        return (
            <div className="shop-page">
                <header className="hero">
                    <div className="hero-slider">
                        {heroImages.map((src, idx) => (
                            <img key={idx} src={src} alt={`hero-${idx}`} className={idx === heroIndex ? 'active' : ''} />
                        ))}
                    </div>
                </header>

                <FilterSort onFilter={this.handleFilter} onSort={this.handleSort} />

                <main className="content">
                    {filteredSections.map(sec => (
                        <React.Fragment key={sec.id}>
                            <section className="section">
                                <div className="section-head">
                                    <h2>{sec.title}</h2>
                                    <p className="muted">{sec.desc}</p>
                                </div>
                                <div className="grid">
                                    {sec.products.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            </section>

                            {sec.id === "gym" && (
                                <section className="section trending-section">
                                    <div className="section-head"><h2>🔥 Trending Now</h2></div>
                                    <div className="trending-slider">
                                        <button className="slider-btn left" onClick={this.prevTrending}>‹</button>
                                        <div className="trending-wrapper">
                                            {trending.slice(trendingIndex, trendingIndex + 4).map(item => (
                                                <div key={item.id} className="trending-card">
                                                    <img src={item.img} alt={item.name} />
                                                    <h4>{item.name}</h4>
                                                    <p>₹ {item.price}</p>
                                                    <button className="btn-shop">QUICK SHOP</button>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="slider-btn right" onClick={this.nextTrending}>›</button>
                                    </div>
                                </section>
                            )}
                        </React.Fragment>
                    ))}
                </main>
            </div>
        );
    }
}