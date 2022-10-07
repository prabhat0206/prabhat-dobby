import React from "react";

interface IContext {
  popup: {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const Store = React.createContext<IContext>({
  popup: {
    show: false,
    setShow: () => {},
  },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [showImageUploadPopup, setShowImageUploadPopup] =
    React.useState<boolean>(false);

  return (
    <Store.Provider
      value={{
        popup: {
          show: showImageUploadPopup,
          setShow: setShowImageUploadPopup,
        },
      }}
    >
      {children}
    </Store.Provider>
  );
};
