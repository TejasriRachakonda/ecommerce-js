import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

 

  // ✅ FETCH ONLY RECOMMENDED PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/recommended"
        );

        const data = await res.json();

        console.log("RECOMMENDED PRODUCTS:", data);

        setProducts(data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        Recommended Products
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-4 text-center text-gray-500">
            No recommended products found
          </p>
        ) : (
          products.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-2xl shadow hover:scale-105 transition"
            >
              <img
                src={item.image}
                className="h-52 w-full object-cover rounded-xl"
                alt={item.name}
              />

              <h2 className="mt-3 font-bold text-lg">{item.name}</h2>

              <p className="text-green-600 font-bold text-xl">
                ₹{item.price}
              </p>

             

              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;