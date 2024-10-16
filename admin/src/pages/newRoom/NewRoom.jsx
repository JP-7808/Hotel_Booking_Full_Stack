import "./newRoom.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState(undefined);
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const {data, loading, error} = useFetch("https://hotel-booking-backend-3j5l.onrender.com/api/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room => ({ number : room }))
    try{
        await axios.post(`https://hotel-booking-backend-3j5l.onrender.com/api/rooms/${hotelId}`, {...info, roomNumbers})

    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange}/>
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={e => setRooms(e.target.value)} placeholder="give comma between room numbers."></textarea>
                
              </div>
                <div className="formInput">
                    <label >Choose a hotel</label>
                    <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                        {loading ? "loading": data && data.map(hotel => (
                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                        ))}
                    </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
