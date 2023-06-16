import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const createMenu = async (
  title,
  description,
  venderPrice,
  customer_price,
  discountValue,
  veg_status,
  active_status
) => {
  const data = {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
  };
  // console.log(data);
  const responce = await client.post("/vender-menu-store", {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
  });
  return responce;
  //console.log(responce.data);
};

const editMenu = async (
  title,
  description,
  venderPrice,
  customer_price,
  discountValue,
  veg_status,
  active_status
) => {
  const data = {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
  };
  // console.log(data);
  const responce = await client.post("/vender-menu-edit", {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
  });
  return responce;
};

const deleteMenu = async (id) => {
  const responce = await client.post("/vender-menu-delete", {
    id: id,
  });
  return responce;
  //console.log(responce);
};

const imageUploadMenu = async (countryCode, mobileNo) => {
  const responce = await client.post("/vender-menu-image-upload", {
    country_id: countryCode.id,
    mobile_no: mobileNo,
  });
  return responce;
  //console.log(responce);
};

const imageDeleteMenu = async (countryCode, mobileNo) => {
  const responce = await client.post("/vender-menu-image-delete", {
    country_id: countryCode.id,
    mobile_no: mobileNo,
  });
  return responce;
  //console.log(responce);
};
const setImageDefautlMenu = async (countryCode, mobileNo) => {
  const responce = await client.post("/vender-menu-set-default-image", {
    country_id: countryCode.id,
    mobile_no: mobileNo,
  });
  return responce;
  //console.log(responce);
};

const fetchAllMenu = async () => {
  const responce = await client.post("/vender-menu-fetch-all");
  return responce;
  // console.log(responce.ok);
};

const fetchSingleMenu = async (countryCode, mobileNo) => {
  const responce = await client.post("/vender-menu-fetch-single", {
    country_id: countryCode.id,
    mobile_no: mobileNo,
  });
  return responce;
  //console.log(responce);
};
export default {
  createMenu,
  editMenu,
  deleteMenu,
  imageUploadMenu,
  imageDeleteMenu,
  setImageDefautlMenu,
  fetchAllMenu,
  fetchSingleMenu,
};
