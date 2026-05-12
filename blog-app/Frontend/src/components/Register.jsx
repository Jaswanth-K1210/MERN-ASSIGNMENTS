import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../store/useAuth.js";
import { toast } from "react-hot-toast";

function Register() {
  const { register: registerUser, registerAuthor } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedRole = watch("role", "USER");

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      let success = false;
      if (data.role === "AUTHOR" && data.profileImage?.[0]) {
        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName || "");
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", "AUTHOR");
        formData.append("profileImage", data.profileImage[0]);
        success = await registerAuthor(formData);
      } else {
        let newUser = {
          firstName: data.firstName,
          lastName: data.lastName || "",
          email: data.email,
          password: data.password,
          role: data.role,
        };
        success = await registerUser(newUser);
      }
      if (success) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        const storeError = useAuth.getState().error;
        setError(storeError || "Registration failed. Please try again.");
        toast.error(storeError || "Registration failed.");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred during registration.");
      toast.error("Registration failed.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-200 flex-1 flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Registering...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 flex-1 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
      <div className="w-full max-w-lg p-8">
        <form
          className="flex flex-col items-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Select Role */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xl font-semibold">Select Role</span>
            <label className="flex items-center gap-1 text-lg">
              <input
                type="radio"
                value="USER"
                {...register("role", { required: "Role is required" })}
                defaultChecked
                className="accent-sky-400 w-5 h-5"
              />
              User
            </label>
            <label className="flex items-center gap-1 text-lg">
              <input
                type="radio"
                value="AUTHOR"
                {...register("role", { required: "Role is required" })}
                className="accent-sky-400 w-5 h-5"
              />
              Author
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm -mt-4">{errors.role.message}</p>
          )}

          {/* First name & Last name */}
          <div className="flex gap-4 w-full">
            <div className="flex flex-col w-1/2">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName")}
                className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className="bg-gray-300 p-3 text-center text-lg font-semibold placeholder-gray-600 w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Profile Image - shown for AUTHOR role */}
          {selectedRole === "AUTHOR" && (
            <div className="w-full flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Profile Image (JPG/PNG, max 2MB)</label>
              <input
                type="file"
                accept="image/jpeg,image/png"
                {...register("profileImage")}
                className="bg-gray-300 p-3 text-lg w-full file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-sky-400 file:text-white file:font-semibold file:cursor-pointer"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-sky-400 text-white text-xl font-bold px-8 py-3 rounded mt-2 hover:bg-sky-500 cursor-pointer"
          >
            Register
          </button>

          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-sky-500 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
