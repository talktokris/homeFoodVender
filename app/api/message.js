import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const fetchMessage = async () => {
  const responce = await client.post("/client-message");
  return responce;
  // console.log(responce.ok);
};

export default {
  fetchMessage,
  //   fetchAllHome,
  //   fetchSingleMenu,
};
