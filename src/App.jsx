import React ,{Suspense,useState} from "react"
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom"
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";


const Home = React.lazy(() => import("./components/Home"))
const FakultasList = React.lazy(() => import("./components/Fakultas/List"))
const ProdiList = React.lazy(()=>import("./components/Prodi/List"))
const FakultasCreate = React.lazy(()=>import("./components/Fakultas/Create"))
const ProdiCreate = React.lazy(()=>import("./components/Prodi/Create"))
const FakultasEdit = React.lazy(()=>import("./components/Fakultas/Edit"))
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"))
// const ProtectedRoute = React.lazy(() =>import("./components/ProtectedRoute"))
const Login = React.lazy(() => import("./components/Login"))




const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  return(
    <Router>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <a className="navbar-brand" href="#">MDP</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item ">
        <NavLink className={( {isActive}) => 
          `nav-link ${isActive ? "active" :""}`} aria-current="page" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={({isActive}) =>`nav-link ${isActive ? "active":""}`} aria-current="page" to ="/fakultas">Fakultas</NavLink>
      </li>
      <li className="nav-item">
      <NavLink className={({isActive})=>`nav-link ${isActive ? "active":""}`} aria-current="page" to='/prodi'>Prodi</NavLink>
      </li>
      <li>
        {token? (
          <NavLink className="nav-link" to="/logout">
            LogOut
          </NavLink>
        ) : (
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        )}
      </li>
    </ul>
  </div>
</nav>

      <Suspense fallback={<div>Loading....</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fakultas" element={<ProtectedRoute><FakultasList /></ProtectedRoute>}/>
        <Route path="/fakultas/create" element={<FakultasCreate />}/>
        <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />
        <Route path="/prodi" element={<ProtectedRoute><ProdiList /></ProtectedRoute>} />
        <Route path="/prodi/create" element={<ProdiCreate />} />
        <Route path="/prodi/edit/:id" element={<ProdiEdit />} />
        <Route path="/login" element={<Login setToken={setToken} />}/>
        <Route path="/logout" element={<Logout />}/>
      </Routes>

      </Suspense>
    </Router>
  );
};



export default App
