import { Store } from "../context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineUser, AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Login() {
  const { user } = useContext(Store);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      await toast.promise(user.loginUser(email, password), {
        pending: "Logging in...",
        success: "Logged in successfully",
        error: "Failed to login",
      });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="flex w-full bg-[#17181F] flex-col h-screen justify-center space-y-3 items-center">
      <h1 className="text-2xl font-bold text-center text-white mb-5">Dobby</h1>
      <div className="flex flex-col space-y-3">
        <span className="flex border items-center rounded-full px-6 py-2">
          <input
            type="email"
            className=" outline-none w-80 bg-transparent text-white"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AiOutlineUser color="#fff" />
        </span>

        <span className="flex border items-center rounded-full px-6 py-2">
          <input
            type="password"
            className=" outline-none w-80 bg-transparent text-white"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordLine color="#fff" />
        </span>
        <button
          onClick={handleSubmit}
          className="bg-[#005BD8] text-white p-2 px-4 flex justify-center items-center rounded-full"
        >
          <AiOutlineLogin className="mr-1" /> Logout
        </button>
        <Link to={"/signup"}>
          <span className="text-white flex justify-center">
            Not a member? Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}
