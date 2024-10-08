import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="hotels" />
          <Widget type="rooms" />
        </div>
        <div className="charts">
          <Featured />
          
        </div>
      </div>
    </div>
  );
};

export default Home;
