import React, { useState, useCallback, useEffect } from "react";

import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage } from "../components/forms";
import AppText from "../components/AppText";
import RestaurantOrderInfo from "./RestaurantOrderInfo";

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

  const {
    data: { data: getDataSet = [] },
    error,
    result,
    loading,
  } = getOrders;

  const postData = { order_status: 0 };

  useEffect(() => {
    getOrders.request(postData);
  }, []);

  const onRefresh = () => {
    getOrders.request(postData);
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getData = useCallback(() => {
    const order_status = 1; // 1 means pending orders

    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    orderApi
      .getOrderByStatus(order_status)
      .then((data) => {
        if (data.ok) {
          //  setMenuData(data);
          setLoading(false);
          setMenuData(data.data.data);
          // console.log(data.data.data);
        } else {
          setError(
            "Unable to get the database. Please check your internet connection"
          );
          setEstatus(true);
        }
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  // Delete
  /*

  function seletedAddress(data) {
    d.id == userData.default_address.id;
  }
  const stateSelectedItem = userData.address_list.find(
    (c) => c.id == userData.default_address.id
  );

  const handleAccept = (id) => {
    Alert.alert("Accept Order", "Are you sure you want to accept the order?", [
      {
        text: "Yes",
        onPress: () => onAccept(id),
      },
      { text: "No" },
    ]);
  };

  const onAccept = async (id) => {
    const order_status = 2;
    const result = await orderApi.changeOrderStatus(order_status, id);
    // const tokenSet= result.access_token;
    // console.log(result.data);

    //console.log("==================");
    setLoading(false);

    if (!result.ok) return;
    if (!result.data) {
      setEstatus(true);
      setError(
        "Unable to connect to server. Please check your Internet connection"
      );
    } else if (result.data.success == false) {
      //  console.log("Krishna");
      setEstatus(true);

      setError(result.data.message);
    } else if (result.data.success == true) {
      // console.log(result.data);
      const { data: id, message: messageSend } = result.data;

      Alert.alert("Success", messageSend, [
        {
          text: "Ok",
          onPress: () => {
            setRunStatus(true);
            navigation.navigate(routes.ORDERS_PENDING);
          },
        },
      ]);
      // navigation.navigate(routes.PRO_DONE, {
      //   message: messageSend,
      //   id: id,
      //   navRoute: routes.ACCOUNT_ADDRESS,
      // });
    } else {
      setEstatus(true);
      setError("Unknown error");
    }
  };

  function makeUri(defID, imaData) {
    //  console.log(imaData);
    let imgUri = (imgUri = settings.imageUrl + "/menu/no_image.jpg");

    if (imaData != null)
      imgUri = settings.imageUrl + "/menu/" + defID + "/" + imaData.image_name;
    return imgUri;
  }

  function statusTextOrder(statusId) {
    const stateSelectedItem = user.options.order_status.find(
      (c) => c.id == statusId
    );
    return stateSelectedItem.title;
    // console.log(stateSelectedItem);
  }

  function statusTextPayment(statusId) {
    const stateSelectedItem = user.options.payment_type.find(
      (c) => c.id == statusId
    );
    return stateSelectedItem.title;
    // console.log(stateSelectedItem);
  }
*/
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
            {getDataSet.length >= 1 ? (
              <View>
                {getDataSet.map((item) => (
                  <RestaurantOrderInfo
                    key={item.id.toString()}
                    id={item.id}
                    vData={item.vender}
                    oData={item.orders}
                    tPrice={item.customer_amount}
                    onDelete={() => console.log("Delete Clicked")}
                    onAddItem={(foodId) => {
                      navigation.navigate(routes.HOME_FOOD_DETAILS, {
                        // id: item.id,
                        foodId: foodId,
                        itemData: item,
                        venderId: item.id,
                        type: "list",
                      });
                    }}
                    onChecOut={() => {
                      // console.log("Hi Checkout " + item.id);
                      navigation.navigate(routes.PLACE_ORDER, {
                        venderId: item.id,
                        data: item,
                      });
                    }}
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
