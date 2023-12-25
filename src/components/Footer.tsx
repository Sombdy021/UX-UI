import { FC, useContext } from "react";
import { Theme } from "@/store/theme";
import Image from "next/image";

export const Footer: FC = () => {
  const { currentTheme, toggleTheme } = useContext(Theme);

  return (
    <footer
      className={`flex px-20 py-3  w-full py-1 border-b-2 justify-between items-center  bottom-0 left-0`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "#310058" : "#546270"}`,
      }}>
      <h1 className="text-xl flex text-white leading-loose flex items-center">
        <span
          className="border border-white rounded-full p-1 flex items-center justify-center mr-2"
          style={{ width: "20px", height: "20px" }}>
          C
        </span>
        <span>2023 c YSMLreska</span>
      </h1>
    </footer>
  );
};
