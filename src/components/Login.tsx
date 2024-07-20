import { useForm } from "react-hook-form";
import { userLoginSchema, userLoginType } from "../zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import google from "../assets/google.png";
const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
  });

  const submitHandler = (data: userLoginType) => {
    console.log(data);
    reset();
  };
  return (
    <div className="max-w-md flex flex-col items-center space-y-8 border-blue-500 border rounded-md shadow  w-full py-10 px-4">
      <h1 className="font-bold text-2xl">Login</h1>
      <form className="space-y-7 w-full" onSubmit={handleSubmit(submitHandler)}>
        <div className="relative">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 rounded-sm outline-none border border-neutral-400/80 text-neutral-500 font-medium"
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
            className="w-full p-2 rounded-sm outline-none border border-neutral-400/80 text-neutral-500 font-medium"
          />
          {errors.password && (
            <p className="text-red-400 text-xs absolute">
              {errors.password?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="px-3 py-2 rounded-sm bg-blue-500 text-white w-full font-semibold tracking-wider hover:brightness-90"
        >
          Login
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

      <button className="px-3 py-2 rounded-sm  text-neutral-900 border border-neutral-500 w-full font-semibold tracking-wider flex space-x-1 items-center justify-center hover:bg-neutral-100">
        <span>Login with</span>
        <img src={google} alt="google icon" className="aspect-square w-7" />
      </button>
    </div>
  );
};

export default Login;
