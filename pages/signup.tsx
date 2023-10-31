import Head from "next/head";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useRouter } from 'next/router';

// import checkAvailableUsername from "../lib/users";
import handler from "../lib/users";
import ecom from "../public/com.png";
import React, { SyntheticEvent } from "react";
export default function Signup(props) {
  const [formData, setformData] = React.useState({
    username: "",
    password: "",
    cpassword: "",
    merchant : false
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
  function handleChangeMerchant(e){
    let name = e.target.name;
    setformData((prevState)=>({
      ...prevState,
      [name] : e.target.checked
    }))    
  }
  function onSubmit(e){
    if(formData.password!=formData.cpassword){
      setErr("Passwords do not match");
      return;
    }

    const request = new Request(
      "/api/signup",
      {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username  : formData.username,
          password : formData.password,
         cpassword:   formData.cpassword,
          merchant : formData.merchant,
        }),

      }
    );
    fetch(request).then((data)=>{
      return data.json()
    }).then((res)=>{
      if(res.status == "success" && res.redirect){
        
        window.location.href = res.redirect;
        return;
      }
      else{
        if(res.status){
          setErr(res.status);
        }
      }
      
    })


  }

  return (
    <div className=" h-screen flex  flex-col justify-center">
      <Heading />
      <div className="flex justify-center ">
        <form className=""  >
          <input
            type="text"
            required
            id="username"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="block  p-4 mb-8 border-2 rounded-lg"
          />
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="block  p-4 border-2 rounded-lg mb-8"
          />
          <input
            type="password"
            id="cpassword"
            required
            placeholder="Confirm Password"
            name="cpassword"
            onChange={handleChange}
            className="block  p-4 border-2 rounded-lg mb-2"
          />
          <div className="mb-2 mt-4 items-center">
            <span className="">Merchant : </span>
            <input type="checkbox" className="ml-2" name="merchant" onChange={handleChangeMerchant}/>
            </div>
          <div className = "mb-5 text-primary flex justify-center text-sm">
            {err}
          </div>
          
          <div className="flex justify-center">
            <input
              type="button"
              id="butt1"
              name="button"
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
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  if (req.method == "POST") {
    // console.log(req.body);
    handler(req, res);
    //checkAvailableUsername(req.body["username"]);
    return { props: {  } };
  }
  return {props : {}}
  
}
