import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import InputField from "../components/InputField";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import "./pages_style.css";


function LoginPage() {
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios
        .post("https://fullstacktodov1-10u6mr1s.b4a.run/login", {
          email,
          password,
        })
        .then((response) => {
          setAlert({ message: response.data.message, type: "success" }); 
          login(response.data.token);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        });
    } catch (error) {
      setAlert({
        message: error.response?.data || "Login failed. Please try again.",
        type: "error",
      }); // Set error alert
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <InputField type="email" id="email" label="Email" demoCreds="demo@gmail.com" required />
            <div className="password-group">
              <InputField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                demoCreds="Demo@12345"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type="submit" className="signup-button">
              Login
            </button>
          </form>
          <p className="login-link">
            Dont have a Account ? <Link to="/signup">Sign up</Link>
          </p>
          {alert && (
          <Alert style={{fontFamily:"monospace"}}
            icon={ alert.type === "sucesss" ? <CheckIcon fontSize="inherit" /> : null }
            severity={alert.type}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;
