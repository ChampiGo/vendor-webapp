import { useSelector } from "react-redux";
import OwnerDashboard from "../components/OwnerDashboard";
import { Navigate } from "react-router-dom";

function Home() {
  const { myShopData } = useSelector((state) => state.owner);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#fff9f6]">
      {myShopData ? <OwnerDashboard /> : <Navigate to="/onboarding/step1" />}
    </div>
  );
}

export default Home;
