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

const messages = [
  {
    id: 1,
    title: "It is a long established fact that a reader will be distracted",
    subTitle:
      "D1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    image: require("../assets/images/av.png"),
    icon: {
      name: "email",
      backgroundColor: "#000",
    },
  },
  {
    id: 2,
    title:
      "T2 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
    subTitle:
      "D2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    image: require("../assets/images/av.png"),

    icon: {
      name: "email",
      backgroundColor: "#000",
    },
  },
  {
    id: 3,
    title:
      "T3 It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
    subTitle:
      "D3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: require("../assets/images/av.png"),
    icon: {
      name: "email",
      backgroundColor: "#000",
    },
  },
];

function MessagesScreen({ navigation }) {
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
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <MessageItem
            title={item.title}
            subTitle={item.message}
            iconComponent={
              <Icon
                name={item.icon.name}
                backgroundColor={item.icon.backgroundColor}
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
    </Screen>
  );
}
const styles = StyleSheet.create({});

export default MessagesScreen;
