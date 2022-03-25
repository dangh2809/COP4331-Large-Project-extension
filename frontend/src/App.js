import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path ="/userPage" exact>
          <UserPage />
        </Route>
        <Route path="/emailVerify">
          <EmailVerifyPage/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
