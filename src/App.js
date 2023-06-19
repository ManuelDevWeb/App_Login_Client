import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import { Username } from "./components/Username";
import { Password } from "./components/Password";
import { Profile } from "./components/Profile";
import { Recovery } from "./components/Recovery";
import { Register } from "./components/Register";
import { Reset } from "./components/Reset";
import { PageNotFound } from "./components/PageNotFound";

// Middleware component
import { Authorizer, ProtectRoute } from "./middleware/auth";

// Routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <Authorizer>
        <Profile />
      </Authorizer>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  // If no route matches, render the PageNotFound component.
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={routes}></RouterProvider>
    </main>
  );
};

export default App;
