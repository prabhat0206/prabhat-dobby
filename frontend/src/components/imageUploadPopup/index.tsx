import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

export default function ImageUploadPopup(): JSX.Element {
  const imageRef = React.useRef<any>();
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");

  return (
    <div
      id="imageUploadPopup"
      className="fixed w-full h-screen hidden bg-white bg-opacity-20 backdrop-filter filter backdrop-blur-md top-0 left-0 "
    >
      <div className="flex w-full h-full justify-center items-center">
        <FaTimes
          color="white"
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        />
        <div className="flex flex-col w-1/2">
          <div className="flex w-full mb-4 flex-col md:flex-row items-center">
            <label
              className={`w-full flex items-center ${
                image ? "p-0" : "bg-gray-200  p-3"
              } text-blue rounded-lg overflow-hidden tracking-wide border border-blue cursor-pointer`}
            >
              {image ? (
                <div
                  ref={imageRef}
                  style={{
                    backgroundImage: imagePreview ? `url(${imagePreview})` : "",
                  }}
                  className="h-96 w-full bg-cover flex justify-center items-center"
                >
                  <div
                    className={`flex w-full h-full justify-center backdrop-filter bg-cover bg-center filter items-center`}
                  >
                    <span className="px-3 py-1 bg-black bg-opacity-50 text-white font-bold uppercase rounded-lg">
                      Change
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 19.4283V2.42853C24 1.08677 22.8067 0 21.3333 0H2.66667C1.19333 0 0 1.08677 0 2.42853V19.4283C0 20.77 1.19333 21.8568 2.66667 21.8568H21.3333C22.8067 21.8568 24 20.77 24 19.4283ZM7.33333 12.7498L10.6667 16.3987L15.3333 10.9284L21.3333 18.214H2.66667L7.33333 12.7498Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                  <span className="ml-3 font-bold text-gray-700">
                    Select Image
                  </span>
                </>
              )}
              <input
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                type="file"
                name="file"
                id="file"
                className="hidden"
              />
            </label>
          </div>
          {image && (
            <span className="flex border items-center  rounded-xl px-6 py-2">
              <input
                type="text"
                className=" outline-none w-80 bg-transparent text-white"
                placeholder="Image name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </span>
          )}
          {image && name && (
            <button className=" bg-purple-600 mt-3 text-white p-2 px-4 flex justify-center items-center rounded-xl">
              <AiOutlineCloudUpload className="mr-1" /> Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
