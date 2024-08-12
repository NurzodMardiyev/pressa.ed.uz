import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/kirish/Login";
import LandingPage from "./components/main/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="auth" element={<Login />} />
          <Route path="statistics" element={<LandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
