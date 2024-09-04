import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./components/main/LandingPage";
import Profile from "./components/profile/Profile";
import AuthSignUp from "./components/kirish/AuthSignUp";
import Talaba from "./components/profile/ProfilePage";
import UzMap from "./components/uzmap/UzMap";
import AuthEmployee from "./components/kirish/AuthEmployee";

// Prime React
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // PrimeReact
import "primeicons/primeicons.css"; // icon
import EmployeePanel from "./pages/employee/EmployeePanel";
import Televediniye from "./components/tele-radie/Teleradio";
import Radio from "./components/radio/Radio";
import InternetSites from "./components/internet_sites/InternetSites";
import OAV from "./components/oav/OAV";
import Messengers from "./components/messengers/Messengers";
import Brifing from "./components/brifing/Brifing";
import MatbuotAnjumani from "./components/matbuotAnjumani/Matbuot_anjumani";
import PressTur from "./components/pressTur/PressTur";
import Infografika from "./components/infografika/Infografika";
import Audio from "./components/audio/Audio";
import Video from "./components/video/Video";
import BoshSahifa from "./components/boshSahifa/BoshSahifa";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="signup" element={<AuthSignUp />} />
        <Route path="authemployee" element={<AuthEmployee />} />
        <Route path="/" element={<EmployeePanel />}>
          <Route path="/televediniye" element={<Televediniye />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/internet_sites" element={<InternetSites />} />
          <Route path="/oav" element={<OAV />} />
          <Route path="/messenger" element={<Messengers />} />
          <Route path="/matbuot_anjumani" element={<MatbuotAnjumani />} />
          <Route path="/brifing" element={<Brifing />} />
          <Route path="/press_tur" element={<PressTur />} />
          <Route path="/infografika" element={<Infografika />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/video" element={<Video />} />
          <Route path="/dashboard" element={<BoshSahifa />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="statistics" element={<LandingPage />} />
          <Route path="/nurzodmardiyev" element={<Profile />} />
          <Route path="talaba" element={<Talaba />} />
          <Route path="/uzmap" element={<UzMap />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
