import React, { useState, useCallback, useEffect, useContext } from "react";

import { View, StyleSheet, FlatList, Alert } from "react-native";
//import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";

import FoodDeliveryItem from "../components/FoodDeliveryItem";
import AppTextSearch from "../components/AppTextSearch";
import orderApi from "../api/order";
import AuthContext from "../auth/context";
import { ErrorMessage } from "../components/forms";
import settings from "../config/setting";

function DeliveryReadyScreen({ navigation }) {
  const [user, setUser] = useContext(AuthContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [eStatus, setEstatus] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [runStatus, setRunStatus] = useState(false);

  //const { user, logOut } = useAuth();
  //const currrentUser = user.id;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (runStatus == true) {
      getData();
      setRunStatus(false);
    }
  }, [runStatus]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    orderApi
      .getOrderDeliverying()
      .then((data) => {
        if (data.ok) {
          //  setMenuData(data);
          setEstatus(false);
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

  const userData = user.results[0];
  //console.log(userData.default_address.id);

  function seletedAddress(data) {
    d.id == userData.default_address.id;
  }
  const stateSelectedItem = userData.address_list.find(
    (c) => c.id == userData.default_address.id
  );

  const handleAccept = (order_status, id) => {
    Alert.alert(
      "Status Change",
      "Are you sure you want to change the status?",
      [
        {
          text: "Yes",
          onPress: () => onAccept(order_status, id),
        },
        { text: "No" },
      ]
    );
  };

  const onAccept = async (order_status, id) => {
    //  const order_status = 2;
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
            navigation.navigate(routes.ORDERS_ACTIVE);
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
  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <ErrorMessage error={error} visible={eStatus} />
      {!isLoading && menuData && (
        <Screen>
          <FlatList
            data={menuData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <FoodDeliveryItem
                id={item.id}
                title={item.menu.food_title}
                subTitle={item.menu.food_description}
                image={makeUri(
                  item.menu.default_image.food_menu_id,
                  item.menu.default_image
                )}
                price={item.customer_price}
                qty={item.qty}
                total_amount={item.total_amount}
                order_status={item.order_status}
                deliveryAddres={item.delivery}
                userInfo={item.user}
                distance={1}
                distanceUnit="KM -"
                orderStatus={statusTextOrder(item.order_status)}
                paymentStatus={statusTextPayment(item.payment_type)}
                onPress={handleAccept}
                // onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({});

export default DeliveryReadyScreen;
