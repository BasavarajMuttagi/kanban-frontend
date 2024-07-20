// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import useCoffeeStore from "../store";

// type tokenType = {
//   userId: string;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
// };
// function Private() {
//   const token = useCoffeeStore((e) => e.token);
//   const setToken = useCoffeeStore((e) => e.setToken);

//   if (!token) {
//     return <Navigate to={"/login"} />;
//   }

//   const decoded = jwtDecode(token) as tokenType;

//   const expirationTime = new Date(decoded.exp * 1000);
//   const currentTime = new Date();

//   if (currentTime > expirationTime) {
//     setToken("");
//     return <Navigate to={"/login"} />;
//   }

//   return <Outlet />;
// }

// export default Private;
