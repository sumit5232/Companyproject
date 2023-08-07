
// import SideBar from "./Components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Components/Dashboard'
// import Data from "./Components/Data";
import LoginForm from "./Components/LoginForm";

function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/Data" element={<Data />} /> */}

          <Route path="*" element={<> not found</>} />
        </Routes>
      
    </Router>
  );
}

export default App;
