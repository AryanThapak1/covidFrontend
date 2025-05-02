import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Components/Root";
import HomePage from "./Components/Homepage";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import { loader as Authchecker } from "./utils/AuthChecker";
import ForgotPassword from "./Components/ForgotPassword";
import SymptomDashboard from "./Components/SymptomDashboard";
import Reports from "./Components/Reports";
import ReportDetails from "./Components/ReportDetails";
import ChatBox from "./Components/ChatBox";

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
        },{
          path:"Reports",
          element:<Reports/>
        },{
          path:'Reports/:id',
          element:<ReportDetails/>
        },{
          path:"ChatBot",
          element:<ChatBox/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
