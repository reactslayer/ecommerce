import logo from "../../public/com.png";
import Image from "next/image";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";

export function Header(props) {
  return (
    <div className="flex flex-row justify-between bg-white h-1/6 w-screen">
      <span className="flex">
        <Image
          className="rounded-full h-16 w-16 self-center ml-5"
          src={logo}
          alt="Logo"
        />
        <span className="self-center ml-5 text-2xl font-bold font-mono">
          E-commerce
        </span>
      </span>
      <span className="flex flex-col justify-center ">
        <Icon className="" path={mdiDotsVertical} size={1} />
      </span>
    </div>
  );
}
