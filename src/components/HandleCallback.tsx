import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useKanbanStore from "../store";
import { jwtDecode } from "jwt-decode";
import { tokenType } from "../routes/Private";

const HandleCallback = () => {
  const { setDisplayName, setToken } = useKanbanStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as tokenType;
        setToken(token);
        setDisplayName(decodedToken.name);
        navigate("/", { replace: true });
        location.reload();
      } catch (error) {
        navigate("/login", {
          state: { error: "Authentication failed. Please try again." },
          replace: true,
        });
      }
    } else {
      console.error("No token found in URL");
      navigate("/login", {
        state: {
          error: "No authentication token found. Please try again.",
          replace: true,
        },
      });
    }
  }, [searchParams, setToken, setDisplayName, navigate]);

  return (
    <div className="h-screen w-full text-neutral-600 flex items-center justify-center text-lg font-medium">
      <div>Processing authentication...</div>
    </div>
  );
};

export default HandleCallback;
