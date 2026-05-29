import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Men() {

  const [selected, setSelected] = useState("");
  const [products, setProducts] = useState([]);

  // ================= ADD TO CART =================

  const handleAddToCart = async (item) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user || !user._id) {

        toast.error("Please Login");

        return;
      }

      await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            userId: user._id,
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1
          })
        }
      );

      toast.success("Added To Cart");

    } catch (error) {

      console.log(error);

      toast.error("Error Adding To Cart");
    }
  };

  const categories = [
    {
      name: "Jeans",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },

    {
      name: "Shirts",
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400"
    },

    {
      name: "Trousers",
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400"
    },

    {
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
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

  // ================= FILTER PRODUCTS =================

  const filteredProducts = products.filter(
    (item) =>
      item.category?.toLowerCase() === "men" &&
      item.subCategory?.toLowerCase() ===
        selected.toLowerCase()
  );

  return (
    <div className="p-8 bg-blue-50 min-h-screen">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Men Collection
      </h1>

      {/* CATEGORIES */}

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

      {/* PRODUCTS */}

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
                  Add To Cart
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

export default Men;