// --- data.js ---
import img1 from './assets/1.webp';
import img2 from './assets/2.webp';
import img3 from './assets/3.webp';
import img4 from './assets/4.webp';
import img5 from './assets/5.webp';
import img6 from './assets/6.webp';
import img7 from './assets/7.webp';
import img8 from './assets/8.webp';
import img9 from './assets/9.webp';
import img10 from './assets/10.webp';
import img11 from './assets/11.webp';
import img12 from './assets/12.webp';
import img13 from './assets/13.webp';
import img14 from './assets/14.webp';
import img15 from './assets/15.webp';
import img16 from './assets/16.webp';
import img17 from './assets/17.webp';
import img18 from './assets/18.webp';
import img19 from './assets/19.webp';
import img20 from './assets/20.webp';
import img21 from './assets/21.webp';
import img22 from './assets/22.webp';
import img23 from './assets/23.webp';
import img24 from './assets/24.webp';
import img25 from './assets/25.webp';

// Icons
import guaranteeIcon from './assets/guarantee.png';
import creditCardIcon from './assets/credit-card.png';
import productReturnIcon from './assets/product-return.png';
import sizeGuideImg from './assets/size-guide.jpg';

// Color data with local images
export const colorData = {
    Brown: { colorCode: '#543A14', images: [img1, img2, img3, img4, img5] },
    Black: { colorCode: 'black', images: [img6, img7, img8, img9, img10] },
    White: { colorCode: 'white', images: [img11, img12, img13, img14, img15] },
    Pomegranate: { colorCode: '#4c140e', images: [img16, img17, img18, img19, img20] },
    'Chambray Blue': { colorCode: '#a8ddf8', images: [img21, img22, img23, img24, img25] },
};

// Get image URL
export const getImageUrl = (filename) => {
    if (filename === 'guarantee.png') return guaranteeIcon;
    if (filename === 'credit-card.png') return creditCardIcon;
    if (filename === 'product-return.png') return productReturnIcon;
    if (filename === 'size-guide.jpg') return sizeGuideImg;

    // Product images are already imported, just return the variable
    return filename;
};

// Initial selected color/image
export const initialColor = 'Brown';
export const initialImage = colorData[initialColor].images[0];

// Customer reviews
export const initialReviews = [
    { id: 1, text: "Excellent T-Shirt. The fabric quality is amazing and very comfortable.", author: "Nilesh", date: "6 September 2024", likes: 42, liked: false },
    { id: 2, text: "Great fitting and value for money. I would definitely recommend it.", author: "Rahul", date: "15 August 2024", likes: 31, liked: false },
    { id: 3, text: "Superb product! Delivery was quick and packaging was neat.", author: "Aniket", date: "12 July 2024", likes: 18, liked: false },
];

// Other products
export const otherProducts = [
    { id: 1, name: "Men's Casual T-Shirt", img: img1, rating: 4.8, price: "₹1,499", original: "₹1,999" },
    { id: 2, name: "Slim Fit Polo Shirt", img: img6, rating: 4.9, price: "₹850", original: "₹1,200" },
    { id: 3, name: "Formal Dress Shirt", img: img11, rating: 4.7, price: "₹2,250", original: "₹2,800" },
    { id: 4, name: "Oversized Henley Shirt", img: img16, rating: 4.6, price: "₹1,299", original: "₹1,750" },
    { id: 5, name: "Short Sleeve Crew Neck", img: img21, rating: 4.9, price: "₹799", original: "₹999" },
    { id: 6, name: "Long Sleeve Sweatshirt", img: img16, rating: 4.8, price: "₹3,499", original: "₹4,200" },
    { id: 7, name: "Cotton Hoodie", img: img8, rating: 4.7, price: "₹999", original: "₹1,400" },
    { id: 8, name: "Classic Rugby Shirt", img: img25, rating: 4.9, price: "₹550", original: "₹700" }
];

// Sizes & filter options
export const sizeOptions = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'];
export const filterOptions = ['Most Helpful', 'Most Recent', 'Product Quality', 'Material', 'Fit', 'Value For Money'];
