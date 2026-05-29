import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Women() {

  const [selected, setSelected] = useState("");
  const [products, setProducts] = useState([]);

  // ================= ADD TO CART =================

  // ================= ADD TO CART =================

const handleAddToCart = async (item) => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const token = localStorage.getItem("token");

    if (!user || !user._id || !token) {

      toast.error("Please Login");

      return;
    }

    const res = await fetch(
      "http://localhost:5000/api/cart",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // ✅ SEND TOKEN
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1
        })
      }
    );

    const data = await res.json();

    if (data.success) {

      toast.success("Added To Cart");

    } else {

      toast.error(data.message);
    }

  } catch (error) {

    console.log(error);

    toast.error("Error Adding To Cart");
  }
};

  // ================= CATEGORIES =================

  const categories = [
    {
      name: "Kurtis",
      image: "https://picsum.photos/200?24"
    },
    {
      name: "Saree",
      image: "https://picsum.photos/200?21"
    },
    {
      name: "Makeup",
      image: "https://picsum.photos/200?22"
    },
    {
      name: "Jewellery",
      image: "https://picsum.photos/200?23"
    }
  ];

  // ================= FETCH PRODUCTS =================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        setProducts(data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchProducts();

  }, []);

  // ================= FILTER =================

  const filteredProducts = products.filter(
    (item) =>
      item.category?.toLowerCase() === "women" &&
      item.subCategory?.toLowerCase() === selected.toLowerCase()
  );

  return (
    <div className="p-8 bg-pink-50 min-h-screen">

      <h1 className="text-4xl font-bold text-pink-700 mb-8">
        Women Collection
      </h1>

      <div className="flex gap-8 mb-10 flex-wrap">

        {categories.map((cat, index) => (

          <div
            key={index}
            onClick={() => setSelected(cat.name)}
            className="cursor-pointer text-center hover:scale-105 transition"
          >

            <img
              src={cat.image}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />

            <p className="mt-2 font-semibold">
              {cat.name}
            </p>

          </div>
        ))}
      </div>

      {selected && (
        <>

          <h2 className="text-3xl font-bold mb-6">
            {selected}
          </h2>

          <div className="grid grid-cols-5 gap-6">

            {filteredProducts.map((item, index) => (

              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow text-center"
              >

                <img
                  src={item.image}
                  className="h-40 w-full object-cover rounded-lg"
                />

                <h3 className="mt-3 font-semibold">
                  {item.name}
                </h3>

                <p className="text-green-600 font-bold">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 bg-black text-white px-4 py-2 rounded-lg w-full"
                >
                  Add to Cart
                </button>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
                  Buy Now
                </button>

              </div>
            ))}

          </div>

        </>
      )}
    </div>
  );
}

export default Women;