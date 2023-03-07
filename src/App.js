import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { StatisticsPage } from "./components/pages/StatisticsPage";
import { FormValidationPage } from "./components/pages/FormValidationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "results",
    element: <StatisticsPage />,
  },
  {
    path: "validate-form",
    element: <FormValidationPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
