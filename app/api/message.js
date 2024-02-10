import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const fetchMessage = async () => {
  const responce = await client.post("/vender-message");
  return responce;
  // console.log(responce.ok);
};

const messageReadCount = async () => {
  const responce = await client.post("/vender-message-read-count");
  return responce;
  // console.log(responce.ok);
};

const messageReadUpdate = async (id) => {
  // console.log(id);
  const responce = await client.post("/vender-message-read-update", {
    id,
  });
  return responce;
  // console.log(responce);
};

export default {
  fetchMessage,
  messageReadCount,
  messageReadUpdate,
  //   fetchAllHome,
  //   fetchSingleMenu,
};
