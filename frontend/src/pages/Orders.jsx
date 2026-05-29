import { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  // ================= FETCH ORDERS =================

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          console.log("No token");

          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        console.log("ORDERS:", data);

        if (data.success) {

          setOrders(data.orders);

        } else {

          console.log(data.message);
        }

      } catch (err) {

        console.log(err);
      }
    };

    fetchOrders();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-pink-600 mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <h2 className="text-3xl text-center mt-20 text-gray-600">
          No Orders Yet
        </h2>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <div className="mb-5">

                <h2 className="text-2xl font-bold">
                  Order ID:
                </h2>

                <p className="text-gray-600 break-all">
                  {order._id}
                </p>

                <p className="mt-2 text-lg font-semibold">
                  Grand Total:
                  ₹{order.grandTotal}
                </p>

              </div>

              {/* ITEMS */}

              <div className="space-y-5">

                {order.items.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-5 border-b pb-4"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                      <p>
                        Price:
                        ₹{item.price}
                      </p>

                      <p>
                        Quantity:
                        {item.quantity}
                      </p>

                      <p className="font-semibold">
                        Total:
                        ₹{item.total}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Orders;