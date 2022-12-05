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


function App() {
  return (
    <div className='App'>

      <Router>

        <Routes> {/* userside */}
          <Route path='/' element={<LandingPages />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/home' element={<HomePages />} />
          <Route path='/profile' element={<UserProfilePages />} />
        
  
        </Routes>


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