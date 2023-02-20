import React, { useState, useCallback } from "react";

import { View, StyleSheet, FlatList } from "react-native";
import MessageItem from "../components/MessageItem";

import Screen from "../components/Screen";
import Separater from "../components/Separater";

import ActivityIndicator from "../components/ActivityIndicator";
//import userUpdate from "../api/userUpdate";
import routes from "../navigation/routes";
import colors from "../config/colors";
import Icon from "../components/Icon";
import AddressItem from "../components/AddressItem";
import { LinkButton } from "../components/forms";

const messages = [
  {
    id: 1,
    title: "Setia Walk, Puchong",
    subTitle:
      "Persiaran Wawasan, Pusat Bandar Puchong G-01G Setia Walk, Puchong,1800, Malaysia",
    image: require("../assets/images/av.png"),
    icon: {
      name: "google-maps",
      backgroundColor: "#000",
    },
  },
  {
    id: 2,
    title: "Setia Walk, Puchong",
    subTitle:
      "Persiaran Wawasan, Pusat Bandar Puchong G-01G Setia Walk, Puchong,1800, Malaysia",
    image: require("../assets/images/av.png"),

    icon: {
      name: "google-maps",
      backgroundColor: "#000",
    },
  },
  {
    id: 3,
    title: "Setia Walk, Puchong",
    subTitle:
      "Persiaran Wawasan, Pusat Bandar Puchong G-01G Setia Walk, Puchong,1800, Malaysia",
    image: require("../assets/images/av.png"),
    icon: {
      name: "google-maps",
      backgroundColor: "#000",
    },
  },
];

function AddressScreen({ navigation }) {
  /*
  const { user, logOut } = useAuth();
  const currrentUser = user.id;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    userUpdate
      .messageFatch(currrentUser)
      .then((data) => {
        setUsers(data);
        // console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);
  // console.log(users);
  var key = 1;
  */
  return (
    <Screen>
      <View>
        <FlatList
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <AddressItem
              title={item.title}
              subTitle={item.subTitle}
              iconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  size={50}
                />
              }
              // onPress={() => console.log("Message Selected:- " + item.id)}
              onPress={() => navigation.navigate(routes.AC_MESAGES_VIEW, item)}
              renderRightActions={() => (
                <View style={{ backgroundColor: "red", height: 70 }}></View>
              )}
            />
          )}
          ItemSeparatorComponent={Separater}
        />
        <View style={styles.buttonContainer}>
          <LinkButton
            title=" Add New Address"
            color="secondary"
            icon="google-maps"
            onPress={() => {
              // console.log("Hi");
              navigation.navigate(routes.ACCOUNT_ADD_ADDRESS);
            }}
            width="90"
          />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
  },
});

export default AddressScreen;
