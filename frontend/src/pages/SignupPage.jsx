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
      navigate("/user");
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
          src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-old.png?resize=1100%2C750&ssl=1"
          alt="Logo"
          className="signup-logo"
        />
        <form onSubmit={handleSignUp}>
          <fieldset>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            <button className="signup-button">Sign Up</button>
            {error && <p>{error}</p>}
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
