import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, removeData, storeDataJSON } from "../functions/AsyncStorageFunctions";
import { getMyNotification } from "../requests/SinglePost";

const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Card>
            <Card.Title>Welcome to AuthApp!</Card.Title>
            <Card.Divider />
            <Input
              leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
              placeholder="E-mail Address"
              onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
            />

            <Input
              placeholder="Password"
              leftIcon={<Feather name="key" size={24} color="black" />}
              secureTextEntry={true}
              onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />

            <Button
              icon={<AntDesign name="login" size={24} color="white" />}
              title="  Sign In!"
              type="solid"
              onPress={async function () {
                let UserData = await getDataJSON(Email);
                let allPost = await getDataJSON("Posts");

                if (UserData.password == Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                  auth.setMyNotification(getMyNotification(UserData));
                  auth.setMyNotification(notifications);
                } else {
                  alert("Login Failed");
                }
              }}
            />
            <Button
              type="clear"
              icon={<AntDesign name="user" size={24} color="dodgerblue" />}
              title="  Don't have an account?"
              onPress={function () {
                //removeData("Posts");
                //removeData("Notifications");
                props.navigation.navigate("SignUp");
              }}
            />
            
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
});
export default SignInScreen;
