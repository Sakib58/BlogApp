import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage,FlatList,TouchableOpacity } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import NotificationCard from "../components/NotificationCard";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import { AuthContext } from "../providers/AuthProvider";
import {getMyNotification,getSinglePost} from "../requests/SinglePost";


const NotificationScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />

            <FlatList
              data={auth.MyNotification["_W"]}
              renderItem={function({item}){
                return(
                  <TouchableOpacity
                  onPress={async function(){
                    var allPost=await getDataJSON("Posts");
                    allPost.forEach(post=>{
                      if(post.PostID==item.PostId){
                        var commentData={
                            author:post.Author,
                            date:post.date,
                            time:post.time,
                            post:post.post,
                            postId:post.PostID,
                            comments:post.Comments,
                            likes:post.Likes,
                          }
                        props.navigation.navigate("Comment",
                        {
                          props:commentData,
                        });
                      }
                    })
                    //console.log(props);
                    
                  }}
                  >
                    <Card>
                    <Text style={{fontSize:14}}>{item.Date} {item.Time}</Text>
                    <Text style={{fontSize:18}}>{item.userInfo.name} {item.Operation} on your post</Text>
                  </Card>
                  </TouchableOpacity>
                );
              }}
            />
          
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
