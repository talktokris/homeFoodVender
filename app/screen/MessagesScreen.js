import React, { useState, useCallback, useEffect } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import MessageItem from "../components/MessageItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";
import useMessage from "../api/message";
import useApi from "../hooks/useApi";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import RetryComponent from "../components/RetryComponent";

function MessagesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [busy, setBusy] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const getMessage = useApi(useMessage.fetchMessage);

  const {
    data: { data: messageData = [] },
    error,
    loading,
  } = getMessage;

  useEffect(() => {}, []);

  useEffect(() => {
    const responseData = navigation.addListener("focus", () => {
      setBusy(true);
      getMessage.request();
    });
    return responseData;
  }, [navigation]);

  // useEffect(() => {
  //   setOrderData(getDataSet);
  // }, [getMessage.data]);

  useEffect(() => {
    // setBusy(getOrders.loading);
    // console.log(JSON.stringify(getOrders.data.data[0].id));
    setBusy(getMessage.loading);
    // setErrorStatus(getMessage.error);

    setOrderData(messageData);
  }, [getMessage.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoUpdateData();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const autoUpdateData = useCallback(() => {
    useMessage
      .fetchMessage()
      .then((response) => {
        if (response.ok) {
          // console.log("Hi");
          // console.log(response.data.data);
          const newData = response.data.data;
          setOrderData(newData);
        }
      })
      .catch((error) => {});
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMessage.request();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={busy} />
      <Screen style={styles.screen}>
        {errorStatus && (
          <RetryComponent
            onPress={() => getMessage.request()}
            message=" Couldn't retrieve the messages."
          />
        )}

        {orderData.length >= 1 ? (
          <FlatList
            data={orderData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <MessageItem
                title={item.title}
                subTitle={item.message}
                date={item.humanDate}
                readStatus={item.seen}
                iconComponent={
                  <Icon
                    name="email-outline"
                    backgroundColor="#F5F5F5"
                    iconColor={colors.primary}
                    size={25}
                  />
                }
                // onPress={() => console.log("Message Selected:- " + item.id)}
                onPress={() =>
                  navigation.navigate(routes.ACCOUNT_MESSAGE_VIEW, { item })
                }
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.noMsgFound}>
              <AppText style={styles.emptyMessageStyle}>
                No Messages Found
              </AppText>
            </View>
          </ScrollView>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  noMsgFound: {
    marginHorizontal: 20,
    // backgroundColor: "#f7f7f7",
    // shadowColor: "#00000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginTop: 20,
    paddingVertical: 10,
  },
  emptyMessageStyle: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default MessagesScreen;
