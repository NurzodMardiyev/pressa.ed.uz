import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/profile/Profile";
import AuthSignUp from "./components/kirish/AuthSignUp";

// Prime React
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // PrimeReact
import "primeicons/primeicons.css"; // icon
import EmployeePanel from "./pages/employee/EmployeePanel";
// import Televediniye from "./components/EmployeePost/tele-radie/Teleradio";
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
import SuperAdmin from "./pages/superAdminPanel/SuperAdmin";
import Korzinka from "./components/karzinka/Korzinka";
import Organization from "./components/EmployeePost/organization/Organization";
import AllEmployeers from "./pages/superAdminPanel/AllEmployeers";
import AddEmployees from "./pages/superAdminPanel/AddEmployees";
import MediaProjects from "./components/EmployeePost/mediaProjects/MediaProjects";
import LevelIllumination from "./components/EmployeePost/levelIllumination/LevelIllumination";
import NotFountPage from "./pages/notfound/NotFountPage";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import RePassword from "./pages/forgetPassword/RePassword";
import TelevediniyeAdmin from "./components/EmployeePost/tele-radie/TelevideniyaAdmin";
import RadioTVAdmin from "./components/EmployeePost/radio/RadioTvAdmin";
import OAVjsAdmin from "./components/EmployeePost/oav/OAVjsAdmin";
import InternetSitesJSAdmin from "./components/EmployeePost/internet_sites/InternetSitesJSAdmin";
import MessengersJSAdmin from "./components/EmployeePost/messengers/messangerJSAdmin";
import MatbuotAnjumaniJSAdmin from "./components/EmployeePost/matbuotAnjumani/MatbuotAnjumaniAdmin";
import ProtectedRoute from "./security/ProtectedRoute";
import RoleBasedRoute from "./security/RoleBasedRoute";
import Error from "./pages/serverError/Error";
import Foreign from "./components/EmployeePost/foriegn/Foreign";
import LandingPage from "./pages/userPage/main/LandingPage";
import EditProfile from "./components/profile/EditProfile";
import TelevideniyaDashboard from "./components/EmployeePost/tele-radie/TelevideniyaDashboard";
import RadioTvDashboad from "./components/EmployeePost/radio/RadioTvDashboad";
import OAVDashboard from "./components/EmployeePost/oav/OAVDashboard";
import InternetSitesJSDashboard from "./components/EmployeePost/internet_sites/InternetSitesJSDashboard";
import MessengerJSDashboard from "./components/EmployeePost/messengers/MessengerJSDashboard";
import MediaProjectsDashboard from "./components/EmployeePost/mediaProjects/MediaProjectsDashboard";
import MatbuotDashboard from "./components/EmployeePost/matbuotAnjumani/MatbuotDashboard";
import ForeignDashboard from "./components/EmployeePost/foriegn/ForeignDashboard";
import InfografikaAkustikDashboard from "./components/EmployeePost/infografika/InfografikaAkustikDashboard";
import OnlineEfirDashboard from "./components/EmployeePost/online_efir/OnlineEfirDashboard";
import TelegramDashboard from "./components/EmployeePost/telegram/TelegramDashboard";
import LevelIlluminationDashboard from "./components/EmployeePost/levelIllumination/LevelIlluminationDashboard";
function App() {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<AuthSignUp />} />
        <Route path="/detailsinfo" element={<DetailsInfo />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/repassword" element={<RePassword />} />
        <Route path="/superadminpanel" element={<SuperAdmin />}>
          <Route
            element={
              <RoleBasedRoute
                token={token}
                allowedRole="ROLE_ADMIN"
                userRole={userRole}
              />
            }
          >
            <Route path="allemployees" element={<AllEmployeers />} />
            <Route path="foreign" element={<Foreign />} />
            <Route path="foreign_dashboard" element={<ForeignDashboard />} />
            <Route path="televediniye" element={<TelevediniyeAdmin />} />
            <Route
              path="televediniye_dashboard"
              element={<TelevideniyaDashboard />}
            />
            <Route path="radio" element={<RadioTVAdmin />} />
            <Route path="radio_dashboard" element={<RadioTvDashboad />} />
            <Route path="internet_sites" element={<InternetSitesJSAdmin />} />
            <Route
              path="internet_sites_dashboard"
              element={<InternetSitesJSDashboard />}
            />
            <Route path="oav" element={<OAVjsAdmin />} />
            <Route path="oav_dashboard" element={<OAVDashboard />} />
            <Route path="messenger" element={<MessengersJSAdmin />} />
            <Route
              path="messenger_dashboard"
              element={<MessengerJSDashboard />}
            />
            <Route path="onlayn_efir" element={<OnlineEfir />} />
            <Route
              path="onlayn_efir_dashboard"
              element={<OnlineEfirDashboard />}
            />
            <Route
              path="matbuot_anjumani"
              element={<MatbuotAnjumaniJSAdmin />}
            />
            <Route
              path="matbuot_anjumani_dashboard"
              element={<MatbuotDashboard />}
            />
            <Route path="infografika" element={<Infografika />} />
            <Route
              path="infografika_dashboard"
              element={<InfografikaAkustikDashboard />}
            />
            <Route path="telegram" element={<Telegram />} />
            <Route path="organization" element={<Organization />} />
            <Route path="mediaprojects" element={<MediaProjects />} />
            <Route
              path="mediaprojects_dashboard"
              element={<MediaProjectsDashboard />}
            />
            <Route path="levelIllumination" element={<LevelIllumination />} />
            <Route
              path="levelIllumination_dashboard"
              element={<LevelIlluminationDashboard />}
            />
            <Route path="addemployees" element={<AddEmployees />} />
            <Route path="korzinka" element={<Korzinka />} />
            <Route path="dashboard" element={<BoshSahifa />} />
          </Route>
        </Route>
        <Route path="/" element={<EmployeePanel />}>
          <Route
            element={
              <RoleBasedRoute
                token={token}
                allowedRole="ROLE_EMPLOYEE"
                userRole={userRole}
              />
            }
          >
            <Route path="/televediniye" element={<Televediniye1 />} />
            <Route
              path="/televediniye_dashboard"
              element={<TelevideniyaDashboard />}
            />
            <Route path="/radio_dashboard" element={<RadioTvDashboad />} />
            <Route path="/radio" element={<RadioTV />} />
            <Route path="/foreign" element={<Foreign />} />
            <Route path="/foreign_dashboard" element={<ForeignDashboard />} />
            <Route path="/internet_sites" element={<InternetSitesJS />} />
            <Route
              path="/internet_sites_dashboard"
              element={<InternetSitesJSDashboard />}
            />
            <Route path="/oav" element={<OAVjs />} />
            <Route path="/oav_dashboard" element={<OAVDashboard />} />
            <Route path="/messenger" element={<MessengersJS />} />
            <Route
              path="/messenger_dashboard"
              element={<MessengerJSDashboard />}
            />
            <Route path="/matbuot_anjumani" element={<MatbuotAnjumaniJS />} />
            <Route path="/matbuot_dashboard" element={<MatbuotDashboard />} />
            <Route path="/infografika" element={<Infografika />} />
            <Route
              path="/infografika_dashboard"
              element={<InfografikaAkustikDashboard />}
            />
            <Route path="/onlayn_efir" element={<OnlineEfir />} />
            <Route
              path="/onlayn_efir_dashboard"
              element={<OnlineEfirDashboard />}
            />
            <Route path="/dashboard" element={<BoshSahifa />} />
            <Route path="/telegram" element={<Telegram />} />
            <Route path="/telegram_dashboard" element={<TelegramDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/mediaprojects" element={<MediaProjects />} />
            <Route
              path="/mediaprojects_dashboard"
              element={<MediaProjectsDashboard />}
            />
            <Route path="/levelIllumination" element={<LevelIllumination />} />
            <Route
              path="/levelIllumination_dashboard"
              element={<LevelIlluminationDashboard />}
            />
            <Route path="/trashbox" element={<Korzinka />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFountPage />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
