import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { StatisticsPage } from "./components/pages/StatisticsPage";
import ProtectedRoute from "./utilityComponents";
import { LoginPage } from "./components/pages/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/results",
    element: <StatisticsPage />,
  },
  {
    path: "/validators",
    element: (
      <ProtectedRoute>
        <StatisticsPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId="92393687539-22riomfdrm15bi7p3vellhe3rqr0nja4.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
