import { Store } from "../../context";
import React from "react";
import ImageCard from "../../components/imageCard";

export default function Search() {
  const { image } = React.useContext(Store);

  React.useEffect(() => {
    return () => {
      image.clearSearch(Date.now().toString());
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-4 sm:px-16 pt-10">
      <h1 className="text-sm text-white">images ({image.images.length})</h1>
      <div className="flex flex-wrap py-3">
        {image.images.map((image) => (
          <ImageCard key={image._id} {...image} />
        ))}
      </div>
    </div>
  );
}
