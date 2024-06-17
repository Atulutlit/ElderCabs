import { useState } from "react";
import auth from "../../Api/auth";
import "./style.css";

// Components
import Alert from "@mui/material/Alert";

// Assets
import logo from "../../Assets/logo.png";

const LoginLayout = () => {
  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await auth.login({ email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
      }

      window.location.reload();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="LoginComponent">
      {error && (
        <Alert className="mb-1" severity="warning">
          Invalid Credentials
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className="LoginForm"
        method="POST"
        action=""
      >
        <img
          className="LoginLogo"
          // src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          src={logo}
          alt="Elder Cabs"
        />
        <input
          className="LoginInput"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="LoginInput"
          placeholder="Password"
          type="password"
          value={[password]}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="LoginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginLayout;
