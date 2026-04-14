import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Authentication from "./auth/Authentication.jsx";
import Transfer from "./pages/Transfer.jsx";
import Bills from "./pages/Bills.jsx";
import TransHistory from "./pages/TransHistory.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Transaction from "./pages/Transaction.jsx";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // setTimeout(
  //   () => {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //     window.location.href = "/signin";
  //   },
  //   5 * 60 * 60 * 1000,
  // ); // 5 hours before token expires
  useEffect(() => {
    document.title = "Nexus Pay - Your Ultimate Banking Companion";
    const getAuth = async () => {
      try {
        const response = await axios.get(
          "https://nexus-pay-backend-t4aq.onrender.com/api/v3/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response) {
          console.log("User Analytics Failed");
        }

        // console.log(response.data.data);
        // setAnalytics(response.data.data);
        // return res.data.data
      } catch (error) {
        console.log(error.response?.data || error.message);
        if (error.response?.data.message === 'Not authorized') {
          // console.log("User not authorized. Redirecting to sign-in page.");
          alert("Session expired. Please sign in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setTimeout(() => {
            navigate("/signIn");
          }, 1500);
        }
      }
    };

    setInterval(() => {
      getAuth();
    }, 1 * 60 * 60 * 1000); // Check every 1 hour
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/signIn" element={<SignInPage />}></Route>

        <Route
          element={
            <Authentication isAuthenticated={token} redirect="/signIn" />
          }
        >
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/transfer-history" element={<TransHistory />}></Route>
            <Route path="/transfer/:id" element={<Transaction />}></Route>
            <Route path="/transfer" element={<Transfer />}></Route>
            <Route path="/bills" element={<Bills />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
