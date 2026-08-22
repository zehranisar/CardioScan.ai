import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[var(--color-mist)] font-[var(--font-body)] text-[var(--color-ink)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assess" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;