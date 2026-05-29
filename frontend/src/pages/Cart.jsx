import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // ================= TOKEN =================

  const token = localStorage.getItem("token");

  // ================= FETCH CART =================

  const fetchCart = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {

        setCart(data.cartItems);

      } else {

        console.log(data.message);
      }

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

  const fetchCart = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {

        setCart(data.cartItems);

      }

    } catch (err) {

      console.log(err);
    }
  };

  fetchCart();

}, [token]);

  // ================= TOTAL =================

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // ================= INCREASE =================

  const increaseQuantity = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/increase/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (err) {

      console.log(err);
    }
  };

  // ================= DECREASE =================

  const decreaseQuantity = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/decrease/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (err) {

      console.log(err);
    }
  };

  // ================= REMOVE =================

  const removeItem = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/cart/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (err) {

      console.log(err);
    }
  };

  // ================= PLACE ORDER =================

  const placeOrder = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            cartItems: cart
          })
        }
      );

      const data = await res.json();

      if (data.success) {

        // CLEAR CART
        await fetch(
          "http://localhost:5000/api/cart/clear/all",
          {
            method: "DELETE",

            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Order Placed Successfully");

        setCart([]);

        navigate("/orders");

      } else {

        alert(data.message);
      }

    } catch (err) {

      console.log(err);

      alert("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        My Cart
      </h1>

      {cart.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-3xl font-semibold text-gray-600">
            Cart is Empty
          </h2>

        </div>

      ) : (

        <div className="space-y-6">

          {cart.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center"
            >

              {/* LEFT SIDE */}

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-green-600 font-bold mt-2">
                    ₹{item.price}
                  </p>

                  <p className="mt-2">
                    Quantity: {item.quantity}
                  </p>

                  <p className="font-semibold mt-1">
                    Total:
                    ₹{item.price * item.quantity}
                  </p>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    decreaseQuantity(item._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item._id)
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>

                <button
                  onClick={() =>
                    removeItem(item._id)
                  }
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg ml-3"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* GRAND TOTAL */}

          <div className="text-right mt-10 bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold mb-5">
              Grand Total: ₹{totalPrice}
            </h2>

            <button
              onClick={placeOrder}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg"
            >
              Place Order
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;