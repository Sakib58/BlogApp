import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage,FlatList } from "react-native";
import {Input} from "react-native-elements";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import { AuthContext } from "../providers/AuthProvider";
import {SinglePost,savePostComment,saveCommentNotification} from "../requests/SinglePost";


const CommentScreen = (props) => {
  let newComment="";
  //console.log("Those are comments")
  //console.log(props.route.params.props);
  
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
          <View style={{height:"30%"}}>
            <Card>
                <Text style={{fontSize:25,fontStyle:"bold"}}>{props.route.params.props.author.name}</Text>
                <Text style={{fontSize:14}}>{props.route.params.props.date}</Text>
                <Text style={{fontSize:17,color:"blue"}}>{props.route.params.props.post}</Text>
            </Card>
              
          </View>
          <View style={{alignItems:"flex-end", flex:1,height:"60%"}}>
            <Text style={{fontSize:20}}>Comments    </Text>
            <FlatList
              data={props.route.params.props.comments}
              renderItem={function({item}){
                return(<Card>
                    <Text>{item.Author.name}</Text>
                    <Text>{item.Date} {item.Time}</Text>
                    <Text>{item.Comment}</Text>
                  </Card>)
              }}
            />
          </View>
          <View style={{alignItems:"flex-start",flex:1,height:"10%"}}>
            <Input
            placeholder="Write comment"
            onChangeText={
                function(currentInput){
                    newComment=currentInput;
                }
            }
            />
            <Button
                title="Comment"
                onPress={function(){
                  var today = new Date();
                  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  //console.log(newComment)
                  savePostComment(props.route.params.props.postId,auth.CurrentUser,newComment,date,time);
                  saveCommentNotification(props.route.params.props.postId,auth.CurrentUser,date,time);
                }}
            />
          </View>
          
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

export default CommentScreen;
