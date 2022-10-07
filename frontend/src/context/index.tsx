import React from "react";
import axios from "axios";

const BASE_URL = "https://dobby.codencrafts.live/api";

interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
}

interface IImage {
  _id: string;
  name: string;
  url: string;
  user: string;
}

interface IContext {
  user: {
    user: IUser | null;
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
    registerUser: (
      name: string,
      email: string,
      username: string,
      password: string
    ) => Promise<void>;
  };
  image: {
    images: IImage[];
    searchImage: (search: string) => Promise<void>;
    uploadImage: (file: File, name: string) => Promise<void>;
    clearSearch: (value: string) => void;
  };
  showHidePopup: () => void;
}

export const Store = React.createContext<IContext>({
  user: {
    user: null,
    isAuthenticated: false,
    loginUser: async () => {},
    logoutUser: () => {},
    registerUser: async () => {},
  },
  image: {
    images: [],
    searchImage: async () => {},
    uploadImage: async () => {},
    clearSearch: (value: string) => {},
  },
  showHidePopup: () => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [images, setImages] = React.useState<IImage[]>([]);
  const [search, clearSearch] = React.useState<string>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const checkToken = async () => {
        const res = await axios.get(`${BASE_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          setUser(user);
        }
      };
      checkToken();
    }
  }, []);

  const showHidePopup = () => {
    document.getElementById("imageUploadPopup")?.classList.toggle("hidden");
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getImages = async () => {
        const res = await axios.get<IImage[]>(`${BASE_URL}/image`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(res.data);
      };
      getImages();
    }
  }, [isAuthenticated, search]);

  const searchImage = async (search: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get<IImage[]>(
        `${BASE_URL}/image/search?q=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImages(res.data);
    }
  };

  const uploadImage = async (file: File, name: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", name);
      const res = await axios.post<IImage>(`${BASE_URL}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setImages([...images, res.data]);
      showHidePopup();
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    username: string
  ) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
      username,
    });
    if (res.status === 200) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
  };

  const loginUser = async (email: string, password: string) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Store.Provider
      value={{
        user: {
          user,
          isAuthenticated,
          loginUser,
          logoutUser,
          registerUser,
        },
        image: {
          images,
          searchImage,
          uploadImage,
          clearSearch,
        },
        showHidePopup,
      }}
    >
      {children}
    </Store.Provider>
  );
};
