import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= HANDLE LOGIN =================

  const handleLogin = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ✅ LOGIN SUCCESS
      if (data.success) {

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login successful");

        // ✅ NAVIGATE HOME
        navigate("/home");

      } else {

        alert(data.message);
      }

    } catch (err) {

      console.log(err);

      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">
          STAR
        </h1>

        <h2 className="text-center text-xl mb-6">
          Login
        </h2>

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* BUTTON */}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-pink-600"
        >
          Login
        </button>

        {/* REGISTER */}

        <p className="text-center mt-4">

          New User?{" "}

          <Link
            to="/register"
            className="text-pink-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;