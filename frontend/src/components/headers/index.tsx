import {
  AiOutlineSearch,
  AiOutlineLogout,
  AiOutlineCloudUpload,
} from "react-icons/ai";

export default function Header() {
  return (
    <header className="w-full flex justify-between px-16 py-3 items-center">
      <h1 className="text-2xl font-bold text-center text-white">Dobby</h1>
      <span className="flex border items-center rounded-full px-6 py-2">
        <input
          type="text"
          className=" outline-none w-80 bg-transparent text-white"
          placeholder="Search image"
        />
        <AiOutlineSearch color="#fff" />
      </span>
      <span className="flex space-x-2 items-center">
        <div className=" text-white p-2 px-4 flex font-bold text-lg flex-col rounded-full">
          <span>Prabhat Ranjan</span>
        </div>
        <button className=" bg-purple-600 text-white p-2 px-4 flex items-center rounded-full">
          <AiOutlineCloudUpload className="mr-1" /> Upload
        </button>
        <button className="bg-gray-500 text-white p-2 px-4 flex items-center rounded-full">
          <AiOutlineLogout className="mr-1" /> Logout
        </button>
      </span>
    </header>
  );
}
