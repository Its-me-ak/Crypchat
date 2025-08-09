import React, { useState } from "react";
import Logo from "../components/Logo";
import { EyeOff, Eye, Heart } from "lucide-react";
import { resetPassword } from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import usePasswordToggleVisibility from "../hooks/usePasswordToggleVisibility";

const ResetPasswordPage = () => {
  const {showPassword, showConfirmPassword, togglePasswordVisibility, toggleConfirmPasswordVisibility} = usePasswordToggleVisibility()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setIsLoading(true);
    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    } finally {
      setIsLoading(false);
    }
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
                        Change Password
                      </h3>
                      <p className="text-[#495057]/60 mt-1"></p>
                    </div>
                    {/* <div className="flex flex-col items-center">
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img
                            src={authUser.profilePic}
                            alt={authUser.fullName}
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-base-content my-2">
                        {authUser.fullName}
                      </h3>
                    </div> */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      {/* New Password */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            New Password
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <span
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <Eye
                                size={18}
                              />
                            ) : (
                              <EyeOff
                                size={18}
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={confirmPassword}
                            className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <span
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
                              <Eye
                                size={18}
        
                              />
                            ) : (
                              <EyeOff
                                size={18}
                            
                              />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Set Password Button */}
                      <button
                        type="submit"
                        className="btn w-full bg-[#4eac6d] border-none text-white text-[16px] hover:bg-[#479d64]"
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner text-white"></span>
                        ) : (
                          "Set New Password"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center ">
                <p className="mb-5 flex items-end text-center">
                  © 2025 Crypchat. Created with{" "}
                  <Heart className="text-red-700 mb-1 mx-0.5" size={16} />
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

export default ResetPasswordPage;
