
import jwt from "jsonwebtoken"
import "tailwindcss/tailwind.css";

import authenticateUser from "../lib/authenticate";
import { HomeScreen } from "../components/HomeScreen";
import { NotAuthenticated } from "../components/NotAuthenticated";
export default function DashBoard({isauthenticated,decoded}) {

  
  return (
    <div >
    {isauthenticated?<HomeScreen decoded = {decoded}/>:<NotAuthenticated/>}
    </div>
    
  )
}
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  let data = authenticateUser(req,res);
  return data;


}
