import "./style.css";
import { useState } from "react";
import admin from "../../Api/admin";

// Components
import Alert from "@mui/material/Alert";

const Settings = () => {
  // Form Values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error
  const [error, setError] = useState(0);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        setError(-2);
        return;
      }

      await admin.update({ email, password });
      setError(1);
    } catch (error) {
      setError(-1);
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="Settings">
      <h1 className="SettingsHeading">Update User Login Credentials</h1>

      {error === 1 && (
        <Alert severity="success">User Password Updated Successfully</Alert>
      )}
      {error === -1 && <Alert severity="error">Something Went Wrong!</Alert>}
      {error === -2 && <Alert severity="warning">Passwords Do not match</Alert>}

      <form
        onSubmit={handleSubmit}
        className="SettingsForm"
        method="POST"
        action=""
      >
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="LoginInput"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="LoginButton" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
