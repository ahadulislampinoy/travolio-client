import { createBrowserRouter } from "react-router-dom";
import AddCountry from "../Components/Dashboard/AddCountry";
import RemoveCountry from "../Components/Dashboard/RemoveCountry";
import UpdateCost from "../Components/Dashboard/UpdateCost";
import Welcome from "../Components/Dashboard/Welcome";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Components/Home/Home";
import SingleCountry from "../Components/Tool1/SingleCountry";
import Tool1 from "../Components/Tool1/Tool1";
import Tool2 from "../Components/Tool2/Tool2";
import DashboardLayout from "../Layout/DashboardLayout";
import Layout from "../Layout/Layout";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/tool1",
        element: (
          <PrivateRoute>
            <Tool1 />
          </PrivateRoute>
        ),
      },
      {
        path: "/country/:country_name",
        element: (
          <PrivateRoute>
            <SingleCountry />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_server_url}/allcountrydetails/${params?.country_name}`
          ),
      },
      {
        path: "/tool2",
        element: (
          <PrivateRoute>
            <Tool2 />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "/dashboard/updatecost",
        element: (
          <AdminRoute>
            <UpdateCost />,
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addcountry",
        element: (
          <AdminRoute>
            <AddCountry />,
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/removecountry",
        element: (
          <AdminRoute>
            <RemoveCountry />,
          </AdminRoute>
        ),
      },
    ],
  },
]);
