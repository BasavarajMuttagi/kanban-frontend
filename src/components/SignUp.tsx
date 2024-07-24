import { useForm } from "react-hook-form";
import { userSignUpSchema, userSignUpType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import apiClient from "../axios/apiClient";
import toast from "react-hot-toast";
import { useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [isSpin, setIsSpin] = useState(false);
  const [isSpinGoogle, setIsSpinGoogle] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userSignUpType>({
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit = async (data: userSignUpType) => {
    try {
      await apiClient.post("/auth/signup", data);
      toast.success("Successfully signed up");
      reset();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSpin(false);
    }
  };

  const googleLogin = async () => {
    try {
      setIsSpinGoogle(true);
      await apiClient.get("/auth/google");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSpinGoogle(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 border-blue-500 border rounded-md shadow max-w-md w-full py-10 px-4">
      <h1 className="font-bold text-2xl">Sign Up</h1>
      <form className="space-y-7 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            {...register("firstname")}
            placeholder="First Name"
            className="w-full p-2 rounded-md outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.firstname && (
            <p className="text-red-400 text-xs absolute">
              {errors.firstname?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("lastname")}
            placeholder="Last Name"
            className="w-full p-2 rounded-md outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.lastname && (
            <p className="text-red-400 text-xs absolute">
              {errors.lastname?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 rounded-md outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.email && (
            <p className="text-red-400 text-xs absolute">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 rounded-md outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.password && (
            <p className="text-red-400 text-xs absolute">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            {...register("confirmpassword")}
            placeholder="Confirm password"
            className="w-full p-2 rounded-md outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.confirmpassword && (
            <p className="text-red-400 text-xs absolute">
              {errors.confirmpassword?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-500 text-white w-full font-semibold tracking-wider flex items-center justify-center space-x-2 hover:brightness-90"
        >
          <p>Sign up</p>
          {isSpin && <CircleNotch size={18} className="animate-spin" />}
        </button>
      </form>
      <div className="flex items-center space-x-2">
        <p>Already have an account ?</p>
        <Link
          to="/login"
          className="text-blue-500 font-semibold hover:text-blue-400"
        >
          Login
        </Link>
      </div>

      <button
        disabled={isSpinGoogle}
        onClick={() => googleLogin()}
        className="px-3 py-2 rounded-md  text-neutral-900 border border-neutral-500 w-full font-semibold tracking-wider flex space-x-1 items-center justify-center hover:bg-neutral-100"
      >
        <span>Sign up with</span>
        <img src={google} alt="google icon" className="aspect-square w-7" />
      </button>
    </div>
  );
};

export default SignUp;
