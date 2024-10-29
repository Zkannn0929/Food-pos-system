'use client'; // Required for client-side rendering

import { useState } from 'react';
import Link from 'next/link';

export default function Review() {
  const [review, setReview] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleReviewSubmit = async () => {
    if (!review) {
      alert('Please enter your review.');
      return;
    }

    try {
      // Simulate submitting the review (replace with API call or integration logic)
      console.log(`Submitting review: ${review}`);
      setSubmissionStatus('Review submitted successfully!');

      // Optionally integrate with Google Review API here
    } catch (error) {
      setSubmissionStatus(`Failed to submit review: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleReviewSubmit}>Submit Review</button>
      <p>{submissionStatus}</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
