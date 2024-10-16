import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // Start with null for error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await axios.get(url, { withCredentials: true });
        setData(res.data); // Set the fetched data
        setError(null); // Reset error on success
      } catch (err) {
        setError(err.message || "An error occurred"); // Set a more descriptive error message
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true); // Set loading to true before refetching
    try {
      const res = await axios.get(url);
      setData(res.data);
      setError(null); // Reset error on success
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
