export default function ImageCard(props: {
  _id: string;
  url: string;
  name: string;
}) {
  return (
    <div className="flex w-[25%] p-2 h-[30vh] ">
      <div
        className="flex w-full h-full group bg-cover bg-center rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${props.url})`,
        }}
      >
        <div className=" hidden group-hover:flex w-full h-full transition-all ease-in-out duration-500 bg-black bg-opacity-50 items-end">
          <h1 className="p-4 text-white font-bold text-xl">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}
