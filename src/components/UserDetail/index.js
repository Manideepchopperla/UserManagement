import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>

      {loading ? (
        <div className="main-loader-container">
          <BeatLoader size={30} color="#4A90E2" loading={loading} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : user ? (
        <div className="user-details">
          <h1>{user.name}</h1>
          <p><strong>User Id:</strong> {user.id}</p>
          <p><strong>UserName:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default UserDetail;
