import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './Pages/Admin/AdminDashboardPage'
import AdminLoginPage from './Pages/Admin/AdminLoginPage'
import ReportPostPage from './Pages/Admin/ReportPostPage'
import UserManagementPage from './Pages/Admin/UserManagementPage'
import HomePages from './Pages/User/HomePages'
import LandingPages from './Pages/User/LandingPages'
import LoginPage from './Pages/User/LoginPage'
import SignupPage from './Pages/User/SignupPage'
import UserProfilePages from './Pages/User/UserProfilePages'
import store from './Redux/Store'


function App() {
  return (
    <div className='App'>

      <Router>
        <Routes> {/* userside */}
          <Route path='/' element={<LandingPages />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>

        <Provider store={store}>
          <Routes> {/* userside */}

            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<HomePages />} />
            <Route path='/profile' element={<UserProfilePages />} />

          </Routes>
        </Provider>


        <Routes> {/* adminside */}
          <Route path='/adminlogin' element={<AdminLoginPage />} />
          <Route path='/admindashboard' element={<AdminDashboardPage />} />
          <Route path='/usermanagement' element={<UserManagementPage />} />
          <Route path='/reportpost' element={<ReportPostPage />} />
        </Routes>

      </Router>

    </div>
  )
}

export default App