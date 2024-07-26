import { useForm } from "react-hook-form";
import { userLoginSchema, userLoginType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import { useEffect, useState } from "react";
import useKanbanStore from "../store";
import apiClient from "../axios/apiClient";
import toast from "react-hot-toast";
import { CircleNotch } from "@phosphor-icons/react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setDisplayName, setEmail } = useKanbanStore();
  const [isSpin, setIsSpin] = useState(false);
  const [isSpinGoogle, setIsSpinGoogle] = useState(false);

  const loc = useLocation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (data: userLoginType) => {
    try {
      setIsSpin(true);
      const res = await apiClient.post("/auth/login", data);
      toast.success(res.data.message);
      setToken(res.data.token);
      setDisplayName(res.data.user.fullname);
      setEmail(res.data.user.email);
      navigate("/", { replace: true });
      location.reload();
      reset();
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

  useEffect(() => {
    const state = loc.state;
    if (state && state.error) {
      toast.error(state.error);
    }
  }, [loc]);

  const googleLogin = async () => {
    try {
      setIsSpinGoogle(true);
      const response = await apiClient.get("/auth/google");
      window.open(response.data.authUrl, "_self");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSpinGoogle(false);
    }
  };
  return (
    <div className="max-w-md flex flex-col items-center space-y-8 border-blue-500 border rounded-md shadow  w-full py-10 px-4">
      <h1 className="font-bold text-2xl">Login</h1>
      <form className="space-y-7 w-full" onSubmit={handleSubmit(onSubmit)}>
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
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-500 text-white w-full font-semibold tracking-wider flex items-center justify-center space-x-2 hover:brightness-90"
        >
          <p>Login</p>
          {isSpin && <CircleNotch size={18} className="animate-spin" />}
        </button>
      </form>
      <div className="flex items-center space-x-2">
        <p>Don't have an account ?</p>
        <Link
          to="/signup"
          className="text-blue-500 font-semibold hover:text-blue-400"
        >
          Signup
        </Link>
      </div>

      <button
        disabled={isSpinGoogle}
        onClick={() => googleLogin()}
        className="px-3 py-2 rounded-md  text-neutral-900 border border-neutral-500 w-full font-semibold tracking-wider flex space-x-1 items-center justify-center hover:bg-neutral-100"
      >
        <span>Login with</span>
        <img src={google} alt="google icon" className="aspect-square w-7" />
      </button>
    </div>
  );
};

export default Login;
