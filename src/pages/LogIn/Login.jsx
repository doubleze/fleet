import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./login.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";


const Login = () => {
  const { setAuth, updateUserRole } = useAuth(); // Import updateUserRole

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [userData, setUserData] = useState ("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    try {
      const response = await axios.post("http://localhost:5000/users/logIn", {
        userName: user,
        passWord: pwd,
      });
      
      
      // console.log("Response data ", response.data);
      updateUserRole(response.data.userRole); // Update userRole in the auth context
      setCookie("user", response.data.userRole);
      localStorage.setItem("userData", JSON.stringify(response.data));

      // console.log("User data in local storage ", localStorage.getItem("userData") );


      setUser("");
      setPwd("");
      // console.log("Response data ", response.data);
      navigate(from || "/", { replace: true });
    } catch (error) {
      console.error("Error:", error);
      errRef.current.focus();
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
