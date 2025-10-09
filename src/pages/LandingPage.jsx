import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col">
      <Nav />

      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center">
          <FaUtensils className="text-[#ff4d2d] w-14 h-14 " />
          Welcome to ChampiGo
        </h1>
      </div>
    </div>
  );
}

export default LandingPage;
