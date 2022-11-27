import "./App.css";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
  useNavigate,
} from "react-router-dom";
import DataForm from "./components/DataForm";
import PrivateRoute from "./components/PrivateRoute";
// import DataTable from "./components/DataTable";
import { useParams } from "react-router-dom";
import SingleUser from "./components/SingleUser";
import { useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.user);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DataForm />
              </PrivateRoute>
            }
          />
          <Route
            path={`/dashboard/:id`}
            element={<SingleUser users={users} />}
          />
        </Routes>
      </div>
      {/* <PrivateRoute /> */}
    </Router>
  );
}

export default App;
