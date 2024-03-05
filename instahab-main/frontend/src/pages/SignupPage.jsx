import { useState } from "react";
import { signUpUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";
import logo_hab_ from "../images/logo_hab_.png"
import InstahabMobile from "../images/InstahabMobile.png"
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUpUserService({ email, password });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="signupContainer">
      <div className="authLeft">
        <img
         src={InstahabMobile}
          alt="Instahab Screenshots"
          className="signupScreenshot"
        />
        </div>
        <div className="signupForm">
        <img
            src={logo_hab_}
          alt="Logo"
          className="signupLogo"
        />
        <form onSubmit={handleSignUp}>
          <fieldset>
            <div className="inputGroup">

              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="signupButton">Sign Up</button>
            {error && <p>{error}</p>}
            </div>
          </fieldset>
        </form>
        <div className="signupLink">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
