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
  active_status,
  itemData
) => {
  /*
  const data = {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
  };
*/
  // console.log(data);
  const responce = await client.post("/vender-menu-edit", {
    food_title: title,
    food_description: description,
    vender_price: venderPrice,
    customer_price: customer_price,
    discount_per: discountValue,
    veg_status: veg_status.id,
    active_status: active_status.id,
    id: itemData.id,
  });
  // console.log(responce.data);
  return responce;
};

const deleteMenu = async (id) => {
  const responce = await client.post("/vender-menu-delete", {
    id: id,
  });
  return responce;
  //console.log(responce);
};

const imageUploadMenu = async (fileUri, menuID) => {
  var fileExtension = fileUri.split(".").pop();
  var imageName = Math.floor(Date.now() / 1000);

  // console.log(imageName + "-" + fileExtension);

  const data = new FormData();
  data.append("menu_id", menuID);
  data.append("image_name", {
    name: menuID + "-" + imageName + "." + fileExtension,
    type: "image/jpeg",
    uri: fileUri,
  });

  const responce = await client.post("/vender-menu-image-upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return responce;
  //console.log(responce);
};

const imageDeleteMenu = async (image_id, menu_id) => {
  const responce = await client.post("/vender-menu-image-delete", {
    image_id: image_id,
    menu_id: menu_id,
  });
  return responce;
  // console.log(image_id + "-" + menu_id);
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

const fetchSingleMenu = async (id) => {
  // console.log(id);
  const responce = await client.post("/vender-menu-fetch-single", {
    id: id,
  });
  return responce;
  //console.log(responce.data);
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
