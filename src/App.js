import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./components/main/LandingPage";
import Profile from "./components/profile/Profile";
import AuthSignUp from "./components/kirish/AuthSignUp";
import Talaba from "./components/profile/ProfilePage";
import UzMap from "./components/uzmap/UzMap";

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
import AdminKorzinka from "./pages/superAdminPanel/AdminKorzinka";
import AdminDashboard from "./pages/superAdminPanel/AdminDashboard";
import MediaProjects from "./components/EmployeePost/mediaProjects/MediaProjects";
import LevelIllumination from "./components/EmployeePost/levelIllumination/LevelIllumination";
import NotFountPage from "./pages/notfound/NotFountPage";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import RePassword from "./pages/forgetPassword/RePassword";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="signup" element={<AuthSignUp />} />
        <Route path="/detailsinfo" element={<DetailsInfo />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/repassword" element={<RePassword />} />
        <Route path="/superadminpanel" element={<SuperAdmin />}>
          <Route path="allemployees" element={<AllEmployeers />} />
          <Route path="televediniye" element={<Televediniye1 />} />
          <Route path="radio" element={<RadioTV />} />
          <Route path="internet_sites" element={<InternetSitesJS />} />
          <Route path="oav" element={<OAVjs />} />
          <Route path="messenger" element={<MessengersJS />} />
          <Route path="onlayn_efir" element={<OnlineEfir />} />
          <Route path="matbuot_anjumani" element={<MatbuotAnjumaniJS />} />
          <Route path="brifing" element={<Brifing />} />
          <Route path="press_tur" element={<PressTur />} />
          <Route path="addemployees" element={<AddEmployees />} />
          <Route path="korzinka" element={<AdminKorzinka />} />
          <Route path="dashboard" element={<AdminDashboard />} />
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
          <Route path="/mediaprojects" element={<MediaProjects />} />
          <Route path="/levelIllumination" element={<LevelIllumination />} />
          <Route path="/trashbox" element={<Korzinka />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="statistics" element={<LandingPage />} />
        </Route>
        <Route path="*" element={<NotFountPage />} />
      </Routes>
    </div>
  );
}

export default App;
