// src/components/Navbar.jsx

import React, { useEffect, useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiLogin, CiLogout } from "react-icons/ci";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FaGoogle, FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loginDialogue, setLoginDialogue] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => {
      console.log(err);
      toast(
        <div className="flex items-center">
          <CiLogin className="mr-2 text-xl" />
          <span>Login failed. Please try again.</span>
        </div>,
        {
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        }
      );
    },
  });

  const getUserProfile = (tokenInfo) => {
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
        toast(
          <div className="flex items-center">
            <CiLogin className="mr-2 text-xl" />
            <span>Logged In successfully!!!</span>
          </div>,
          {
            style: {
              backgroundColor: "#ffffff",
              color: "#000000",
            },
          }
        );
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        toast(
          <div className="flex items-center">
            <CiLogin className="mr-2 text-xl text-red-500" />
            <span>Failed to fetch user profile.</span>
          </div>,
          {
            style: {
              backgroundColor: "#ffffff",
              color: "#000000",
            },
          }
        );
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav className="flex justify-between items-center p-5 sticky top-0 z-50 bg-background text-foreground shadow-lg dark:shadow-white/5">
      {/* Logo and Home Link */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h1 className="font-semibold sm:text-3xl text-xl dark:text-[#ffff] tracking-widest">
              <Link to="/">eXpLoRa</Link>
            </h1>
          </TooltipTrigger>
          <TooltipContent className="border-0 rounded-xl bg-transparent p-2">
            <p className="dark:text-white">Go To Home Page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* User Actions */}
      <div className="flex gap-4 items-center">
        <div>
          {user ? (
            <div className="flex gap-3 items-center">
              {/* My Trips Button */}
              <Link to={"/my-trips"}>
                <Button
                  className="rounded-full dark:text-white border-black dark:border-white"
                  variant="outline"
                >
                  My Trips
                </Button>
              </Link>
              {/* Logout Alert Dialog */}
              <AlertDialog>
                <AlertDialogTrigger>
                  {user?.picture ? (
                    <img
                      src={`${user?.picture}?time=${new Date().getTime()}`}
                      className="h-10 inline-block rounded-full border-2 border-white"
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "images.png"; // Fallback image
                      }}
                    />
                  ) : (
                    <FaRegUserCircle />
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white w-1/2 md:w-full">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure to Log Out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will temporarily log out your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-black text-white rounded-3xl">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-black text-white rounded-3xl flex items-center gap-2"
                      onClick={() => {
                        googleLogout();
                        toast(
                          <div className="flex items-center">
                            <CiLogin className="mr-2 text-xl text-green-500" />
                            <span>Logged out successfully!!</span>
                          </div>,
                          {
                            style: {
                              backgroundColor: "#ffffff",
                              color: "#000000",
                            },
                          }
                        );
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Log Out <FaPowerOff />
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Button
              className="shadow-lg h-8 bg-black text-white dark:bg-[#2e2e2e] dark:text-white rounded-2xl flex items-center gap-2"
              onClick={() => setLoginDialogue(true)}
            >
              <CiLogin className="text-xl" />
              Sign In
            </Button>
          )}

          {/* Login Dialog */}
          <Dialog open={loginDialogue} onOpenChange={setLoginDialogue}>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-extrabold text-center mb-4">
                  <span className="font-normal text-lg">Welcome To</span>{" "}
                  eXpLoRa
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
                  Sign in with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent className="border-0 rounded-xl bg-transparent p-2">
              <p className="dark:text-white">Change Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
}

export default Navbar;
