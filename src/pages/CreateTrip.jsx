// src/pages/CreateTrip.jsx

import React, { useEffect, useState } from "react";
import {
  FaGoogle,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { travelTypes, travelBudgets, AiPrompt } from "../data";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { chatSession } from "@/Services/AiModal";
import { doc, setDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const TripOptionCard = ({ option, selected, onClick }) => (
  <div
    className={`relative flex items-center justify-between md:flex-col group card bg-white/30 dark:bg-black/85 backdrop-blur-xl rounded-xl shadow-xl p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
      option.spn
    }
      ${
        selected
          ? "border-2 border-blue-500 dark:border-white dark:border-[1px]"
          : ""
      }`}
    onClick={onClick}
  >
    <div className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-white shadow-lg flex items-center justify-center text-white text-5xl dark:text-black bg-black dark:bg-white">
      {option.icon}
    </div>
    <div className="w-1/2 lg:w-auto text-start sm:text-center">
      <h3 className="md:text-xl font-semibold dark:text-white">
        {option.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 md:text-base">
        {option.description}
      </p>
    </div>
  </div>
);

function CreateTrip() {
  const [selectedTravelType, setSelectedTravelType] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [loginDialogue, setLoginDialogue] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    noOfPeople: "",
    budget: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    if (validateForm()) {
      console.log("Form Data:", formData);
      setLoading(true);
      generateTrip();
    } else {
      setLoading(false);
      toast("Please fill out all fields.", {
        style: {
          backgroundColor: "#ffffff", // White background
          color: "#000000", // Black text
        },
      });
    }
  };

  async function saveTripToDb(tripData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "plannedTrips", docId), {
        userPreferences: formData,
        tripData: JSON.parse(tripData),
        userEmail: user.email,
        id: docId,
      });

      setLoading(false);
      navigate(`/view-trip/${docId}`);
      toast(
        <div className="flex items-center">
          <TiTick className="mr-2 text-xl" />
          <span>Trip created successfully!</span>
        </div>,
        {
          style: {
            backgroundColor: "#ffffff", // White background
            color: "#000000", // Black text
          },
        }
      );
    } catch (error) {
      console.error("Error saving trip to DB:", error);
      setLoading(false);
      toast("Failed to save trip to database.", {
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      });
    }
  }

  async function generateTrip() {
    const finalPrompt = AiPrompt.replace("{location}", formData.destination)
      .replace("{totalDays}", formData.days)
      .replace("{typeTravel}", formData.noOfPeople)
      .replace("{typeBudget}", formData.budget)
      .replace("{totalDays}", formData.days);

    console.log(finalPrompt);

    try {
      const result = await chatSession.sendMessage(finalPrompt);
      console.log(result.response.text());
      saveTripToDb(result.response.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
      toast("Failed to generate trip plan.", {
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      });
    }
  }

  function handleLogin() {
    const user = localStorage.getItem("user");
    if (!user) {
      setLoginDialogue(true);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onerror: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setLoginDialogue(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setLoading(false);
        toast("Failed to fetch user profile.", {
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        });
      });
  };

  return (
    <div className="sm:px-10 md:px-24 xl:px-10 px-10 bg-background-50 dark:bg-background-900 py-12">
      <h2 className="font-bold text-2xl sm:text-3xl text-text-800 dark:text-white text-center">
        Plan Your Adventure . . ✈️ 🌍
      </h2>
      <p className="text-center sm:text-sm mb-12 text-gray-500 mt-5">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-16">
        {/* Destination Input */}
        <div>
          <h3 className="font-semibold text-text-700 my-3 dark:text-white flex items-center gap-2">
            <FaMapMarkerAlt /> Choose Your Destination
          </h3>
          <Input
            type="text"
            placeholder="Enter destination"
            className="bg-background-200 dark:bg-background-800 text-text-700 shadow-md dark:shadow-white/10 dark:rounded-xl focus:shadow-lg transition-shadow duration-300"
            value={formData.destination}
            onChange={(e) => handleInputChange("destination", e.target.value)}
          />
          {/* <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_PLACE_API_KEY} /> */}
        </div>

        {/* Number of Days */}
        <div>
          <h3 className="font-semibold text-text-700 my-3 dark:text-white flex items-center gap-2">
            <FaRegCalendarAlt /> How Many Days?
          </h3>
          <Input
            type="number"
            placeholder="Ex: 5"
            min="1"
            max="5"
            className="dark:rounded-xl dark:text-black bg-background-200 dark:bg-background-800 text-text-700 shadow-md focus:shadow-lg transition-shadow duration-300"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>

        {/* Travel Type Selection */}
        <div className="my-10">
          <h3 className="font-semibold text-text-700 my-6 text-3xl dark:text-white flex items-center justify-center gap-2">
            <FaUser /> Select Travel Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelTypes.map((item) => (
              <TripOptionCard
                key={item.id}
                option={item}
                selected={selectedTravelType === item.id}
                onClick={() => {
                  setSelectedTravelType(item.id);
                  handleInputChange("noOfPeople", item.people); // Set the number of people based on travel type
                }}
              />
            ))}
          </div>
        </div>

        {/* Travel Budget Selection */}
        <div className="mt-20">
          <h3 className="font-semibold text-text-700 my-6 dark:text-white flex items-center justify-center text-3xl gap-2">
            $ Select Your Budget
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelBudgets.map((item) => (
              <TripOptionCard
                key={item.id}
                option={item}
                selected={selectedBudget === item.id}
                onClick={() => {
                  setSelectedBudget(item.id);
                  handleInputChange("budget", item.title);
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`mt-5 w-1/2 lg:w-1/4 bg-black rounded-2xl text-white font-bold py-3 px-6 transition-transform transform hover:scale-105 ${
              loading
                ? "bg-black opacity-50 cursor-not-allowed"
                : "hover:bg-white/5 hover:shadow-md hover:shadow-stone-900 hover:text-black dark:hover:text-black dark:hover:bg-white"
            }`}
          >
            {loading ? (
              <BiLoader className="w-fit h-10 animate-spin mx-auto" />
            ) : (
              "Create Trip"
            )}
          </button>
        </div>

        {/* Dialog Component */}
        <Dialog open={loginDialogue} onOpenChange={setLoginDialogue}>
          <DialogContent className="bg-white dark:bg-black text-black dark:text-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-center mb-4">
                <span className="font-normal text-lg">Welcome To</span> e X p L
                o R a
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 dark:text-gray-300 mb-6">
                Please log in securely to create your personalized trip plan.
              </DialogDescription>
            </DialogHeader>
            {/* Sign-in Button */}
            <div className="flex justify-center">
              <Button
                onClick={login}
                className="flex items-center gap-2 bg-black dark:bg-[#232323] text-white dark:text-white px-6 py-3 rounded-2xl hover:bg-white/5 hover:text-black dark:hover:text-black dark:hover:bg-white transition-transform transform hover:scale-105 hover:shadow-md hover:shadow-stone-900"
              >
                <FaGoogle />
                Signin With Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}

export default CreateTrip;
