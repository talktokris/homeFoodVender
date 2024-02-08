import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage } from "../components/forms";
import AppText from "../components/AppText";
import RestaurantOrderProcess from "./RestaurantOrderProcess";

import routes from "../navigation/routes";
import colors from "../config/colors";

import orderApi from "../api/order";
import useApi from "../hooks/useApi";
import AppButton from "../components/AppButton";
import RetryComponent from "../components/RetryComponent";

function OrdersActiveScreen({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getOrders = useApi(orderApi.getOrderRunning);
  const [busy, setBusy] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeSalesId, setActiveSalesId] = useState(0);
  // const [getDataSet, getDataSetSet]
  const {
    data: { data: getDataSet = [] },
    error,
    result,
    loading,
  } = getOrders;

  const postData = { order_status: 3 };

  useEffect(() => {
    const responseData = navigation.addListener("focus", () => {
      getOrders.request(postData);
    });
    return responseData;
  }, [navigation]);

  useEffect(() => {
    // setBusy(getOrders.loading);
    // console.log(JSON.stringify(getOrders.data.data[0].id));
    setBusy(getOrders.loading);
    setErrorStatus(getOrders.error);
    setOrderData(getDataSet);
  }, [getOrders.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const autoUpdateData = useCallback(() => {
    orderApi
      .getOrderRunning(postData)
      .then((response) => {
        if (response.ok) {
          const newData = response.data.data;
          setOrderData(newData);
        }
      })
      .catch((error) => {});
  }, []);

  const onRefresh = () => {
    getOrders.request(postData);
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleAction = async (salesID, orderID, orderStatus) => {
    // const order_status = value ? 3 : 11; // 3 Accepted - 11 Not Accepted

    setBusy(true);
    const result = await orderApi.changeOrderStatus(
      salesID,
      orderID,
      orderStatus
    );
    // console.log(result.data);

    setBusy(false);

    if (!result.ok || result.data == null) {
      setErrorStatus(true);
    } else {
      if (result.data.success == false) {
        setErrorStatus(true);
      } else if (result.data.success == true) {
        setErrorStatus(false);
        getOrders.request(postData);
      }
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen>
        {error ? (
          <RetryComponent
            onPress={() => getOrders.request(postData)}
            message=" Couldn't retrieve the orders."
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getOrders.request(postData)}
              />
            }
          >
            {orderData.length >= 1 ? (
              <View>
                {orderData.map((item) => (
                  <RestaurantOrderProcess
                    key={item.id.toString()}
                    id={item.id}
                    vData={item.vender}
                    oData={item.orders}
                    orderStatus={item.order_string_value}
                    tPrice={item.customer_amount}
                    onAction={handleAction}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noItemBox}>
                <AppText style={styles.noItemText}>No Orders found</AppText>
              </View>
            )}
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  innterContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  left: { width: "60%" },
  right: { width: "40%" },
  lebel: {
    fontSize: 22,
    color: colors.secondary,
    fontWeight: "800",
  },
  lebelSm: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "800",
  },
  price: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "800",
  },
  noItemBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  noItemText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.medium,
  },
});

export default OrdersActiveScreen;
