import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // extracts 'users' from URL like '/users'
  const { data, loading, error } = useFetch(`https://hotel-booking-backend-3j5l.onrender.com/api/${path}`);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data); // Update list only when data is available
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hotel-booking-backend-3j5l.onrender.com/api/${path}/${id}`);
      // Update the list to remove the deleted item
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Handle loading and error states
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.charAt(0).toUpperCase() + path.slice(1)} {/* Capitalize first letter */}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id || row.id}
      />
    </div>
  );
};

export default Datatable;
