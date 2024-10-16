import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./roomDetail.css"; // Ensure this file exists and is styled accordingly

const RoomDetail = () => {
  const { roomId } = useParams(); // Get the room ID from the URL
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Fetch room details using the room ID from the API
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`https://hotel-booking-backend-3j5l.onrender.com/api/rooms/${roomId}`);
        setRoom(res.data); // Set the room data
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [roomId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Room Information</h1>
            <div className="item">
              <img
                src={room?.img || "https://via.placeholder.com/150"} // Assuming you have an image property
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{room?.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">${room?.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{room?.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{room?.desc}</span>
                </div>
                <h3>Room Numbers and Availability:</h3>
                <ul>
                  {room?.roomNumbers.map((roomNumber) => (
                    <li key={roomNumber.number}>
                      <span>Room {roomNumber.number}</span>
                      <ul>
                        {roomNumber.unavailableDates.length > 0 ? (
                          roomNumber.unavailableDates.map((date, index) => (
                            <li key={index}>
                              Unavailable Date: {new Date(date).toLocaleDateString()}
                            </li>
                          ))
                        ) : (
                          <li>No unavailable dates</li>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
