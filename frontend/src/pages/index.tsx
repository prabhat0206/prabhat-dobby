import Header from "../components/headers";
import ImageUploadPopup from "../components/imageUploadPopup";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex w-full bg-[#17181F] flex-col h-screen">
      <Header />
      <ImageUploadPopup />
      <Outlet />
    </div>
  );
}
