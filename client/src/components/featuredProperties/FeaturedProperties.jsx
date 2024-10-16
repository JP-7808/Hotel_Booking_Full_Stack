import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("https://hotel-booking-backend-3j5l.onrender.com/api/hotels?featured=true&limit=4");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading properties</div>;
  }

  return (
    <div className="fp">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && (
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No properties found</div>
      )}
    </div>
  );
};

export default FeaturedProperties;
