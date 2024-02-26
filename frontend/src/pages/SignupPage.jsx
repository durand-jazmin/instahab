import { useState } from "react";
import { signUpUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";
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
    <section className="signup-container">
      <div className="auth__left">
        <img
          src="https://i.imgur.com/P3Vm1Kq.png"
          alt="Instagram Screenshots"
          className="signup-screenshot"
        />
        </div>
        <div className="signup-form">
        <img
          src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
          alt="Logo"
          className="signup-logo"
        />
        <form onSubmit={handleSignUp}>
          <fieldset>
            <div className="input-group">

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
            <button className="signup-button">Sign Up</button>
            {error && <p>{error}</p>}
            </div>
          </fieldset>
        </form>
        <div className="signup-link">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
