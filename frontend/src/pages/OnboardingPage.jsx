import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../utils/api";
import { LANGUAGES } from "../constants";
import Logo from "../components/Logo";
import { MapPin, Heart, ShipWheel, Shuffle } from "lucide-react";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const {
    mutate: onboardingMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error(error.response.data.message);
    },
  });

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleAvatarGenerate = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar generated successfully");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[#4eac6d]">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="p-6 pb-0 lg:p-12 flex flex-col h-screen">
            {/* Logo */}
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
                <div>
                  <div className="md:py-1 py-6">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl text-[#495057] font-semibold">
                        Complete Your Profile
                      </h3>
                      <p className="text-[#495057]/60 mt-1">
                        Complete your profile to start using CrypChat
                      </p>
                    </div>
                    <form
                      className="space-y-4"
                      onSubmit={handleOnboardingSubmit}
                    >
                      {/* Profie Pic */}
                      <div className="flex flex-col items-center justify-center space-y-3">
                        {/* Image Priview */}
                        <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                          {formState.profilePic ? (
                            <img
                              src={formState.profilePic}
                              alt="profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Camera className="size-12 text-base-content opacity-40" />
                            </div>
                          )}
                        </div>
                        {/* Generate random avatar button */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-accent"
                            onClick={handleAvatarGenerate}
                          >
                            <Shuffle className="size-4 mr-1" />
                            Generate Random Avatar
                          </button>
                        </div>
                      </div>

                      {/* full name */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 ">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="  Full Name"
                          value={formState.fullName}
                          className="w-full text-gray-500 bg-transparent px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              fullName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="label">
                          <span className="label-text font-medium">Bio</span>
                        </label>
                        <textarea
                          placeholder="Tell others about yourself and your interests"
                          value={formState.bio}
                          className="textarea textarea-bordered h-24 w-full resize-none"
                          onChange={(e) =>
                            setFormState({ ...formState, bio: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Languages */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Native language */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Native Language
                            </span>
                          </label>
                          <select
                            name="nativeLanguage"
                            className="select select-bordered w-full"
                            value={formState.nativeLanguage}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                nativeLanguage: e.target.value,
                              })
                            }
                          >
                            <option>Select your native language</option>
                            {LANGUAGES.map((lang) => (
                              <option
                                key={`native-${lang}`}
                                value={lang.toLowerCase()}
                              >
                                {lang}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Learning Language */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Learning Language
                            </span>
                          </label>
                          <select
                            name="learningLanguage"
                            className="select select-bordered w-full"
                            value={formState.learningLanguage}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                learningLanguage: e.target.value,
                              })
                            }
                          >
                            <option>Select language you're learning</option>
                            {LANGUAGES.map((lang) => (
                              <option
                                key={`native-${lang}`}
                                value={lang.toLowerCase()}
                              >
                                {lang}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            {" "}
                            Location
                          </span>
                        </label>
                        <div className="relative">
                          <MapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                          <input
                            type="text"
                            placeholder="City, Country"
                            value={formState.location}
                            className="input input-bordered w-full pl-10"
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                location: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* ERROR MESSAGE IF ANY */}
                      {/* {error && (
                        <div className="alert alert-error mb-3">
                          <span>{error.response.data.message}</span>
                        </div>
                      )} */}

                      {/* Onboarding Button */}
                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <span className="loading loading-spinne"></span>
                        ) : (
                          <>
                            <ShipWheel className="size-4" />
                            Complete Onboarding
                          </>
                        )}
                      </button>
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

export default OnboardingPage;
