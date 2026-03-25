import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { verifyUser, user } = useAuth();
  useEffect(() => {
    console.log(user);

    verifyUser();
    console.log(user);
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
