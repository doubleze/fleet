import "./App.css";
import Layout from "./component/Layout";
import Missing from "./component/Missing";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/Login";
import Reservation from "./pages/Reservation/Reservation";
import { Routes, Route } from "react-router-dom";
import  RequireAuth from "./component/RequireAuth";
function App() {
  return (
    <Routes>
      <Route path="login" element={<LogIn />} />
      <Route  element={<Layout />}>
        {/* public routes */}
        

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[1,2,3]}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
     );
}

export default App;
