import ImageCard from "../components/imageCard";
import Header from "../components/headers";
import ImageUploadPopup from "../components/imageUploadPopup";

export default function Home() {
  return (
    <div className="flex w-full bg-[#17181F] flex-col h-screen">
      <Header />
      <ImageUploadPopup />
      <div className="flex flex-1 flex-col overflow-y-auto px-16 pt-10">
        <h1 className="text-sm text-white">images (100)</h1>
        <div className="flex flex-wrap py-3"></div>
      </div>
    </div>
  );
}
