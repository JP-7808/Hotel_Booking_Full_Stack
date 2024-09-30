import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        country: undefined,
        img: undefined,
        city: undefined,
        phone: undefined,
        password: undefined,
    });

    const {dispatch} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try{
            await axios.post("/api/auth/register", credentials);

            // Automatically log the user in
            const loginRes = await axios.post("/api/auth/login", {
                username: credentials.username,
                password: credentials.password,
            })
            dispatch({type: "LOGIN_SUCCESS", payload: loginRes.data.details});

            // Redirect to the homepage after successful login
            navigate("/");

        }catch(err){
            setError(err.response?.data || "An Error occured");
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <h2 className="rTitle">Register</h2>
                <input 
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                  className="rInput"
                />
                <input 
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                  className="rInput"
                />
                <input 
                  type="text"
                  placeholder="Country"
                  id="country"
                  onChange={handleChange}
                  className="rInput"
                />
                <input 
                  type="text"
                  placeholder="City"
                  id="city"
                  onChange={handleChange}
                  className="rInput" 
                />
                <input 
                  type="text"
                  placeholder="Phone"
                  id="phone"
                  onChange={handleChange}
                  className="rInput"
                />
                <input 
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="rInput"
                />

                <button onClick={handleClick} className="rButton">
                    register
                </button>
                {error && <span className="rError">{error.message}</span>}
            </div>
        </div>
    )


}

export default Register;