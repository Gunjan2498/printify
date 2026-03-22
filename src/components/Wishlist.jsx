import React, { createContext, useContext, useState, useEffect } from 'react';

// --- 1. CONTEXT SETUP ---
const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

// --- 2. CONTEXT PROVIDER ---
const WishlistProvider = ({ children }) => {
  const initialProducts = [
    {
      id: 'g1',
      name: 'Training Jacket',
      price: 699,
      image: 'https://images.bewakoof.com/t640/men-s-grey-black-colorblock-windcheater-jacket-367108-1738934367-1.jpg',
      available: true,
      size: 'L'
    },
    {
      id: 'h1',
      name: 'Black Hoodie',
      price: 1599,
      image: 'https://images.bewakoof.com/t640/men-s-black-oversized-hoodies-682748-1757603715-1.jpg',
      available: true,
      size: 'XL'
    },
    {
      id: 'fs2',
      name: 'Women Sharara Set',
      price: 1799,
      image: 'https://cdn0.weddingwire.in/article/7056/original/1280/jpg/86507-haldi-dress-aza-fashion-gharara.jpeg',
      available: true,
      size: 'M'
    }
  ];

  const [wishlist, setWishlist] = useState(() => {
    try {
      const storedWishlist = JSON.parse(localStorage.getItem('printifyWishlist'));
      if (!storedWishlist || storedWishlist.length === 0) return initialProducts;
      return storedWishlist;
    } catch (error) {
      console.error("Error loading wishlist from local storage:", error);
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('printifyWishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to local storage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const moveToCart = (product) => {
    console.log(`Moving ${product.name} to Cart...`);
    removeFromWishlist(product.id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, moveToCart }}>
      {children}
    </WishlistContext.Provider>
  );
};

// --- 3. WISHLIST PAGE COMPONENT ---
const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container empty">
        <h2 className="page-title">My Wishlist</h2>
        <div className="empty-state">
          <span style={{ fontSize: '4rem', marginBottom: '20px' }}>🛍️</span>
          <p className="empty-message">Your wishlist is empty ❤️</p>
          <p className="empty-message-sub">Save items you love and want to buy later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="page-title">My Wishlist ({wishlist.length} Items)</h2>
      <div className="wishlist-list">
        {wishlist.map(item => (
          <div key={item.id} className="wishlist-item-card-professional">
            <div className="item-image-area">
              <img src={item.image} alt={item.name} className="item-image-pro" />
              <button
                className="action-btn remove-btn-mobile"
                aria-label={`Remove ${item.name} from wishlist`}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>

            <div className="item-details-pro">
              <h3 className="item-name-pro">{item.name}</h3>
              {item.size && <p className="item-size-info-pro">Size: {item.size || 'N/A'}</p>}

              <p className={`item-status ${item.available ? 'in-stock' : 'out-of-stock'}`}>
                {item.available ? 'In Stock' : 'Out of Stock'}
              </p>

              <button
                className="action-btn remove-btn-desktop"
                aria-label={`Remove ${item.name} from wishlist`}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>

            <div className="item-pricing-actions">
              {item.price !== undefined && (
                <p className="item-price-tag-pro">₹{item.price.toFixed(2)}</p>
              )}

              <button
                className={`action-btn move-to-cart-pro ${!item.available ? 'disabled' : ''}`}
                disabled={!item.available}
              >
                {item.available ? 'Move to Cart' : 'Currently Unavailable'}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. MAIN EXPORTABLE COMPONENT ---
const Wishlist = () => {
  return (
    <WishlistProvider>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        body, #root {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background-color: #f8f9fa;
          color: #2C3E50;
          font-family: 'Poppins', Arial, sans-serif;
        }

        .app-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        /* --- Wishlist Page Professional Styling --- */
        .wishlist-container {
          padding: 20px 0;
          min-height: 500px;
        }

        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #2C3E50;
          text-align: center;
        }

        .wishlist-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .wishlist-item-card-professional {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #EAECEE;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .item-image-area {
          flex-shrink: 0;
          margin-right: 20px;
          position: relative;
        }

        .item-image-pro {
          width: 100px;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
        }

        .item-details-pro {
          flex-grow: 1;
          padding-right: 20px;
          min-width: 0;
        }

        .item-name-pro {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #2C3E50;
          line-height: 1.3;
        }

        .item-size-info-pro {
          font-size: 0.9rem;
          color: #7F8C8D;
          margin-bottom: 5px;
        }

        .item-status {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 15px;
        }
        .in-stock {
          color: #27AE60;
          background-color: #E8F8F5;
        }
        .out-of-stock {
          color: #E74C3C;
          background-color: #FADBD8;
        }

        .item-pricing-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          width: 180px;
          flex-shrink: 0;
          text-align: right;
        }

        .item-price-tag-pro {
          font-size: 1.4rem;
          font-weight: 700;
          color: #34495e;
          margin: 0 0 10px 0;
        }

        .action-btn {
          padding: 10px 15px;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          font-size: 0.9rem;
          width: 100%;
        }

        .move-to-cart-pro {
          background-color: #2C3E50;
          color: white;
        }

        .move-to-cart-pro:hover {
          background-color: #34495E;
        }

        .move-to-cart-pro.disabled {
          background-color: #BDC3C7;
          cursor: not-allowed;
        }

        .remove-btn-desktop {
          background: none;
          color: #7F8C8D;
          border: 1px solid #BDC3C7;
          width: auto;
          align-self: flex-start;
          margin-top: 10px;
        }

        .remove-btn-desktop:hover {
          color: #E74C3C;
          border-color: #E74C3C;
          background-color: #FADBD8;
        }

        .remove-btn-mobile {
          display: none;
        }

        .wishlist-container.empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 20px;
        }
        .empty-state {
          padding: 40px;
          border: 2px dashed #BDC3C7;
          border-radius: 12px;
          background-color: #F9F9F9;
          margin-top: 20px;
          max-width: 400px;
          width: 100%;
        }
        .empty-message {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .empty-message-sub {
          font-size: 1rem;
          color: #7F8C8D;
        }

        @media (max-width: 768px) {
          .wishlist-item-card-professional {
            flex-wrap: wrap;
            align-items: flex-start;
            padding: 15px;
          }

          .item-image-area {
            margin-right: 15px;
            margin-bottom: 10px;
          }

          .item-details-pro {
            padding-right: 0;
            flex-basis: calc(100% - 115px);
          }

          .item-pricing-actions {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #EAECEE;
            padding-top: 15px;
            margin-top: 10px;
          }

          .item-price-tag-pro {
            margin: 0;
          }

          .action-btn {
            flex-grow: 1;
            max-width: 160px;
          }

          .remove-btn-desktop {
            display: none;
          }

          .item-status {
            margin-bottom: 0;
          }

          .remove-btn-mobile {
            display: block;
            background-color: #FADBD8;
            color: #E74C3C;
            border: none;
            width: 100%;
            padding: 5px 10px;
            font-size: 0.8rem;
            margin-top: 5px;
            border-radius: 4px;
          }
        }
      `}</style>

      <div className="app-container">
        <WishlistPage />
      </div>
    </WishlistProvider>
  );
};

export default Wishlist;
