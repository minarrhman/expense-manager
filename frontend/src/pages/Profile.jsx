import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaChevronRight,
  FaUserCircle,
  FaQuestionCircle,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";

import API from "../services/api";
import EditProfileModal from "../Components/EditProfileModal";
import SettingsModal from "../Components/SettingsModal";
import OptionModal from "../Components/OptionModal";
import defaultAvatar from "../assets/default-avatar.png";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [showOptionModal, setShowOptionModal] = useState(false);

  const [optionTitle, setOptionTitle] = useState("");
  const [optionList, setOptionList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [currentSetting, setCurrentSetting] = useState("");

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/profile/");
      setProfile(res.data);
    } catch (err) {
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      setUploading(true);

      try {
        await API.put("/api/profile/", {
          profile_photo: base64,
        });

        fetchProfile();
      } catch (err) {
        console.error(err.response?.data);
        alert("Failed to update profile picture.");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };
  const openDarkMode = () => {

    setCurrentSetting("theme");

    setOptionTitle("Dark Mode");

    setOptionList([
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
      { label: "System", value: "system" },
    ]);

    setSelectedValue(localStorage.getItem("theme") || "system");

    setShowSettings(false);

    setShowOptionModal(true);
  };

  const openCurrency = () => {

    setCurrentSetting("currency");

    setOptionTitle("Currency");

    setOptionList([
      { label: "Bangladeshi Taka (৳)", value: "BDT" },
      { label: "US Dollar ($)", value: "USD" },
      { label: "Euro (€)", value: "EUR" },
    ]);

    setSelectedValue(localStorage.getItem("currency") || "BDT");

    setShowSettings(false);

    setShowOptionModal(true);
  };

  const openLanguage = () => {

    setCurrentSetting("language");

    setOptionTitle("Language");

    setOptionList([
      { label: "English", value: "en" },
      { label: "বাংলা", value: "bn" },
    ]);

    setSelectedValue(localStorage.getItem("language") || "en");

    setShowSettings(false);

    setShowOptionModal(true);
  };

  const handleSettingSave = (value) => {

    if (currentSetting === "theme") {

      localStorage.setItem("theme", value);

      if (value === "dark") {
        document.documentElement.classList.add("dark");
      } else if (value === "light") {
        document.documentElement.classList.remove("dark");
      } else {

        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        document.documentElement.classList.toggle(
          "dark",
          prefersDark
        );
      }
    }

    if (currentSetting === "currency") {
      localStorage.setItem("currency", value);
    }

    if (currentSetting === "language") {
      localStorage.setItem("language", value);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-app-bg text-text-primary">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  const profileImage = profile?.profile_photo
    ? `data:image/jpeg;base64,${profile.profile_photo}`
    : defaultAvatar;

  return (
    <>
      <div className="min-h-screen bg-app-bg p-4 sm:p-6 lg:p-8">

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-surface shadow-lg">

          {/* Banner */}

          <div className="h-32 sm:h-40 bg-gradient-to-r from-violet-500 via-blue-600 to-purple-600" />

          <div className="px-4 sm:px-6 lg:px-8 pb-8">

            {/* Avatar */}

            <div className="-mt-12 sm:-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">

                <div className="relative flex-shrink-0">

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
                  />

                  <label className="absolute bottom-1 right-1 bg-primary hover:bg-primary-hover text-white rounded-full p-2 cursor-pointer shadow-lg">

                    <FaCamera />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                  </label>

                </div>

                <div className="text-center sm:text-left">

                  <h1 className="text-2xl sm:text-3xl font-bold text-white md:text-text-primary break-words">
                    {profile.first_name} {profile.last_name}
                  </h1>

                  <p className="text-white/90 md:text-text-secondary break-all">
                    @{profile.username}
                  </p>

                  {uploading && (
                    <p className="mt-2 text-sm text-primary">
                      Uploading profile picture...
                    </p>
                  )}

                </div>

              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl shadow"
              >
                Edit Profile
              </button>

            </div>

            {/* Personal Information */}

            <div className="mt-10 mb-6 flex items-center gap-2">

              <FaUserCircle className="text-xl text-primary" />

              <h2 className="text-xl font-semibold text-text-primary">
                Personal Information
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="rounded-xl bg-app-bg p-5">
                <p className="text-sm text-text-secondary">First Name</p>
                <p className="mt-2 font-semibold text-text-primary break-words">
                  {profile.first_name}
                </p>
              </div>

              <div className="rounded-xl bg-app-bg p-5">
                <p className="text-sm text-text-secondary">Last Name</p>
                <p className="mt-2 font-semibold text-text-primary break-words">
                  {profile.last_name}
                </p>
              </div>

              <div className="rounded-xl bg-app-bg p-5">
                <p className="text-sm text-text-secondary">Email</p>
                <p className="mt-2 font-semibold text-text-primary break-all">
                  {profile.email}
                </p>
              </div>

              <div className="rounded-xl bg-app-bg p-5">
                <p className="text-sm text-text-secondary">Date of Birth</p>
                <p className="mt-2 font-semibold text-text-primary">
                  {profile.date_of_birth || "-"}
                </p>
              </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-10">

              <h2 className="mb-5 text-xl font-semibold text-text-primary">
                Quick Actions
              </h2>

              <div className="overflow-hidden rounded-2xl border border-border bg-surface">

                {/* Settings */}

                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-surface-hover transition border-b border-border"
                >
                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">

                      <FaCog className="text-lg text-primary" />

                    </div>

                    <div className="text-left min-w-0">

                      <p className="font-semibold text-text-primary">
                        Settings
                      </p>

                      <p className="text-sm text-text-secondary break-words">
                        Appearance, language and currency
                      </p>

                    </div>

                  </div>

                  <FaChevronRight className="flex-shrink-0 text-text-secondary" />

                </button>

                {/* Repeat the same responsive structure for FAQ and About */}

              </div>

            </div>

            {/* Logout */}

            <div className="mt-10">

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto sm:ml-auto block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Keep your modals unchanged */}

      <EditProfileModal
        open={showEditModal}
        profile={profile}
        onClose={() => setShowEditModal(false)}
        onUpdated={fetchProfile}
      />

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onOpenDarkMode={openDarkMode}
        onOpenCurrency={openCurrency}
        onOpenLanguage={openLanguage}
      />

      <OptionModal
        open={showOptionModal}
        title={optionTitle}
        options={optionList}
        selectedValue={selectedValue}
        onSelect={handleSettingSave}
        onClose={() => setShowOptionModal(false)}
      />

    </>
  );

}

export default Profile;