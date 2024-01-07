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
  const getMessage = useApi(useMessage.fetchMessage);

  const {
    data: { data: messageData = [] },
    error,
    loading,
  } = getMessage;

  useEffect(() => {
    getMessage.request();
  }, []);

  // useEffect(() => {
  //   setOrderData(getDataSet);
  // }, [getMessage.data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMessage.request();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <RetryComponent
            onPress={() => getOrders.request()}
            message=" Couldn't retrieve the messages."
          />
        )}

        {messageData.length >= 1 ? (
          <FlatList
            data={messageData}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <MessageItem
                title={item.title}
                subTitle={item.message}
                date={item.humanDate}
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
                  navigation.navigate(routes.MESSAGE_VIEW, { item })
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
