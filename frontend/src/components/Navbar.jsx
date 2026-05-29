import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/register")
    return null;

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold text-yellow-400">STAR</h1>

      <div className="space-x-6 text-lg">
        <Link to="/home">Home</Link>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
      </div>

      <div className="space-x-5">
        <Link to="/profile">Profile</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;