import './hotelDetail.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const SingleHotel = () => {
  const { hotelId } = useParams(); // Get the hotel ID from the URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // Fetch hotel details using the hotel ID from the API
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`https://hotel-booking-backend-3j5l.onrender.com/api/hotels/find/${hotelId}`);
        setHotel(res.data); // Set the hotel data
      } catch (err) {
        console.error(err);
      }
    };

    fetchHotel();
  }, [hotelId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Hotel Information</h1>
            <div className="item">
              {/* Display hotel's image or a default one if not provided */}
              <img
                src={hotel?.photos?.[0] || "https://via.placeholder.com/150"}
                alt="Hotel"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{hotel?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{hotel?.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{hotel?.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{hotel?.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance:</span>
                  <span className="itemValue">{hotel?.distance} km</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{hotel?.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{hotel?.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rating:</span>
                  <span className="itemValue">{hotel?.rating || "No rating"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">${hotel?.cheapestPrice}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Featured:</span>
                  <span className="itemValue">{hotel?.featured ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
