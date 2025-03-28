import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Components/Root";
import HomePage from "./Components/Homepage";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import { loader as Authchecker } from "./utils/AuthChecker";
import ForgotPassword from "./Components/ForgotPassword";
import SymptomDashboard from "./Components/SymptomDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "Login",
          element: <Login />,
        },
        {
          path: "Signup",
          element: <Signup />,
        },
        {
          path:"Forgot",
          element:<ForgotPassword/>
        },{
          path:"SymptomDashboard",
          element:<SymptomDashboard/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
