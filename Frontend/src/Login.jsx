import { useContext, useState } from "react";
import { MyContext } from "./MyContext.jsx";

function Login() {
  const { setUser, apiBase } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);

  const submit = async () => {
    setError(null);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      localStorage.setItem("token", data.token);
      setUser({ token: data.token, role: data.role });
    } catch {
      setError("Network error");
    }
  };

return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1e1e1e",
    }}
  >
    <div
      style={{
        width: 380,
        padding: "32px 50px",
        borderRadius: 14,
        background: "rgba(50,50,50,0.55)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "#bbbbbb",
          marginTop: 0,
          marginBottom: 10,
          letterSpacing: "0.5px",
        }}
      >
        Welcome To <span style={{ color: "#4da6ff", fontWeight: 600 }}>QuadGPT</span>
      </p>

      <h2
        style={{
          marginTop: 30,
          marginBottom: 20,
          fontSize: 26,
          fontWeight: "600",
          color: "#fff",
          textAlign:'center'
        }}
      >
        {mode === "login" ? "Login" : "Register"}
      </h2>

      <label style={{color:'white'}}>Enter Email: </label>  
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "92%",
          padding: "12px 14px",
          marginBottom: 12,
          marginTop: 12,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "#fff",
          outline: "none",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
        }}
      />

      <label style={{color:'white'}}>Enter Password: </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "92%",
          padding: "12px 14px",
          marginBottom: 12,
          marginTop: 12,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "#fff",
          outline: "none",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.4)",
        }}
      />

      {error && (
        <p style={{ color: "#ff6b6b", margin: "6px 0 10px" }}>{error}</p>
      )}

      <div style={{ textAlign: "center", marginTop: 0 }}>
        <button
          onClick={submit}
          style={{
            padding: "12px 28px",
            borderRadius: 8,
            border: "1px solid rgba(126,137,127,0.5)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontWeight: "500",
            cursor: "pointer",
            transition: "0.25s",
            display: "inline-block", // <-- ensures center alignment
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.15)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.05)")
          }
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p style={{ fontSize: 15, marginTop: 16, color: "#d1d1d1" }}>
          {mode === "login" ? "No account?" : "Have an account?"}{" "}
          <span
            style={{ cursor: "pointer", color: "#4da6ff", fontWeight: 500 }}
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>

    </div>
  </div>
);

}

export default Login;
