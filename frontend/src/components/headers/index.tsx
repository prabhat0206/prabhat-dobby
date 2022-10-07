import { Store } from "../../context";
import {
  AiOutlineSearch,
  AiOutlineLogout,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const { showHidePopup, user, image } = React.useContext(Store);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between px-16 py-3 items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-center cursor-pointer text-white">
          Dobby
        </h1>
      </Link>
      <span className="flex border items-center rounded-full px-6 py-2">
        <input
          type="text"
          className=" outline-none w-80 bg-transparent text-white"
          placeholder="Search image"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toast.promise(image.searchImage(search), {
                pending: "Searching image...",
                success: "",
                error: "Image not found",
              });
              navigate("/search");
            }
          }}
        />
        <AiOutlineSearch color="#fff" />
      </span>
      <span className="flex space-x-2 items-center">
        <div className=" text-white p-2 px-4 flex font-bold text-lg flex-col rounded-full">
          <span>{user?.user?.name}</span>
        </div>
        <button
          onClick={showHidePopup}
          className=" bg-purple-600 text-white p-2 px-4 flex items-center rounded-full"
        >
          <AiOutlineCloudUpload className="mr-1" /> Upload
        </button>
        <button
          onClick={user.logoutUser}
          className="bg-gray-500 text-white p-2 px-4 flex items-center rounded-full"
        >
          <AiOutlineLogout className="mr-1" /> Logout
        </button>
      </span>
    </header>
  );
}
