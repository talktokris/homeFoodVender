import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const getOrderByStatus = async (order_status) => {
  const result = await client.post("/vender-order-records", { order_status });
  // console.log(result);
  return result;
};

const getOrderRunning = async (order_status) => {
  const result = await client.post("/vender-order-running");
  // console.log(result);
  return result;
};

const getOrderDeliverying = async () => {
  const result = await client.post("/vender-order-ready-to-deliver");
  // console.log(result);
  return result;
};

const changeOrderStatus = async (order_status, id) => {
  const result = await client.post("/vender-order-status-change", {
    order_status,
    id,
  });
  // console.log(result);
  return result;
};

const vederSalesHistory = async () => {
  const result = await client.post("/vender-order-complited-history");
  // console.log(result);
  return result;
};

const vederEarningStatement = async () => {
  const result = await client.post("/client-order-histroy");
  // console.log(result);
  return result;
};

export default {
  getOrderByStatus,
  getOrderRunning,
  getOrderDeliverying,
  changeOrderStatus,
  vederSalesHistory,
  vederEarningStatement,
};
