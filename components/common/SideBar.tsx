import { useEffect, useState } from "react";

export function SideBar({ categories, handlecategoryChange }) {
  let a = "";
  if (categories) {
    a = categories.map((data, index) => (
      <li key={index} className="flex">
        <span className="font-mono">{data["name"]}</span>
        <span className="flex m-1 flex-wrap ">
          <input
            name={data["name"]}
            onChange={handlecategoryChange}
            type="checkbox"
          />
        </span>
      </li>
    ));
  }
  return (
    <div className=" bg-blue-100 w-1/3 sm:w-1/4   ">
      {<ul className="mt-2 ml-1">{a}</ul>}
    </div>
  );
}
