import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  colorData,
  getImageUrl,
  initialColor,
  initialImage,
  initialReviews,
  otherProducts,
  sizeOptions,
  filterOptions,
} from '../data.js';

function Product() {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [currentImageFile, setCurrentImageFile] = useState(initialImage);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCmsActive, setIsCmsActive] = useState(false);
  const [isDescPanelOpen, setIsDescPanelOpen] = useState(false);
  const [isReturnPanelOpen, setIsReturnPanelOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const sliderRef = React.useRef(null);
  const productListRef = React.useRef(null);
  const [offset, setOffset] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [contentWidth, setContentWidth] = React.useState(0);
  const navigate = useNavigate();

  const mainImageUrl = getImageUrl(currentImageFile, selectedColor);

  const handleThumbnailClick = useCallback((imageFile) => {
    setCurrentImageFile(imageFile);
  }, []);

  const handleColorChange = useCallback((colorName) => {
    setSelectedColor(colorName);
    setCurrentImageFile(colorData[colorName].images[0]);
  }, []);

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(prevSize => prevSize === size ? null : size);
  }, []);

  const toggleSizeGuideModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const toggleAccordion = useCallback((panel) => {
    if (panel === 'desc') {
      setIsDescPanelOpen(prev => !prev);
      if (isReturnPanelOpen) setIsReturnPanelOpen(false);
    } else if (panel === 'return') {
      setIsReturnPanelOpen(prev => !prev);
      if (isDescPanelOpen) setIsDescPanelOpen(false);
    }
  }, [isDescPanelOpen, isReturnPanelOpen]);

  const handleLikeReview = useCallback((id) => {
    setReviews(prevReviews => prevReviews.map(review => {
      if (review.id === id) {
        const newLikedStatus = !review.liked;
        const newLikes = newLikedStatus ? review.likes + 1 : review.likes - 1;
        return { ...review, likes: newLikes, liked: newLikedStatus };
      }
      return review;
    }));
  }, []);

  const handleAddToBag = useCallback(() => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    const productToAdd = {
      id: Date.now(),
      name: 'OFFICIAL DC MERCHANDISE',
      sku: '#Men T-Shirt',
      color: selectedColor,
      size: selectedSize,
      price: 449.00,
      quantity: 1,
      image: mainImageUrl,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, productToAdd];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    alert("Product added to your bag!");
    navigate('/cart');

  }, [selectedSize, selectedColor, mainImageUrl, navigate]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleOutsideClick = (e) => {
      if (e.target.closest('.modal-content')) return;
      toggleSizeGuideModal();
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isModalOpen, toggleSizeGuideModal]);

  const preventDefault = (e) => e.preventDefault();

  // Effect to observe size changes for responsive calculations
  React.useLayoutEffect(() => {
    const slider = sliderRef.current;
    const productList = productListRef.current;
    if (!slider || !productList) return;

    const updateDimensions = () => {
      setContainerWidth(slider.clientWidth);
      setContentWidth(productList.scrollWidth);
    };

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(slider);

    updateDimensions(); // Set initial dimensions

    return () => observer.unobserve(slider);
  }, []);

  // --- DERIVED STATE ---
  const isAtStart = offset >= 0;
  const maxOffset = contentWidth > containerWidth ? contentWidth - containerWidth : 0;
  const isAtEnd = offset <= -maxOffset;

  // --- SCROLL HANDLERS ---
  const scroll = (direction) => {
    // Amount to scroll is one card + its gap
    const scrollAmount = 240 + 20;

    if (direction === 'right') {
      const newOffset = offset - scrollAmount;
      setOffset(Math.max(newOffset, -maxOffset));
    } else {
      const newOffset = offset + scrollAmount;
      setOffset(Math.min(newOffset, 0));
    }
  };

  return (
    <div className="product-page-wrapper">
      <main className="pro-page">
        <div className="image-section">
          <div className="thumbnail">
            {colorData[selectedColor].images.map((file) => (
              <img
                key={file}
                src={getImageUrl(file, selectedColor)}
                alt={`Thumbnail for ${selectedColor} ${file}`}
                className={file === currentImageFile ? 'active' : ''}
                onClick={() => handleThumbnailClick(file)}
                onError={(e) => e.target.src = getImageUrl('fallback.webp', selectedColor)}
              />
            ))}
          </div>
          <div className="main-img">
            <img id="mainProductImg" src={mainImageUrl} alt="Main Product Image" />
          </div>
        </div>

        <section id="pro-details">
          <h1>OFFICIAL DC MERCHANDISE T-Shirt</h1>
          <h3>Men T-Shirt</h3>

          <div className="price-rating">
            <div className="price">
              <span className="current">₹449</span>
              <span className="original">₹1449</span>
            </div>
            <div className="star-rate1">
              <button id="goToReviews" onClick={() => document.getElementById('reviews-sect').scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-star">
                  <span className="rate"> 4.3</span>
                </i>
              </button>
            </div>
          </div>

          <p className="fabric"><button>Viscose Rayon</button></p>
          <hr />

          <div className="colors">
            <p>Select Color: <span id="selectedColor">{selectedColor}</span></p>
            <div className="color-choices">
              {Object.keys(colorData).map((color) => (
                <span
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  data-color={color}
                  style={{ color: colorData[color].colorCode }}
                  onClick={() => handleColorChange(color)}
                ></span>
              ))}
            </div>
          </div>
          <hr />

          <div className="sizes">
            <div className="sizes-header">
              <p>Select Size</p>
              <a href="#" id="openSizeGuide" onClick={(e) => { e.preventDefault(); toggleSizeGuideModal(); }}>Size Guide</a>
            </div>
            <div className="sizes-row">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {isModalOpen && (
            <div id="sizeGuideModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleSizeGuideModal}>&times;</span>
                <h2>SIZE GUIDE</h2>
                <div className="size-img">
                  <img src={getImageUrl('size-guide.jpg', 'Size Guide')} alt="Size Guide Illustration" />
                </div>

                <div className="toggle-btns">
                  <button id="btnIn" className={!isCmsActive ? 'active' : ''} onClick={() => setIsCmsActive(false)}>In</button>
                  <button id="btnCms" className={isCmsActive ? 'active' : ''} onClick={() => setIsCmsActive(true)}>Cms</button>
                </div>

                <div className="modal-table-container">
                  {!isCmsActive && (
                    <table id="tableIn" className="size-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest (In Inch)</th>
                          <th>Front Length (In Inch)</th>
                          <th>Sleeve Length (In Inch)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>S</td><td>42.0</td><td>29.0</td><td>9.75</td></tr>
                        <tr><td>M</td><td>44.0</td><td>29.75</td><td>10.0</td></tr>
                        <tr><td>L</td><td>46.0</td><td>30.5</td><td>10.25</td></tr>
                        <tr><td>XL</td><td>48.0</td><td>31.25</td><td>10.5</td></tr>
                        <tr><td>2XL</td><td>50.0</td><td>32.0</td><td>10.75</td></tr>
                        <tr><td>3XL</td><td>52.0</td><td>32.75</td><td>11.0</td></tr>
                        <tr><td>4XL</td><td>54.0</td><td>33.5</td><td>11.25</td></tr>
                        <tr><td>5XL</td><td>56.0</td><td>34.25</td><td>11.5</td></tr>
                        <tr><td>6XL</td><td>58.0</td><td>35.0</td><td>11.75</td></tr>
                      </tbody>
                    </table>
                  )}

                  {isCmsActive && (
                    <table id="tableCms" className="size-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest (In Cms)</th>
                          <th>Front Length (In Cms)</th>
                          <th>Sleeve Length (In Cms)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>S</td><td>106.7</td><td>73.7</td><td>24.8</td></tr>
                        <tr><td>M</td><td>111.8</td><td>75.6</td><td>25.4</td></tr>
                        <tr><td>L</td><td>116.8</td><td>77.5</td><td>26.0</td></tr>
                        <tr><td>XL</td><td>121.9</td><td>79.4</td><td>26.7</td></tr>
                        <tr><td>2XL</td><td>127.0</td><td>81.3</td><td>27.3</td></tr>
                        <tr><td>3XL</td><td>132.1</td><td>83.2</td><td>27.9</td></tr>
                        <tr><td>4XL</td><td>137.2</td><td>85.1</td><td>28.6</td></tr>
                        <tr><td>5XL</td><td>142.2</td><td>87.0</td><td>29.2</td></tr>
                        <tr><td>6XL</td><td>147.3</td><td>88.9</td><td>29.8</td></tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="actions">
            <button className="add-to-bag" onClick={handleAddToBag}>
              ADD TO CART
            </button>
            <button
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(prev => !prev)}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>

          <hr />

          <div className="info">
            <h2>Key Highlights</h2>
            <div className="details">
              <div>
                <p>Design<strong>Graphic Print</strong></p>
                <hr />
                <p>Neck<strong>Round Neck</strong></p>
                <hr />
                <p>Sleeve Style<strong>Half Sleeve</strong></p>
              </div>
              <div>
                <p>Fit<strong>Regular Fit</strong></p>
                <hr />
                <p>Fabric<strong>Cotton</strong></p>
                <hr />
                <p>Wash Care<strong>Machine wash as per tag</strong></p>
              </div>
            </div>
          </div>
          <hr />

          <div className="pre-description">
            <div className="pro-description">
              <button
                className={`pro-description-btn ${isDescPanelOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion('desc')}
              >
                <i className="fas fa-info-circle"></i> Product Description
              </button>
              <div className={`panel ${isDescPanelOpen ? 'show' : ''}`}>
                <p>
                  Elevate your everyday style with the Men T - Shirt, exclusively available on
                  Printify. Crafted from premium Viscose Rayon, this shirt offers a soft, smooth texture with a natural
                  sheen, giving it a refined yet relaxed appeal.
                </p>
                <p>
                  The warm brown tone brings versatility to your wardrobe, making it suitable for both casual
                  outings and smart-casual occasions. Designed in an oversized fit, it ensures breathability and ease of
                  movement while keeping your look effortlessly modern.
                </p>
                <p>
                  Featuring a round neckline and dropped shoulder design, this shirt pairs seamlessly with jeans,
                  chinos, or shorts. Its lightweight and airy nature makes it perfect for day-long wear, whether
                  you're stepping out with friends or keeping it laid-back indoors.
                </p>
                <p>
                  Country of Origin - India<br />
                  Manufactured By - Printify Pvt Ltd, Akola, Maharashtra 444002<br />
                  Packed By - Printify Pvt Ltd, Akola, Maharashtra 444002<br />
                  Commodity - Men's Shirt
                </p>
                <h4>Product Specifications</h4>
                <ul>
                  <li>Oversized fit - relaxed and contemporary styling</li>
                  <li>Fabric - Viscose Rayon for a soft and breathable finish</li>
                  <li>Color - Classic Brown, versatile for multiple occasions</li>
                </ul>
              </div>
            </div>
            <div className="pro-description">
              <button
                className={`pro-description-btn ${isReturnPanelOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion('return')}
              >
                <i className="fas fa-undo-alt"></i> 7 Days Return & Exchange
              </button>
              <div className={`panel ${isReturnPanelOpen ? 'show' : ''}`}>
                <p>
                  This product is eligible for return or exchange within 7 days of delivery, provided it is
                  unworn, unwashed, and in original condition
                  with tags intact.
                </p>
              </div>
            </div>
          </div>
          <section id="icon-box">
            <div className="icon">
              <img src={getImageUrl('guarantee.png', 'Guarantee')} alt="Genuine Product" />
              <p>100% Genuine Product</p>
            </div>
            <div className="icon">
              <img src={getImageUrl('credit-card.png', 'Payment')} alt="Secure Payment" />
              <p>100% Secure Payment</p>
            </div>
            <div className="icon">
              <img src={getImageUrl('product-return.png', 'Return')} alt="Easy Return & Instant Refunds" />
              <p>Easy Return & Instant Refunds</p>
            </div>
          </section>

          <section id="reviews-sect">
            <div className="reviews">
              <button className="reviews-btn">Customer Reviews</button>
            </div>
            <p className="recommend-line"><strong><i className="fas fa-thumbs-up"></i> 86%</strong> of verified buyers
              recommend this product</p>

            <div className="review-container">
              <div className="rating-summary">
                <h2>4.3</h2>
                <div className="star-rate">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <i className="far fa-star"></i>
                </div>
                <p>897 ratings</p>
                <button className="rate-btn">Rate</button>
              </div>

              <div className="rating-bars">
                <div className="rating-bar" data-star="5">
                  <span>5 <i className="fas fa-star"></i></span>
                  <div className="bar"><div className="fill five"></div></div>
                  <span>(574)</span>
                </div>
                <div className="rating-bar" data-star="4">
                  <span>4 <i className="fas fa-star"></i></span>
                  <div className="bar"><div className="fill four"></div></div>
                  <span>(197)</span>
                </div>
                <div className="rating-bar" data-star="3">
                  <span>3 <i className="fas fa-star"></i></span>
                  <div className="bar"><div className="fill three"></div></div>
                  <span>(45)</span>
                </div>
                <div className="rating-bar" data-star="2">
                  <span>2 <i className="fas fa-star"></i></span>
                  <div className="bar"><div className="fill two"></div></div>
                  <span>(18)</span>
                </div>
                <div className="rating-bar" data-star="1">
                  <span>1 <i className="fas fa-star"></i></span>
                  <div className="bar"><div className="fill one"></div></div>
                  <span>(63)</span>
                </div>
              </div>
            </div>
          </section>
          <hr />

          <section id="customer-review">
            <h3>Hear what our customers say</h3>

            <div className="filter-btn">
              {filterOptions.map(option => (
                <button key={option} className="active">{option}</button>
              ))}
            </div>

            {reviews.map(review => (
              <div className="cust-rev" key={review.id}>
                <p>{review.text}</p>
                <div className="meta">
                  <span>{review.author} – {review.date}</span>
                  <span
                    className={`like ${review.liked ? 'liked' : ''}`}
                    data-count={review.likes}
                    onClick={() => handleLikeReview(review.id)}
                  >
                    ({review.likes}) <i className={review.liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
                  </span>
                </div>
              </div>
            ))}

            <section className="view-btn">
              <Link to="/reviews"><button>View All Reviews</button></Link>
            </section>
          </section>

        </section>
      </main>

      <React.Fragment>
        {/* Frequently Bought Together */}
        <section id="collection">
          <h3>Recommended for You</h3>
          <div className="slider-wrapper">
            <button className={`slider-arrow arrow-left ${isAtStart ? 'is-inactive' : ''}`} onClick={() => scroll('left')} aria-label="Scroll Left">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="slider-container" ref={sliderRef}>
              <div
                className="product-list"
                ref={productListRef}
                style={{ transform: `translateX(${offset}px)` }}
              >
                {otherProducts.map(product => (
                  <div className="pro-card" key={product.id}>
                    <img src={product.img} alt={product.name} />
                    <span className="star-badge"><i>★</i> {product.rating}</span>
                    <p className="product-name">{product.name}</p>
                    <p className="price-container"><b>{product.price}</b> <del>{product.original}</del></p>
                    <button>Add To Cart</button>
                  </div>
                ))}
              </div>
            </div>

            <button className={`slider-arrow arrow-right ${isAtEnd ? 'is-inactive' : ''}`} onClick={() => scroll('right')} aria-label="Scroll Right">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </React.Fragment>

    </div>
  );
}

export default Product;
