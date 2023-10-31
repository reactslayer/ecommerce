import Image from "next/image";
import { useEffect, useState } from "react";

export function Content({ data }) {
  let content = data.map((val, idx) => {
    return (
      <Items
        name={val["name"]}
        id={val["_id"]}
        price={val["price"]}
        category={val["category"]}
        image={val["image"]}
      />
    );
  });

  return (
    <div className="bg-white flex-1 ">
      <div className="ml-5 text-xl font-mono font-bold"></div>

      {/* <ul className="list-disc list-inside ml-1">{content}</ul> */}
      <div>{content}</div>
    </div>
  );
}

function Items({ name, price, category, id, image }) {
  let size = 100;
  return (
    <div
      onClick={() => alert("Clicked")}
      className="transition ease-in-out  m-5 py-5 bg-blue-200 rounded-xl pl-2 flex items-center hover:cursor-pointer hover:scale-105"
    >
      <div className="h-10 w-10 relative rounded-full border bg-white">
        <img src={"/api/images/" + image} alt={name} className="rounded-full" />
      </div>
      <span className="mx-2">{name}</span>
      <span></span>
    </div>
  );
}
