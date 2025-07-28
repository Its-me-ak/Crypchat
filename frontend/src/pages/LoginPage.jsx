import { Link } from "react-router";
import Logo from "../components/Logo";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
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
                        Welcome Back !
                      </h3>
                      <p className="text-[#495057]/60 mt-1">
                        Sign in to continue to Crypchat.
                      </p>
                    </div>
                    <form className="space-y-5" onSubmit={handleLogin}>
                      {/* Email */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          value={loginData.email}
                          className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
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
                          <Link
                            href="#"
                            className="text-sm text-gray-500 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="Enter Password"
                            value={loginData.password}
                            className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            required
                          />
                          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                            <Eye size={18} />
                          </span>
                        </div>
                      </div>

                      {/* ERROR MESSAGE IF ANY */}
                      {error && (
                        <div className="alert alert-error mb-3">
                          <span>{error.response.data.message}</span>
                        </div>
                      )}

                      {/* Login Button */}
                      <button
                        type="submit"
                        className="btn w-full bg-[#4eac6d] border-none text-white text-[16px] hover:bg-[#479d64]"
                      >
                        {isPending ? (
                          <span className="loading loading-spinner text-white"></span>
                        ) : (
                          "Login"
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
                        Don't have an account?{" "}
                        <Link
                          to="/signup"
                          className="text-green-600 font-medium hover:underline"
                        >
                          Register
                        </Link>
                      </p>
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

export default LoginPage;
