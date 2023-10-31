import Head from "next/head";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import Link from "next/link";

import ecom from "../public/com.png";
import authenticateUser from "../lib/authenticate";
import React from "react";
export default function Home() {

  const [formData, setformData] = React.useState({
    username: "",
    password: "",
    
  });
  const [err , setErr] = React.useState("")

  function handleChange(e ){
    var name = e.target.name;
    var value = e.target.value;
    setformData((prevState)=>({
        ...prevState,
        [name] : value
    }  
    )
    )
  }
  if(err.length>0){
    window.alert(err);
    setErr("")
  }
  function onSubmit(e){
    
    const request = new Request(
      "/api/signin",
      {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username  : formData.username,
          password : formData.password,
        }),

      }
    );
    fetch(request).then((data)=>{
      return data.json()
    }).then((res)=>{
      if(res.status == "success"&& res.redirect ){
        window.location.href = res.redirect;
        
        return;
      }
      else{
        if(res.status){
          setErr("Invalid Data");
        }
      }
      
    })


  }
  return (
    <div className=" h-screen flex  flex-col justify-center">
      <Heading />
      <div className="flex justify-center ">
        <form className="">
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            required
            onChange={handleChange}
            className="block  p-4 mb-8 border-2 rounded-lg"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleChange}
            className="block  p-4 border-2 rounded-lg mb-2"
          />
          
          <div className="mb-8 flex justify-end">
            <Link href="/signup" className="mr-3 text-sm">
              Sign Up
            </Link>
          </div>
          <div className="flex justify-center">
            <input
              type="button"
              id="butt1"
              value="Submit"
              onClick={onSubmit}
              className="block p-2 bg-blue-500 border-r rounded-xl text-white hover:cursor-pointer"
            />
          </div>
        </form>

        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex self-center mb-10">
      <Image
        src={ecom}
        width={50}
        height={50}
        alt="Picture of the author"
        className="rounded-3xl"
      />
      <span className="self-center ml-2 font-mono font-medium text-xl">
        E-commerce
      </span>
    </div>
  );
}
export async function getServerSideProps(req,res){

    return {props : {}}

}