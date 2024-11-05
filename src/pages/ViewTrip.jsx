// src/pages/ViewTrip.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Services/firebaseConfig";
import { toast } from "sonner";
import HotelCard from "@/components/custom/HotelCard";
import ItineraryCard from "@/components/custom/ItineraryCard";
import { FaMapMarkerAlt, FaUserFriends, FaMoneyBillWave,FaRegCalendarAlt,FaGoogle, FaLocationArrow } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import { getPlaceDetails } from "@/Services/GlobalApi";


function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (tripId) {
      getTripData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);


  const getPlacePhoto = async(destination) => {

    const data = {
      textQuery : destination
    }

      const result = await getPlaceDetails(data)
      .then((res)=>console.log(res.data))
  }

 

  async function getTripData() {
    try {
      const docRef = doc(db, "plannedTrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setTripData(data);
        toast("Trip Data Found!", {
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });


        if (data.userPreferences && data.userPreferences.destination) {
          getPlacePhoto(data.userPreferences.destination);
        }



      } else {
        console.log("No such trip!");
        toast("Trip data does not exist!", {
          style: {
            backgroundColor: "#fff",
            color: "#000",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast("Error fetching trip data.", {
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex flex-col gap-10 justify-center items-center min-h-screen p-8 lg:p-10">
        <h1 className="text-4xl font-semibold text-black dark:text-gray-200">
          <FiLoader className="animate-spin mr-3 inline-block"/>Loading...
        </h1>
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="container mx-auto flex flex-col gap-10 justify-center items-center min-h-screen p-8 lg:p-10">
        <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400 animate-bounce">
          Trip not found!!
        </h1>
      </div>
    );
  }

  const { userPreferences, tripData: tripDetails, userEmail, id } = tripData;
  const { destination, days, noOfPeople, budget } = userPreferences;
  const { travelPlan } = tripDetails;
  const { duration, hotels, itinerary } = travelPlan;




  return (
    <div className="container mx-auto p-8 lg:p-10 bg-background-50 dark:bg-background-900 ">
      {/* Trip Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-xl md:text-3xl font-extrabold text-text-800 dark:text-white mb-2">
        Your {destination} Adventure Awaits . .
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
        Specially Curated for {userEmail.split("@")[0]}
        </p>
      </div>

      {/* User Preferences */}
      <div className="flex flex-col gap-5  md:flex-row justify-between items-center bg-white dark:bg-black p-6 rounded-xl shadow-md mb-10">
        <div className="flex items-center mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            <FaMapMarkerAlt className="text-red-600 text-2xl mr-2 inline-block" />Destination
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">{destination}</p>
          </div>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            <FaMoneyBillWave className="text-yellow-500 inline-block  text-2xl mr-2" />Budget
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">{budget}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            <FaUserFriends className="text-purple-500 inline-block  text-2xl mr-2" />Travelers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">{noOfPeople}</p>
          </div>
        </div>
      </div>

      {/* Travel Details */}
      <div className="flex flex-col gap-10">
        {/* Travel Plan */}
        <div>
          <h2 className="text-2xl font-bold text-text-800 dark:text-white mb-4">
            Travel Plan
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Duration */}
            <div className="flex items-center bg-white dark:bg-black p-4 rounded-xl shadow-md">
              <FaRegCalendarAlt className="text-yellow-500  text-3xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Duration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{duration}</p>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Itinerary
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {itinerary.map((dayPlan, index) => (
                  <div key={index} className="bg-white dark:bg-black p-5 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-text-800 dark:text-white mb-2">
                      {dayPlan.day}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      <strong>Best Time to Visit:</strong> {dayPlan.bestTimeToVisit}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {dayPlan.plan.map((place, idx) => (
                        <ItineraryCard key={idx} plan={place} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Hotels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel, index) => (
                  <HotelCard key={index} hotel={hotel} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div>
          <h2 className="text-2xl font-bold text-text-800 dark:text-white mb-4">
            Travel Information
          </h2>
          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="flex items-center">
              <FaLocationArrow className="text-red-600 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{destination}</p>
              </div>
            </div>
            {/* Travelers */}
            <div className="flex items-center">
              <FaUserFriends className="text-purple-500  text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Number of Travellers
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{noOfPeople}</p>
              </div>
            </div>
            {/* Trip ID */}
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Trip ID
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{id}</p>
              </div>
            </div>
            {/* User Email */}
            <div className="flex items-center">
              <FcGoogle className="text-red-500 dark:text-red-300 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  User Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTrip;
