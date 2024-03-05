import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo_hab_ from "../images/logo_hab_.png"
import InstahabMobile from "../images/InstahabMobile.png"
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
    <section className="loginContainer">
      <div className="auth__left">
        <img
        src={InstahabMobile}
          alt="Instahab Screenshots"
          className="loginScreenshot"
        />
      </div>
      <div className="loginForm">
        <img
         src={logo_hab_}
          alt="Logo"
          className="loginLogo"
        />
        <form onSubmit={handleForm}>
          <fieldset>
            <div className="inputGroup">
            
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />           
              <input
                type="password"
                placeholder="Password"
                name="pass"
                id="pass"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
           
            <button className="loginButton">Login</button>
            {error ? <p>{error}</p> : null}
          </div>
          </fieldset>
        </form>
        <div className="signupLink">
          <p>
            Don't you have an account?{' '}<Link to="/user">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
