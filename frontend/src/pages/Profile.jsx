import { useRef, useState } from "react";

function Profile() {

  // ✅ USER STATE
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [address, setAddress] = useState(
    user?.address || ""
  );

  const [image, setImage] = useState(
    user?.image || ""
  );

  const [selectedFile, setSelectedFile] =
    useState(null);

  const fileRef = useRef();

  // ================= IMAGE SELECT =================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setSelectedFile(file);

      // ✅ PREVIEW IMAGE
      setImage(URL.createObjectURL(file));
    }
  };

  // ================= SAVE PROFILE =================

  const saveProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("address", address);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await fetch(
        "http://localhost:5000/api/profile",
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: formData
        }
      );

      const data = await res.json();

      if (data.success) {

        // ✅ SAVE NEW USER
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // ✅ UPDATE REACT STATE
        setUser(data.user);

        // ✅ UPDATE IMAGE
        setImage(data.user.image);

        alert("Profile Updated");

      } else {

        alert(data.message);
      }

    } catch (err) {

      console.log(err);

      alert("Error Updating Profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        {/* IMAGE */}

        <div className="relative w-fit mx-auto">

          <img
  src={
    image ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  alt="profile"
  className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover"
/>

          <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-0 right-0 bg-black text-white rounded-full w-8 h-8"
          >
            ✎
          </button>

          <input
            type="file"
            ref={fileRef}
            onChange={handleImage}
            className="hidden"
            accept="image/*"
          />

        </div>

        {/* FIELDS */}

        <div className="mt-8 space-y-4">

          <input
            value={user?.name || ""}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <input
            value={user?.email || ""}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <input
            value={user?.phone || ""}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100"
          />

          <input
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Enter Address"
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={saveProfile}
          className="mt-6 bg-black text-white py-3 rounded-xl w-full"
        >
          Save Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;