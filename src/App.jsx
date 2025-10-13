import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyshop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import MyOrders from "./pages/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
import Shop from "./pages/Shop";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/userSlice";
import Onboarding from "./pages/Onboarding";
import Success from "./pages/Success";
import LandingPage from "./pages/LandingPage";
import OnboardingStep1 from "./pages/OnboardingStep1";
import OnboardingStep2 from "./pages/OnboardingStep2";

export const serverUrl = "http://localhost:8000";
// export const serverUrl = import.meta.env.VITE_API_URL;
function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useGetCurrentUser();
  useUpdateLocation();
  useGetCity();
  useGetMyshop();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders();

  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true });
    dispatch(setSocket(socketInstance));
    socketInstance.on("connect", () => {
      if (userData) {
        socketInstance.emit("identity", { userId: userData._id });
      }
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [userData?._id]);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/onboarding"
        element={userData ? <Onboarding /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/onboarding/step1"
        element={userData ? <OnboardingStep1 /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/onboarding/step2"
        element={userData ? <OnboardingStep2 /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/add-item"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/my-orders"
        element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
      />

      <Route
        path="/shop/:shopId"
        element={userData ? <Shop /> : <Navigate to={"/signin"} />}
      />

      <Route path="/success" element={<Success />} />
      <Route path="/landing-page" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
