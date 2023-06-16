import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const register = async (userInfo) => {
    //console.log(userInfo);
    const data = new FormData();
    data.append("name", userInfo.name);
    data.append("role", 1);
    data.append("email", userInfo.email);
    data.append("password", userInfo.password);
    data.append("password", userInfo.password);
    data.append("password_confirmation", userInfo.password_confirmation);
    data.append("status", 1);
  
  
    const result = await client.post("/register", data);
   // console.log(result);
    return result;
  };


export default { register };
