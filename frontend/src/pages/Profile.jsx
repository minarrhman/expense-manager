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
      <div className="min-h-screen bg-app-bg p-8">

        <div className="max-w-4xl mx-auto bg-surface rounded-2xl shadow-lg overflow-hidden">

          {/* Banner */}

          <div className="h-40 bg-gradient-to-r from-violet-500 to-blue-600 to-purple-600" />

          <div className="px-8 pb-8">

            {/* Avatar */}

            <div className="-mt-16 flex justify-between items-end">

              <div className="flex items-center gap-6">

                <div className="relative">

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
                  />

                  <label
                    className="absolute bottom-1 right-1 bg-primary hover:bg-primary-hover text-white rounded-full p-2 cursor-pointer shadow-lg"
                  >
                    <FaCamera />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                </div>

                <div>

                  <h1 className="text-3xl font-bold text-white md:text-text-primary">
                    {profile.first_name} {profile.last_name}
                  </h1>

                  <p className="text-white/90 md:text-text-secondary">
                    @{profile.username}
                  </p>

                  {uploading && (
                    <p className="text-sm text-primary mt-2">
                      Uploading profile picture...
                    </p>
                  )}

                </div>

              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl shadow"
              >
                Edit Profile
              </button>

            </div>

            {/* Personal Information */}

            <div className="flex items-center gap-2 mt-10 mb-6">

              <FaUserCircle className="text-primary text-xl" />

              <h2 className="text-xl font-semibold text-text-primary">
                Personal Information
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="bg-app-bg rounded-xl p-5">
                <p className="text-sm text-text-secondary">
                  First Name
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {profile.first_name}
                </p>
              </div>

              <div className="bg-app-bg rounded-xl p-5">
                <p className="text-sm text-text-secondary">
                  Last Name
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {profile.last_name}
                </p>
              </div>

              <div className="bg-app-bg rounded-xl p-5">
                <p className="text-sm text-text-secondary">
                  Email
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {profile.email}
                </p>
              </div>

              <div className="bg-app-bg rounded-xl p-5">
                <p className="text-sm text-text-secondary">
                  Date of Birth
                </p>

                <p className="mt-2 font-semibold text-text-primary">
                  {profile.date_of_birth || "-"}
                </p>
              </div>

            </div>

            {/* Quick Actions */}

            <div className="mt-10">

              <h2 className="text-xl font-semibold text-text-primary mb-5">
                Quick Actions
              </h2>

              <div className="bg-surface rounded-2xl border border-border overflow-hidden">

                {/* Settings */}

                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full flex items-center justify-between p-5 hover:bg-surface-hover transition border-b border-border"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">

                      <FaCog className="text-primary text-lg" />

                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-text-primary">
                        Settings
                      </p>

                      <p className="text-sm text-text-secondary">
                        Appearance, language and currency
                      </p>

                    </div>

                  </div>

                  <FaChevronRight className="text-text-secondary" />

                </button>

                {/* FAQ */}

                <button
                  onClick={() => navigate("/faq")}
                  className="w-full flex items-center justify-between p-5 hover:bg-surface-hover transition border-b border-border"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">

                      <FaQuestionCircle className="text-yellow-600" />

                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-text-primary">
                        Frequently Asked Questions
                      </p>

                      <p className="text-sm text-text-secondary">
                        Get answers to common questions
                      </p>

                    </div>

                  </div>

                  <FaChevronRight className="text-text-secondary" />

                </button>

                {/* About */}

                <button
                  onClick={() => navigate("/about")}
                  className="w-full flex items-center justify-between p-5 hover:bg-surface-hover transition"
                >
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">

                      <FaInfoCircle className="text-blue-600" />

                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-text-primary">
                        About Expense Flow
                      </p>

                      <p className="text-sm text-text-secondary">
                        Learn more about the application
                      </p>

                    </div>

                  </div>

                  <FaChevronRight className="text-text-secondary" />

                </button>

              </div>

            </div>

            {/* Logout */}

            <div className="mt-10 flex justify-end">

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

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