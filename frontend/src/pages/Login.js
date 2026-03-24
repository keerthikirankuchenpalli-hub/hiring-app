import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Worqly Login </h2>

      {/* USING setEmail */}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      {/* USING setPassword */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* USING setRole */}
      <input placeholder="Role" onChange={(e) => setRole(e.target.value)} />

      {/* USING handleLogin */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
