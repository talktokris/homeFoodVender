import client from "./client";

//const register = (userInfo) => client.post("/register", userInfo);

//return register

const getOrderPending = async (data) => {
  const result = await client.post("/vender-order-pending", {
    order_status: data.order_status,
  });
  // console.log(order_status);
  return result;
};

const getOrderRunning = async (data) => {
  const result = await client.post("/vender-order-running", {
    order_status: data.order_status,
  });
  // console.log(result);
  return result;
};

const getOrderDeliverying = async (data) => {
  const result = await client.post("/vender-order-ready-to-deliver", {
    order_status: data.order_status,
  });
  // console.log(data);
  return result;
};

const changeSalesStatus = async (saleId, order_status) => {
  const result = await client.post("/vender-sales-change-status", {
    sales_id: saleId,
    status_value: order_status,
  });
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
  getOrderPending,
  getOrderRunning,
  getOrderDeliverying,
  changeSalesStatus,
  changeOrderStatus,
  vederSalesHistory,
  vederEarningStatement,
};
