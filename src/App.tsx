import { Switch } from "react-router-dom";
import AuthProvider from "components/AuthProvider";
import Register from "pages/register";
import { PrivateRoute, PublicRoute } from "components/Route";
import Login from "pages/login";
import Profile from "pages/profile";
import Home from "pages/home";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <PublicRoute exact path="/">
          <Home />
        </PublicRoute>
        <PublicRoute restricted path="/register">
          <Register />
        </PublicRoute>
        <PublicRoute exact restricted path="/login">
          <Login />
        </PublicRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
      </Switch>
    </AuthProvider>
  );
}

export default App;
