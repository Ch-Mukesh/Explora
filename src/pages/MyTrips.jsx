// src/pages/MyTrips.jsx

import React, { useEffect, useState } from "react";
import { db } from "@/Services/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import TripCard from "@/components/custom/TripCard";
import { FaRegCalendarAlt, FaMoneyBillWave, FaUsers, FaHistory } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.email) {
      fetchTrips();
    } else {
      toast("You need to log in to view your trips.", {
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      });
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTrips = async () => {
    try {
      const tripsRef = collection(db, "plannedTrips");
      const q = query(
        tripsRef,
        where("userEmail", "==", user.email)
          );
      const querySnapshot = await getDocs(q);
      const tripsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tripsData);
      
      setTrips(tripsData);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast("Failed to fetch trips.", {
        style: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex flex-col gap-10 justify-center items-center min-h-screen p-8 lg:p-10">
        <h1 className="text-4xl font-semibold text-black dark:text-gray-200 flex items-center">
          <FiLoader className="animate-spin mr-3 inline-block" />
          Loading...
        </h1>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="container mx-auto flex flex-col gap-10 justify-center items-center min-h-screen p-8 lg:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          You have no trips planned yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 lg:p-10 bg-background-50 dark:bg-background-900 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-text-800 dark:text-white mb-2">
          Your Past Trips <FaHistory className="inline-block ml-2" />
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Review your adventures and memories.
        </p>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
