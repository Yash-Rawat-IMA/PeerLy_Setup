import { Navigate, Route, Routes } from "react-router";
//importing pages
import Homepage from "./pages/Homepage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

//importing additional libraries
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// import axios from "axios";
import { axiosInstance } from "./lib/axios.js";

function App() {
  //tanstack query:
  const {
    data: authData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      // const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      // const data = await res.json();
      // return data;
      //axios:
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false, //auth check
  });

  // console.log({ data });
  // console.log({ isLoading });
  // console.log({ error });
  // console.log({ isError });

  const authUser = authData?.user;

  return (
    <div className="h-screen text-3xl" data-theme="dark">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
export default App;
