import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Brewery.css";

const BreweryDetails = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setBrewery(response.data);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/reviews/get-reviews`
        );
        console.log(response)
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchBreweryDetails();
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/reviews/add-review",
        {
          breweryId: id,
          rating,
          review,
          user: "1",
        }
      );

      setReviews([...reviews, response.data]);

      setRating(1);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">{brewery.name}</h2>
      <p className="info">
        Address: {brewery.street}, {brewery.city}, {brewery.state_province},{" "}
        {brewery.postal_code}
      </p>
      <p className="info">Phone: {brewery.phone}</p>
      <p className="info">
        Website:{" "}
        <a
          className="link"
          href={brewery.website_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {brewery.website_url}
        </a>
      </p>
      <p className="info">Brewery Type: {brewery.brewery_type}</p>
      <p className="info">Country: {brewery.country}</p>
      <p className="info">Longitude: {brewery.longitude}</p>
      <p className="info">Latitude: {brewery.latitude}</p>

      <div className="rating-review">
        <h3>Leave a Review</h3>
        <div className="rating">
          <label>Rating: </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="review">
          <label>Review: </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleSubmitReview} className="submit-button">
          Submit Review
        </button>
      </div>

      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryDetails;
