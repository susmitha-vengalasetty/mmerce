import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(ShopContext);
  const navigate = useNavigate();

  // 🔹 States
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 Restore avatar on reload / tab switch
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatarPreview");
    if (savedAvatar) setAvatarPreview(savedAvatar);
  }, []);

  // 🔹 Redirect + restore profile data
  useEffect(() => {
    if (user === false) {
      navigate("/login");
      return;
    }

    if (user) {
      const savedProfile = localStorage.getItem("profileDraft");

      if (savedProfile) {
        setFormData(JSON.parse(savedProfile));
      } else {
        setFormData({
          name: user.name,
          email: user.email,
          password: "",
        });
      }
    }
  }, [user, navigate]);

  // 🔹 Auto-save profile edits
  useEffect(() => {
  if (formData.name && formData.email) {
    const { name, email } = formData;
    localStorage.setItem(
      "profileDraft",
      JSON.stringify({ name, email })
    );
  }
}, [formData]);


  // 🔹 Loading state
  if (user === null) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  // 🔹 Avatar upload handler
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

  reader.onloadend = () => {
    setAvatarPreview(reader.result); // base64
    localStorage.setItem("avatarPreview", reader.result);
  };

  reader.readAsDataURL(file);
  };

  // 🔹 Save (UI-only)
  const handleSave = () => {
    console.log("Updated profile:", formData);
    setEditMode(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No Photo
            </div>
          )}
        </div>

        {editMode && (
          <label className="cursor-pointer text-sm text-blue-600">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Profile Fields */}
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            disabled={!editMode}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className={`w-full border px-3 py-2 rounded ${
              editMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            disabled={!editMode}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`w-full border px-3 py-2 rounded ${
              editMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Password */}
        {editMode && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => {
            localStorage.removeItem("profileDraft");
            localStorage.removeItem("avatarPreview");
            logout();
          }}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
          <button
              onClick={() => {
                setEditMode(false);
                setFormData({
                  name: user.name,
                  email: user.email,
                  password: "",
                });
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
