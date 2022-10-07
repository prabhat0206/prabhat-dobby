import { AiOutlineUser, AiOutlineLogin, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Register() {
  return (
    <div className="flex w-full bg-[#17181F] flex-col h-screen justify-center space-y-3 items-center">
      <h1 className="text-2xl font-bold text-center text-white mb-5">Dobby</h1>
      <div className="flex flex-col space-y-3">
        <span className="flex border items-center rounded-full px-6 py-2">
          <input
            type="text"
            className=" outline-none w-80 bg-transparent text-white"
            placeholder="username"
          />
          <AiOutlineUser color="#fff" />
        </span>
        <span className="flex border items-center rounded-full px-6 py-2">
          <input
            type="email"
            className=" outline-none w-80 bg-transparent text-white"
            placeholder="email"
          />
          <AiOutlineMail color="#fff" />
        </span>
        <span className="flex border items-center rounded-full px-6 py-2">
          <input
            type="password"
            className=" outline-none w-80 bg-transparent text-white"
            placeholder="password"
          />
          <RiLockPasswordLine color="#fff" />
        </span>
        <button className="bg-[#005BD8] text-white p-2 px-4 flex justify-center items-center rounded-full">
          <AiOutlineLogin className="mr-1" /> Sign up
        </button>
        <span className="text-white flex justify-center">
          Already a member? Login
        </span>
      </div>
    </div>
  );
}
