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


const userProfileUpdate = async (
  name,
  location_lebel,
  first_name,
  last_name,
  email
) => {
  const result = await client.post("/vender-profile-update", {
    name,
    location_lebel,
    first_name,
    last_name,
    email,
  });
  //console.log(result.data);
  return result;
};

const userPasswordChange = async (password, confirm_password) => {
  const result = await client.post("/vender-change-password", {
    password: password,
    c_password: confirm_password,
  });
  // console.log(result);
  return result;
};

const userRefresh = async () => {
  const result = await client.post("/profile-info");
  // console.log(result.data);
  return result;
};

const userAddressUpdate = async (
  id,
  address,
  street,
  city_name,
  state,
  postal_code
) => {
  const responce = await client.post("/vender-address-setup", {
    id,
    address,
    street,
    city_name,
    state: state.title,
    postal_code,
  });
  return responce;
  // console.log(responce.ok);
};

export default {
  register,
  userRefresh,
  userProfileUpdate,
  userPasswordChange,
  userAddressUpdate,
};
