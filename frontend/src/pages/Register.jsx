import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    // ✅ REQUIRED VALIDATION

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      alert("Name, Email and Password are required");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      alert(data.message);

      if (data.success) {
        navigate("/");
      }

    } catch (err) {

      console.log(err);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white w-96 p-8 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">
          STAR
        </h1>

        <h2 className="text-center text-xl mb-6">
          Register
        </h2>

        <form autoComplete="off">

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            required
            autoComplete="off"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            autoComplete="off"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password *"
            required
            autoComplete="new-password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

          {/* PHONE */}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            autoComplete="off"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-4"
          />

         

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-pink-600"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;