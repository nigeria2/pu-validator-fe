import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
// import { StatisticsPage } from "./components/pages/StatisticsPage";
import ProtectedRoute from "./utilityComponents";
import { LoginPage } from "./components/pages/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FormValidationPage } from "./components/pages/FormValidationPage";
import { ResultUnavailablePage } from "./components/pages/ResultUnavailablePage";
import { TranscriptionV2Page } from "./components/pages/TranscriptionV2Page";

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
    element: <ResultUnavailablePage />,
    // element: <StatisticsPage />,
  },
  {
    path: "/transcribev2",
    element: (
      <ProtectedRoute>
        <TranscriptionV2Page />
      </ProtectedRoute>
    ),
  },
  {
    path: "/validators",
    element: (
      <ProtectedRoute>
        <FormValidationPage />
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
