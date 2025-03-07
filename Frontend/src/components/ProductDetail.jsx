import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // For rating stars
import axios from "axios";

function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productDetail } = location.state || {}; // Extract ProductDetail from the state

  if (!productDetail) {
    return <div>Product not found</div>;
  }

  const { productId, productName, perClickPrice, perBuyPrice, description, rating, ratingCount, reviews, image } = productDetail;

  // Fetch logged-in username from sessionStorage
  const username = sessionStorage.getItem("username");

  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Check if the user has already reviewed the product
  useEffect(() => {
    if (reviews) {
      const existingReview = reviews.find((review) => review.username === username);
      if (existingReview) {
        setUserRating(existingReview.rating);
        setUserReview(existingReview.reviewText);
        setHasReviewed(true);
        setShowReviewForm(false); // Hide form if already reviewed
      } else {
        setShowReviewForm(true); // Show review form if not reviewed
      }
    }
  }, [reviews, username]);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      productId,
      username: sessionStorage.getItem("username"), // Get username from sessionStorage
      rating: userRating,
      reviewText: userReview,
    };

    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/Authenticate");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API}/review/submit`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
        }
      })
      .then((response) => {
        console.log('Review submitted successfully:', response.data);
        setUserRating(0);
        setUserReview('');
        setHasReviewed(true);  // Mark the review as submitted
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gradient-to-tr dark:from-cyan-900 dark:via-gray-900 dark:to-black container mx-auto py-8 px-4 lg:px-8 transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Section and Product Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
          {/* Product Image Section */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={image}
              alt={productName}
              className="w-auto h-auto object-cover rounded-lg shadow-lg dark:shadow-cyan-800"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Details Section (without reviews) */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-cyan-100 mb-4">{productName}</h2>
            <p className="text-xl text-gray-600 dark:text-cyan-300 mb-4">Price per click: ${perClickPrice}</p>
            <p className="text-xl text-gray-600 dark:text-cyan-300 mb-4">Price per buy: ${perBuyPrice}</p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {renderStars(rating)}
              <span className="ml-2 text-gray-600 dark:text-cyan-300">({ratingCount})</span>
            </div>

            {/* Product Description */}
            <h3 className="text-2xl font-medium text-gray-800 dark:text-cyan-100 mb-2">Description</h3>
            <p className="text-gray-600 dark:text-cyan-300 mb-4">{description}</p>

            {/* Tags */}
            {productDetail.tags && (
              <div className="mb-4">
                <h3 className="text-xl font-medium text-gray-800 dark:text-cyan-100">Tags</h3>
                <ul className="flex flex-wrap gap-2">
                  {productDetail.tags.split(',').map((tag, idx) => (
                    <li
                      key={idx}
                      className="bg-blue-100 dark:bg-cyan-700 text-blue-600 dark:text-cyan-100 rounded-full px-4 py-1 text-sm"
                    >
                      {tag.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <br/>
      <hr/>

      {/* Review Form Section and Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Review Form Section */}
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <h4 className="text-xl font-medium text-gray-800 dark:text-cyan-100">
              {hasReviewed ? "Update Rating" : "Rate the Product"}
            </h4>
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-cyan-100">Rate the Product</h4>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`w-6 h-6 cursor-pointer ${star <= userRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-cyan-100">Your Review</h4>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-cyan-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 font-semibold rounded-lg focus:outline-none focus:ring-2 bg-green-500 dark:bg-green-700 text-white hover:bg-green-600 dark:hover:bg-green-800 focus:ring-green-500 dark:focus:ring-green-600"
              >
                Submit Review
              </button>
            </form>

            {hasReviewed && (
              <p className="mt-4 text-gray-600 dark:text-cyan-300">
                You have already rated this product. Thank you for your feedback!
              </p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="flex flex-col space-y-4">
          {reviews && reviews.length > 0 && (
            <div className="mb-6 overflow-y-auto" style={{ maxHeight: "350px" }}>
              <h3 className="text-xl font-medium text-gray-800 dark:text-cyan-100">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.reviewId} className="border-b py-4 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-cyan-200">{review.reviewText}</p>
                    <div className="flex items-center mt-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-gray-600 dark:text-cyan-300">by {review.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
