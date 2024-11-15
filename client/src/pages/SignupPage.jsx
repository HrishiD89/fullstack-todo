import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages_style.css";
import InputField from "../components/InputField";


function SignupPage() {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios
        .post("https://fullstacktodov1-10u6mr1s.b4a.run/signup", {
          name,
          email,
          password,
        })
        .then((response) => {
          alert(response.data.message);
          e.target.reset();
          navigate("/login");
        });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <h1>Sign Up</h1>
          <form onSubmit={submitHandler}>
            <InputField type="text" id="name" label="Name" required />
            <InputField type="email" id="email" label="Email" required />
            <div className="password-group">
              <InputField 
                type={showPassword ? "text" : "password"}
                id="password" 
                label="Password" 
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
            
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
