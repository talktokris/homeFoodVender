import React, { useState, useCallback, useEffect } from "react";


// const test = {
//   id: 9,
//   user_id: 25,
//   total_items: 1,
//   deliver_fee: "5.00",
//   tax: "1.10",
//   customer_amount: "18.80",
//   grand_total: "24.90",
//   payment_type: 1,
//   deliver_status: 0,
//   vender_id: 23,
//   vender: {
//     id: 23,
//     name: "Mandala Restaurant",
//     first_name: "Arati",
//     last_name: "Thakur",
//     banner_image: "rest_logo.png",
//     location_lebel: "Bangsar Park",
//     altitude: "0.00000",
//     latitude: "0.00000",
//     rating: "0.00",
//   },
//   orders: [
//     {
//       id: 25,
//       menu_id: 41,
//       customer_price: "15.51",
//       discount_per: 6,
//       price_after_discount: "14.10",
//       order_status: "1",
//       order_status_string: {
//         id: 17,
//         options_name: "order_status_lists",
//         sting_value: "Pending",
//         integer_value: 1,
//         status: 1,
//         created_at: "-000001-11-30T00:00:00.000000Z",
//         updated_at: "-000001-11-30T00:00:00.000000Z",
//       },
//       menu: {
//         id: 41,
//         food_title: "Baos & Dimsums-Asian Street Kitchen",
//         food_description:
//           "Crispy vegetables tossed with lotus stem in tangy chili sauce",
//         image_name: "1.jpg",
//         veg_status: 1,
//         halal_status: "0",
//         customer_price: "16.00",
//         discount_per: 6,
//         extra: [
//           {
//             id: 1,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Vegetarian Sambal Belacan",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 2,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Mee",
//             price: "2.00",
//             heading: "Choice of Preparation",
//           },
//           {
//             id: 5,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Vegetarian Sambal Belacan",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 6,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Vegetarian Sambal Belacan",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 7,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Mee",
//             price: "2.00",
//             heading: "Choice of Preparation",
//           },
//           {
//             id: 13,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Vegetarian Sambal Belacan",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 14,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Non-Vegetarian Sambal Belacan",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 15,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Tofu",
//             price: "2.00",
//             heading: "Choice of Preparation",
//           },
//           {
//             id: 16,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Chili Padi With Soy Sauce",
//             price: "2.00",
//             heading: "Extras",
//           },
//           {
//             id: 17,
//             customer_price: "1.88",
//             discount: 6,
//             title: "Mee",
//             price: "2.00",
//             heading: "Choice of Preparation",
//           },
//         ],
//       },
//     },
//   ],
// };

import { View, StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";

import Screen from "../components/Screen";

import ActivityIndicator from "../components/ActivityIndicator";
import { ErrorMessage } from "../components/forms";
import AppText from "../components/AppText";
import RestaurantOrderPending from "./RestaurantOrderPending";
import routes from "../navigation/routes";
import colors from "../config/colors";

import orderApi from "../api/order";
import useApi from "../hooks/useApi";
import AppButton from "../components/AppButton";
import RetryComponent from "../components/RetryComponent";
import ModalOptionsPending from "../components/ModalOptionsPending";

function OrdersPendingScreen({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeSalesId, setActiveSalesId] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const getOrders = useApi(orderApi.getOrderPending);

  const {
    data: { data: getDataSet = [] },
    error,
    result,
    loading,
  } = getOrders;

  const postData = { order_status: 1 };

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
      .getOrderPending(postData)
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

  const onModelSelect = async (saleId, value) => {
    setModalVisible(false);
    const order_status = value ? 3 : 11; // 3 Accepted - 11 Not Accepted

    // const order_status = 1; // 1 means pending orders
    setBusy(true);
    const result = await orderApi.changeSalesStatus(saleId, order_status);

    setBusy(false);

    if (!result.ok || result.data == null) {
      setErrorStatus(true);
    } else {
      if (result.data.success == false) {
        setErrorStatus(true);
      } else if (result.data.success == true) {
        setErrorStatus(false);

        Alert.alert("Order Updated", "Your order status has updated", [
          {
            text: "Yes",
            onPress: () => getOrders.request(postData),
          },
        ]);

        // console.log(result.data.message);
      }
    }
  };

  // console.log(getDataSet[0].id);

  // console.log(getDataSet);
  return (
    <>
      <ActivityIndicator visible={busy} />

      <Screen>
        {errorStatus ? (
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
                  <RestaurantOrderPending
                    key={item.id.toString()}
                    id={item.id}
                    vData={item.vender}
                    oData={item.orders}
                    orderStatus={item.order_string_value}
                    tPrice={item.customer_amount}
                    onAction={() => {
                      setActiveSalesId(item.id);
                      setModalVisible(true);
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
      <ModalOptionsPending
        id={activeSalesId}
        title="Accept or reject order"
        modalVisible={modalVisible}
        onSelect={onModelSelect}
        onClose={() => setModalVisible(false)}
      />
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

export default OrdersPendingScreen;
