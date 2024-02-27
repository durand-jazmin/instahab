import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await logInUserService({ email, password });

      login(token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login-container">
      <div className="auth__left">
        <img
          src="https://i.imgur.com/P3Vm1Kq.png"
          alt="Instagram Screenshots"
          className="login-screenshot"
        />
      </div>
      <div className="login-form">
        <img
          src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-old.png?resize=1100%2C750&ssl=1"
          alt="Logo"
          className="login-logo"
        />
        <form onSubmit={handleForm}>
          <fieldset>
            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="pass"
                id="pass"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button">Login</button>
            {error ? <p>{error}</p> : null}
          </fieldset>
        </form>
        <div className="signup-link">
          <p>
            Don't you have an account?{' '}<Link to="/user">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
