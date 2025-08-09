import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router";
import { ArrowLeft, Heart, Mail } from "lucide-react";
import { forgotPassword } from "../utils/api";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);
      const res = await forgotPassword(email);
      toast.success(res?.message || "Password reset email sent!");
      setIsSubmitted(true);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[#4eac6d]">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="p-6 pb-0 lg:p-12 flex flex-col lg:h-screen h-full">
            <Logo />
            <div className="md:mt-auto mt-0 hidden lg:block">
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
                <div className="w-full lg:w-2/5">
                  <div className="md:py-1 py-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl text-[#495057] font-semibold">
                        Reset Password
                      </h3>
                      <p className="text-[#495057]/60 mt-1">
                        Reset your Password with Crypchat.
                      </p>
                    </div>

                    <div className="alert text-center mb-7" role="alert">
                      Enter your Email and instructions will be sent to you!
                    </div>
                    {!isSubmitted ? (
                      <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700 ">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        {/* Reset Password Button */}
                        <button
                          type="submit"
                          className="btn w-full bg-[#4eac6d] border-none text-white text-[16px] hover:bg-[#479d64]"
                        >
                          {isLoading ? (
                            <span className="loading loading-spinner text-white"></span>
                          ) : (
                            "Send Reset Link"
                          )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-3">
                          <hr className="flex-grow border-gray-300" />
                          <span className="text-sm text-gray-500">Or</span>
                          <hr className="flex-grow border-gray-300" />
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <Mail className="h-8 w-8" />
                        <p className="my-2 text-base-content">
                          If an account exists for {email}, you will receive a
                          password reset link shortly.
                        </p>
                        <p className="text-base-content mt-2">
                          If you don't see it in your inbox, please check your
                          Spam or Junk folder.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="px-8 py-4 flex justify-center">
                    <Link
                      to={"/login"}
                      className="text-sm text-green-600 hover:underline flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center whitespace-nowrap text-center">
                <p className="mb-5 flex items-center whitespace-nowrap text-xs sm:text-sm">
                  © 2025 Crypchat. Created with{" "}
                  <Heart className="text-red-700 -mb-1 lg:mb-0.5 mx-1" size={16} />
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

export default ForgotPasswordPage;
