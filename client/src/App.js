import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './Pages/Admin/AdminDashboardPage'
import AdminLoginPage from './Pages/Admin/AdminLoginPage'
import ReportPostPage from './Pages/Admin/ReportPostPage'
import UserManagementPage from './Pages/Admin/UserManagementPage'
import ChatPage from './Pages/User/ChatPage'
import HomePages from './Pages/User/HomePages'
import LandingPages from './Pages/User/LandingPages'
import LoginPage from './Pages/User/LoginPage'
import NotificationPage from './Pages/User/NotificationPage'
import ProfiePage from './Pages/User/ProfiePage'
import SignupPage from './Pages/User/SignupPage'
import UserProfilePages from './Pages/User/UserProfilePages'
import store from './Redux/Store'
import Updation from './UserContext/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>

      <Router>
        <Routes> {/* userside */}
          <Route path='/' element={<LandingPages />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>


        <Provider store={store}>
          <Updation>

            <Routes> {/* userside */}

              <Route path='/login' element={<LoginPage />} />
              <Route path='/home' element={<HomePages />} />
              <Route path='/profile' element={<UserProfilePages />} />
              <Route path='/chat' element={<ChatPage />} />
              <Route path='/profile/:username' element={<ProfiePage />} />
              <Route path='/notification' element={<NotificationPage />} />

            </Routes>

          </Updation>
        </Provider>


        <Routes> {/* adminside */}
          <Route path='/adminlogin' element={<AdminLoginPage />} />
          <Route path='/admindashboard' element={<AdminDashboardPage />} />
          <Route path='/usermanagement' element={<UserManagementPage />} />
          <Route path='/reportpost' element={<ReportPostPage />} />
        </Routes>

      </Router>
      <ToastContainer />

    </div>
  )
}

export default App