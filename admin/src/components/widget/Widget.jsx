import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HotelIcon from '@mui/icons-material/Hotel';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import useFetch from "../../hooks/useFetch"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Widget = ({ type }) => {
  let data;

  // Fetch data from the corresponding API endpoint based on the widget type
  let fetchUrl;
  switch (type) {
    case "user":
      fetchUrl = "/api/users";
      break;
    case "hotels":
      fetchUrl = "/api/hotels";
      break;
    case "rooms":
      fetchUrl = "/api/rooms";
      break;
    default:
      fetchUrl = null;
  }

  // Use the custom useFetch hook to get the count
  const { data: fetchedData, loading, error } = useFetch(fetchUrl);
  
  // Fallback for loading and error states
  const count = loading ? "Loading..." : error ? "Error!" : fetchedData.length;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotels":
      data = {
        title: "HOTELS",
        isMoney: false,
        link: "See all hotels",
        icon: (
          <HotelIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "rooms":
      data = {
        title: "ROOMS",
        isMoney: false,
        link: "See all rooms",
        icon: (
          <RoomServiceIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney ? "$" : ""} {count}</span>
        <span className="link" onClick={() => {
          if (type === "user") navigate("/users"); // Navigate to /users
          if (type === "hotels") navigate("/hotels"); // Navigate to /hotels
          if (type === "rooms") navigate("/rooms"); // Navigate to /rooms
        }}>
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
