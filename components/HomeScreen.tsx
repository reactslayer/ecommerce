import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { SideBar } from "./common/SideBar";
import { Content } from "./common/Content";
import { Footer } from "./common/Footer";
import { Header } from "./common/Header";

export function HomeScreen(props) {
  let query = "";

  useEffect(() => {
    const decoded = props.decoded["isMerchant"];
  });
  //let categoryNameList:Map<String,boolean> = new Map();
  const [categoryNameList, setcategoryNameList] = useState(new Map());
  const [categories, setcategories] = useState(undefined);
  const [content, setcontent] = useState([]);
  let user = undefined;
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("/api/items/getItems?category=all")
      .then((res) => {
        if (!res) {
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json.status == "success") {
          setdata(json.data);
        } else {
          setdata([]);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/api/items/getcategories")
      .then((res) => {
        if (!res) {
          alert("Not Authenticated");
          window.location.href = "/";
        }
        return res.json();
      })
      .then((result) => {
        if (result["status"] != "success") {
          alert("Not Authenticated ");
          window.location.href = "/";
        } else {
          for (let x = 0; x < result["categories"].length; x++) {
            categoryNameList[result["categories"][x]["name"]] = false;
          }
          setcategories(result["categories"]);
        }
      });
  }, []);

  function handlecategoryChange(e) {
    //console.log(e.target.name , e.target.checked)

    categoryNameList.set(e.target.name, e.target.checked);

    //console.log(categoryNameList)
    let num = 0;
    categoryNameList.forEach((v, k) => {
      if (v) {
        num++;
      }
    });
    if (num > 0) {
      query = "category=";
      categoryNameList.forEach((v, k) => {
        if (v) {
          query += k;
          num--;
          if (num > 0) {
            query += "&category=";
          }
        }
      });
    } else {
      query = "";
    }
    if (query == "") {
      fetch("/api/items/getItems?category=all")
        .then((result) => {
          if (!result) {
            alert("Something went wrong!");
            return;
          }
          return result.json();
        })
        .then((res) => {
          if (res.status == "success") {
            setdata(res.data);
          }
        });
    } else {
      fetch("/api/items/getItems?" + query)
        .then((result) => {
          if (!result) {
            alert("Something went wrong!");
            return;
          }
          return result.json();
        })
        .then((res) => {
          if (res.status == "success") {
            setdata(res.data);
          }
        });
    }
  }
  console.log(data);
  return (
    <div className="bg-sky-100 w-screen h-screen flex flex-col justify-around">
      <Header />
      <div className="flex bg-blue-50 flex-row flex-1 ">
        <SideBar
          categories={categories}
          handlecategoryChange={handlecategoryChange}
        />
        <Content data={data} />
      </div>
      <Footer />
    </div>
  );
}
