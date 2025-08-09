import React, { useState } from "react";
import { Link } from "react-router";
import { Heart, Eye, EyeOff } from "lucide-react";
import Logo from "../components/Logo";
import useSignUp from "../hooks/useSignUp";
import usePasswordToggleVisibility from "../hooks/usePasswordToggleVisibility";

const SignUpPage = () => {
  const {showPassword, togglePasswordVisibility} = usePasswordToggleVisibility()
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupMutation, isPending, error } = useSignUp();

  const handleSignUp = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };


  return (
    <div className="min-h-screen bg-cover bg-center bg-[#4eac6d]">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="p-6 pb-0 lg:p-12 flex flex-col h-screen">
            <Logo />
            <div className="mt-auto">
              <img
                src="/assets/img/auth-img.png"
                alt="auth"
                className="relative max-w-[200%]"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="rounded-2xl m-4 bg-white  xl:h-[calc(100vh-35px)] lg:h-[calc(100vh-5px)]">
            <div className="flex flex-col h-full pt-5 px-6">
              <div className="flex justify-center my-auto">
                <div className="w-2/5">
                  <div className="md:py-1 py-6">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl text-[#495057] font-semibold">
                        Register Account
                      </h3>
                      <p className="text-[#495057]/60 mt-1">
                        Get your free Crypchat account now.
                      </p>
                    </div>
                    <form className="space-y-5" onSubmit={handleSignUp}>
                      {/* full name */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder=" Enter Full Name"
                          value={signupData.fullName}
                          className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={signupData.email}
                          className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Password
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={signupData.password}
                            className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </span>
                        </div>

                        <div className="form-control">
                          <label className="label cursor-pointer justify-start gap-2">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm"
                              required
                            />
                            <span className="text-xs leading-tight">
                              I agree to the{" "}
                              <span className="text-primary hover:underline">
                                terms of service
                              </span>{" "}
                              and{" "}
                              <span className="text-primary hover:underline">
                                privacy policy
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* ERROR MESSAGE IF ANY */}
                      {error && (
                        <div className="alert alert-error mb-3">
                          <span>{error.response.data.message}</span>
                        </div>
                      )}

                      {/* Register Button */}
                      <button
                        type="submit"
                        className="btn w-full bg-[#4eac6d] border-none text-white text-[16px] hover:bg-[#479d64]"
                      >
                        {isPending ? (
                          <span className="loading loading-spinner text-white"></span>
                        ) : (
                          "Register"
                        )}
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-4 my-3">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-sm text-gray-500">Or</span>
                        <hr className="flex-grow border-gray-300" />
                      </div>

                      {/* Login Link */}
                      <p className="text-center text-sm text-gray-600 mt-3">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-green-600 font-medium hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center ">
                <p className="mb-5 flex items-end text-center">
                  © 2025 Crypchat. Created with
                  <Heart className="text-red-700 mb-0.5 mx-1" size={16} />
                  by Mohd Aquib
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
