import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home              from "./pages/Home";
import Login             from "./pages/Login";
import Register          from "./pages/Register";
import WorkshopTypeList  from "./pages/WorkshopTypeList";
import WorkshopTypeDetail from "./pages/WorkshopTypeDetail";
import ProposeWorkshop   from "./pages/ProposeWorkshop";
import MyWorkshops       from "./pages/MyWorkshops";
import Statistics        from "./pages/Statistics";
import Profile           from "./pages/Profile";

function WithLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<WithLayout><Home /></WithLayout>} />
        <Route path="/workshop-types" element={<WithLayout><WorkshopTypeList /></WithLayout>} />
        <Route path="/workshop-types/:id" element={<WithLayout><WorkshopTypeDetail /></WithLayout>} />
        <Route path="/propose"      element={<WithLayout><ProposeWorkshop /></WithLayout>} />
        <Route path="/my-workshops" element={<WithLayout><MyWorkshops /></WithLayout>} />
        <Route path="/statistics"   element={<WithLayout><Statistics /></WithLayout>} />
        <Route path="/profile"      element={<WithLayout><Profile /></WithLayout>} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        <Route path="*"       element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
