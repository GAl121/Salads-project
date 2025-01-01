import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Products from "./pages/Products";
import Trivia from "./pages/Trivia";
import CreateNewSalad from "./pages/CreateNewSalad";
import MainLayout from "./layouts/MainLayout";
import CreateNewIngredient from "./pages/CreateNewIngredient";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Products /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/new-ingredient",
        element: <CreateNewIngredient />,
      },
      {
        path: "/new-salad",
        element: <CreateNewSalad />,
      },
      {
        path: "/trivia",
        element: <Trivia />,
      },
    ],
  },
]);

const PagesRouter = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default PagesRouter;
