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
// import Televediniye from "./components/EmployeePost/tele-radie/Teleradio";
import Brifing from "./components/EmployeePost/brifing/Brifing";
import PressTur from "./components/EmployeePost/pressTur/PressTur";
import Audio from "./components/EmployeePost/audio/Audio";
import Video from "./components/EmployeePost/video/Video";
import BoshSahifa from "./components/EmployeePost/boshSahifa/BoshSahifa";
import DetailsInfo from "./components/kirish/DetailsInfo";
import Televediniye1 from "./components/EmployeePost/tele-radie/Telvideniya";
import Infografika from "./components/EmployeePost/infografika/Infografika";
import RadioTV from "./components/EmployeePost/radio/RadioTv";
import OAVjs from "./components/EmployeePost/oav/OAVjs";
import InternetSitesJS from "./components/EmployeePost/internet_sites/InternetSitesJS";
import MessengersJS from "./components/EmployeePost/messengers/MessangerJS";
import MatbuotAnjumaniJS from "./components/EmployeePost/matbuotAnjumani/MatbuotAnjumani";
import OnlineEfir from "./components/EmployeePost/online_efir/OnlineEfir";
import Telegram from "./components/EmployeePost/telegram/Telegram";
import SideBarAnt from "./components/sidebar/SideBarAnt";
import SuperAdmin from "./pages/superAdminPanel/SuperAdmin";
import Korzinka from "./components/karzinka/Korzinka";
import Organization from "./components/EmployeePost/organization/Organization";
import AllEmployeers from "./pages/superAdminPanel/AllEmployeers";
import AddEmployees from "./pages/superAdminPanel/AddEmployees";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="signup" element={<AuthSignUp />} />
        <Route path="authemployee" element={<AuthEmployee />} />
        <Route path="/detailsinfo" element={<DetailsInfo />} />
        <Route path="/superadminpanel" element={<SuperAdmin />}>
          <Route path="allemployees" element={<AllEmployeers />} />
          <Route path="addemployees" element={<AddEmployees />} />
        </Route>
        <Route path="/" element={<EmployeePanel />}>
          <Route path="/televediniye" element={<Televediniye1 />} />
          <Route path="/radio" element={<RadioTV />} />
          <Route path="/internet_sites" element={<InternetSitesJS />} />
          <Route path="/oav" element={<OAVjs />} />
          <Route path="/messenger" element={<MessengersJS />} />
          <Route path="/matbuot_anjumani" element={<MatbuotAnjumaniJS />} />
          <Route path="/brifing" element={<Brifing />} />
          <Route path="/press_tur" element={<PressTur />} />
          <Route path="/infografika" element={<Infografika />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/video" element={<Video />} />
          <Route path="/onlayn_efir" element={<OnlineEfir />} />
          <Route path="/dashboard" element={<BoshSahifa />} />
          <Route path="/telegram" element={<Telegram />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/trashbox" element={<Korzinka />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="statistics" element={<LandingPage />} />
          <Route path="talaba" element={<Talaba />} />
          <Route path="/uzmap" element={<UzMap />} />
          <Route path="/tekshir" element={<SideBarAnt />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
