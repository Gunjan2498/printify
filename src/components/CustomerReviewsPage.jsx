import React, { useState, useCallback, useMemo, useEffect } from 'react';

// Main App component that renders the CustomerReviewsPage
export default function App() {
  return <CustomerReviewsPage />;
}

// Data for the customer review section with 'isUserReview' added
const initialReviewsData = [
  { id: 1, text: "Excellent T-Shirt. The fabric quality is amazing and very comfortable.", author: "Nilesh", date: "6 September 2024", likes: 42, liked: false, isUserReview: false },
  { id: 2, text: "Great fitting and value for money. I would definitely recommend it.", author: "Rahul", date: "15 August 2024", likes: 31, liked: false, isUserReview: false },
  { id: 3, text: "Superb product! Delivery was quick and packaging was neat.", author: "Aniket", date: "12 July 2024", likes: 18, liked: false, isUserReview: false },
  { id: 4, text: "Loved the colors and print quality. Looks even better in real.", author: "Priya", date: "2 July 2024", likes: 25, liked: false, isUserReview: false },
  { id: 5, text: "The size fits perfectly and the stitching is neat.", author: "Arjun", date: "20 June 2024", likes: 12, liked: false, isUserReview: false }
];

const filterOptions = ["Most Helpful", "Most Recent", "Product Quality", "Material", "Fit", "Value For Money"];

// Customer Reviews Page Component
function CustomerReviewsPage() {
  // --- STATE MANAGEMENT ---
  // Initialize state from localStorage or fall back to initial data
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('customerReviews');
      if (savedReviews) {
        return JSON.parse(savedReviews);
      }
      return initialReviewsData;
    } catch (error) {
      console.error("Error reading reviews from localStorage", error);
      return initialReviewsData;
    }
  });

  // Changed default filter to "Most Recent" to sort by date initially
  const [activeFilter, setActiveFilter] = useState("Most Recent");
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  // New state to track the highlighted review
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // --- PERSISTENCE EFFECT ---
  // Save reviews to localStorage whenever the 'reviews' state changes
  useEffect(() => {
    try {
      localStorage.setItem('customerReviews', JSON.stringify(reviews));
    } catch (error) {
      console.error("Error saving reviews to localStorage", error);
    }
  }, [reviews]);


  // --- FUNCTIONS ---
  const handleLikeReview = useCallback((reviewId) => {
    setReviews(prevReviews => prevReviews.map(review =>
      review.id === reviewId
        ? { ...review, liked: !review.liked, likes: review.liked ? review.likes - 1 : review.likes + 1 }
        : review
    ));
  }, []);

  const openReviewModal = useCallback((review = null) => {
    if (review) {
      setEditingReview(review);
      setReviewText(review.text);
    } else {
      setEditingReview(null);
      setReviewText('');
    }
    setReviewModalOpen(true);
  }, []);

  const closeReviewModal = useCallback(() => {
    setReviewModalOpen(false);
    setReviewText('');
    setEditingReview(null);
  }, []);

  const handleReviewSubmit = useCallback((e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    if (editingReview) {
      setReviews(prevReviews => prevReviews.map(review =>
        review.id === editingReview.id ? { ...review, text: reviewText } : review
      ));
    } else {
      const newReview = {
        id: Date.now(),
        text: reviewText,
        author: "You",
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        likes: 0,
        liked: false,
        isUserReview: true,
      };
      setReviews(prevReviews => [newReview, ...prevReviews]);
      // Set the filter to 'Most Recent' to ensure the new review always appears first.
      setActiveFilter("Most Recent");
    }
    closeReviewModal();
  }, [reviewText, editingReview, closeReviewModal]);

  const handleDeleteReview = useCallback((reviewId) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  }, []);

  // New handler to set the highlighted review
  const handleSelectReview = (reviewId) => {
    // If the same review is clicked again, deselect it. Otherwise, select the new one.
    setSelectedReviewId(prevId => prevId === reviewId ? null : reviewId);
  };

  // --- DERIVED STATE FOR FILTERING ---
  const filteredReviews = useMemo(() => {
    const reviewsCopy = [...reviews];
    switch (activeFilter) {
      case 'Most Helpful':
        return reviewsCopy.sort((a, b) => b.likes - a.likes);
      case 'Most Recent':
        return reviewsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return reviews;
    }
  }, [reviews, activeFilter]);

  return (
    <>
      <style>{`
                  
/* --- Existing Styles --- */               
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
 @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }

 body {
   font-family: 'Poppins', Arial, sans-serif;
   background: #fdfdfd;
   color: #222;
   line-height: 1.6;
 }

 #customer-review {
   max-width: 800px;
   padding: 2rem 1rem;
   margin: 2rem auto;
 }

 #customer-review h3 {
   margin: 0.2rem 0 1.5rem 0;
   color: #0a0907;
   font-size: 1.5rem;
   font-weight: 600;
   text-align: center;
 }

 .filter-btn {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin-bottom: 2rem;
   gap: 10px;
 }

 .filter-btn button {
   padding: 8px 16px;
   border: 1px solid #ccc;
   border-radius: 6px;
   background: #fff;
   cursor: pointer;
   transition: all 0.3s ease;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 }

 .filter-btn button:hover {
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
   border-color: #2C3E50;
 }

 .filter-btn button.active {
   background-color: #f0f2f5;
   border-color: #2C3E50;
   font-weight: 500;
 }

 .cust-rev {
   background: #fff;
   padding: 1.25rem;
   border: 1px solid #e0e0e0;
   border-radius: 10px;
   margin-bottom: 1rem;
   transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
   position: relative;
   cursor: pointer;
 }

 .cust-rev:hover {
   border-color: #2C3E50;
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
 }

 .cust-rev p {
   margin: 0.3rem 0;
   color: #333;
   padding-right: 60px;
 }

 .meta {
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 0.9rem;
   margin-top: 1rem;
   color: #555;
 }

 .like {
   cursor: pointer;
   color: #333;
   transition: color 0.2s ease, transform 0.2s ease;
   display: flex;
   align-items: center;
   gap: 5px;
   z-index: 2;
   position: relative;
 }

 .like.liked {
   color: #1876c8;
 }

 /* --- NEW: Style for highlighted review --- */
 .cust-rev.highlighted {
   border-color: #2962ff;
   box-shadow: 0 6px 20px rgba(41, 98, 255, 0.2);
   transform: translateY(-2px);
 }

 .write-review-section {
   background: #fff;
   padding: 1rem;
   border: 1px solid #e0e0e0;
   border-radius: 10px;
   margin-top: 2rem;
   cursor: pointer;
   transition: border-color 0.3s ease;
 }

 .write-review-section:hover {
   border-color: #2C3E50;
 }

 .write-review-section p {
   color: #555;
   margin: 0;
 }

 .review-modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.6);
   z-index: 1000;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 1rem;
 }

 .review-modal-content {
   background: #fff;
   padding: 2rem;
   border-radius: 10px;
   width: 100%;
   max-width: 550px;
   position: relative;
   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
 }

 .review-modal-content h4 {
   margin: 0 0 1rem 0;
   font-size: 1.25rem;
   color: #2C3E50;
 }

 .review-modal-close {
   position: absolute;
   top: 15px;
   right: 20px;
   font-size: 1.8rem;
   color: #888;
   cursor: pointer;
   font-weight: bold;
   line-height: 1;
 }

 .review-modal-close:hover {
   color: #333;
 }

 .review-modal-content textarea {
   width: 100%;
   min-height: 120px;
   padding: 10px;
   border: 1px solid #ccc;
   border-radius: 8px;
   font-family: inherit;
   font-size: 1rem;
   resize: vertical;
   margin-bottom: 1rem;
 }

 .review-modal-content textarea:focus {
   outline: none;
   border-color: #2C3E50;
 }

 .review-modal-actions {
   text-align: right;
 }

 .review-modal-actions button {
   background: #2C3E50;
   color: #fff;
   border: none;
   padding: 10px 24px;
   font-size: 1rem;
   font-weight: 600;
   border-radius: 6px;
   cursor: pointer;
   transition: background-color 0.3s ease;
 }

 .review-modal-actions button:disabled {
   background: #ccc;
   cursor: not-allowed;
 }

 .review-modal-actions button:hover:not(:disabled) {
   background: #1a2531;
 }

 .review-actions {
   position: absolute;
   top: 1rem;
   right: 1rem;
   display: flex;
   gap: 10px;
   z-index: 2;
 }

 .review-actions button {
   background: transparent;
   border: none;
   cursor: pointer;
   color: #555;
   font-size: 1rem;
   padding: 5px;
   transition: color 0.2s ease;
 }

 .review-actions button:hover {
   color: #2C3E50;
 }
               `}</style>

      <section id="customer-review">
        <h3>Hear what our customers say</h3>
        <div className="filter-btn">
          {filterOptions.map(option => (
            <button key={option} className={activeFilter === option ? "active" : ""} onClick={() => setActiveFilter(option)}>
              {option}
            </button>
          ))}
        </div>

        {filteredReviews.map(review => (
          <div
            className={`cust-rev ${selectedReviewId === review.id ? 'highlighted' : ''}`}
            key={review.id}
            onClick={() => handleSelectReview(review.id)}
          >
            <p>{review.text}</p>

            {review.isUserReview && (
              <div className="review-actions" onClick={e => e.stopPropagation()}>
                <button onClick={() => openReviewModal(review)} aria-label="Edit review"><i className="fas fa-pencil-alt"></i></button>
                <button onClick={() => handleDeleteReview(review.id)} aria-label="Delete review"><i className="fas fa-trash-alt"></i></button>
              </div>
            )}

            <div className="meta">
              <span>{review.author} – {review.date}</span>
              <span
                className={`like ${review.liked ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the card from being selected when liking
                  handleLikeReview(review.id);
                }}
              >
                ({review.likes}) <i className={review.liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
              </span>
            </div>
          </div>
        ))}

        <div className="write-review-section" onClick={() => openReviewModal()}>
          <p>Write a review...</p>
        </div>
      </section>

      {isReviewModalOpen && (
        <div className="review-modal-overlay" onClick={closeReviewModal}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="review-modal-close" onClick={closeReviewModal}>&times;</span>
            <h4>{editingReview ? 'Edit Your Review' : 'Create a Review'}</h4>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you think of the product?"
                autoFocus
              />
              <div className="review-modal-actions">
                <button type="submit" disabled={!reviewText.trim()}>
                  {editingReview ? 'Save Changes' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

