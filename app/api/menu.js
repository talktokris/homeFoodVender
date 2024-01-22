import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const createAddOn = async (formData, menu, heading) => {
  const { description, vender_price, customer_price, status } = formData;
  // console.log(menu[0].id);
  const responce = await client.post("/vender-menu-addon-store", {
    food_menu_id: menu.id,
    heading_id: heading.id,
    description: description,
    vender_price: vender_price,
    price: customer_price,
    status: status.integer_value,
  });
  return responce;
  //console.log(responce.data);
};

const editAddOn = async (formData, menu, heading, extraData) => {
  const { description, vender_price, customer_price, status } = formData;

  const responce = await client.post("/vender-menu-addon-edit", {
    id: extraData.id,
    food_menu_id: menu.id,
    heading_id: heading.id,
    description: description,
    vender_price: vender_price,
    price: customer_price,
    status: status.integer_value,
  });
  return responce;
  // console.log(responce.data);
};

const deleteAddOn = async (argId, foodMenuId) => {
  const responce = await client.post("/vender-menu-addon-delete", {
    id: argId,
    food_menu_id: foodMenuId,
  });
  return responce;
  // console.log(responce.data);
};

const createHeading = async (formData, menu) => {
  const { title, pick_type, status } = formData;

  const responce = await client.post("/vender-menu-heading-store", {
    food_menu_id: menu.id,
    title: title,
    pick_type: pick_type.integer_value,
    status: status.integer_value,
  });
  return responce;
  //console.log(responce.data);
};

const editHeading = async (formData, id, menu) => {
  const { title, pick_type, status } = formData;

  const responce = await client.post("/vender-menu-heading-edit", {
    id: id,
    food_menu_id: menu.id,
    title: title,
    pick_type: pick_type.integer_value,
    status: status.integer_value,
  });
  return responce;
  // console.log(responce.data);
};

const deleteHeading = async (formData) => {
  // const { id, food_menu_id } = formData;

  // console.log(formData);

  const responce = await client.post("/vender-menu-heading-delete", {
    id: formData.id,
    food_menu_id: formData.food_menu_id,
  });
  return responce;
  // console.log(responce.data);
};

const createMenu = async (formData) => {
  const {
    title,
    description,
    food_category,
    vender_price,
    customer_price,
    halal_status,
    veg_status,
    discount,
    active_status,
  } = formData;

  const responce = await client.post("/vender-menu-store", {
    food_title: title,
    food_description: description,
    food_category: food_category.title,
    food_category_id: food_category.id,

    vender_price: vender_price,
    customer_price: customer_price,
    halal_status: halal_status.integer_value,
    veg_status: veg_status.integer_value,
    discount_per: discount,
    active_status: active_status.integer_value,
  });
  return responce;
  // console.log(responce.data);
};

const editMenu = async (formData, id) => {
  const {
    title,
    description,
    food_category,
    vender_price,
    customer_price,
    halal_status,
    veg_status,
    discount,
    active_status,
  } = formData;
  // console.log(id);
  const responce = await client.post("/vender-menu-edit", {
    id: id,
    food_title: title,
    food_description: description,
    food_category: food_category.title,
    food_category_id: food_category.id,
    vender_price: vender_price,
    customer_price: customer_price,
    halal_status: halal_status.integer_value,
    veg_status: veg_status.integer_value,
    discount_per: discount,
    active_status: active_status.integer_value,
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

const fetchVenderMenu = async (id) => {
  // console.log(id);
  const responce = await client.post("/vender-menu-informations", {
    id: id,
  });
  return responce;
  // console.log(responce.data);
};

const fetchSingleMenu = async (id) => {
  // console.log(id);
  const responce = await client.post("/vender-menu-fetch-single", {
    id: id,
  });
  return responce;
  // console.log(responce.data);
};
export default {
  createAddOn,
  editAddOn,
  deleteAddOn,
  createHeading,
  editHeading,
  deleteHeading,
  createMenu,
  editMenu,
  deleteMenu,
  imageUploadMenu,
  imageDeleteMenu,
  setImageDefautlMenu,
  fetchAllMenu,
  fetchSingleMenu,
  fetchVenderMenu,
};
