import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
