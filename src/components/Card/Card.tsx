import { FC, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Theme } from "@/store/theme";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
  genre: string;
}

export const Card: FC<CardProps> = ({
  id,
  title,
  year,
  medium_cover_image,
  description,
  rating,
  genre,
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  const { currentTheme } = useContext(Theme);
  const toggleMouseOver = () => setMouseOver((prev) => !prev);

  const router = useRouter();
  const onFilmClick = () => {
    router.push(`/movie/${id}`);
  };

  if (!description) {
    return null;
  }

  return (
    <div
      onMouseOver={toggleMouseOver}
      onMouseOut={toggleMouseOver}
      className=" bg-white rounded-lg overflow-hidden border border-black basis-80 object-cover rounded ml-5 mb-6 cursor-pointer relative"
      onClick={!mouseOver ? onFilmClick : () => {}}>
      {mouseOver && (
        <div
          className="absolute flex items-center justify-center flex-col text-center p-5"
          style={{
            width: "320px",
            height: "477px",
            backgroundColor: `${
              currentTheme == "black" ? "#2E438F" : "#BBA4CE"
            }`,
          }}>
          <h1 className="text-white text-xl text-extrabold mb-3">{title}</h1>
          <p className="text-lg text-white">
            Rating: <b>{rating}</b>
          </p>
          <button
            onClick={onFilmClick}
            className="p-3 border-2 mt-5 rounded-lg px-10 rounded-md border-white text-white ">
            Details
          </button>
        </div>
      )}
      <Image
        width={320}
        height={600}
        src={medium_cover_image}
        alt={title}
      />

      <div
        className="flex flex-col p-5 max-w-xs h-full"
        style={{
          backgroundColor: `${currentTheme == "black" ? "white" : "#A2B0BC"}`,
        }}>
        <span
          className="text-extrabold text-xl"
          style={{
            color: `${currentTheme == "black" ? "#2E438F" : "white"}`,
          }}>
          {title} {year}
        </span>
        <span className="text-black font-extralight">
          {description?.slice(0, 60)}...
        </span>
        <span className=" font-extrabold ">{genre}</span>
      </div>
    </div>
  );
};
