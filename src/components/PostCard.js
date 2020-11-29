import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import {AuthContext} from "../providers/AuthProvider";
import { getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

function unique(array, propertyName) {
  return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}

const PostCard = (props) => {
  var commentBtnName="Comment("+Object.keys(props.comments).length+")";
  var likeBtnName="Like("+Object.keys(props.likes).length+")";
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            containerStyle={{ backgroundColor: "#ffab91" }}
            rounded
            icon={{ name: "user", type: "font-awesome", color: "black" }}
            activeOpacity={1}
          />
          <Text h4Style={{ padding: 10 }} h4>
            {props.author.name}
          </Text>
        </View>
        <Text style={{fontSize:16}}> {props.date} {props.time}</Text>
        <Text
          style={{
            paddingVertical: 10,
          }}
        >
          {props.post}
        </Text>
        <Card.Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            type="outline"
            title={likeBtnName}
            onPress={async ()=>{
              var allPosts=[];
              var posts=await getDataJSON("Posts");
              var notifications=await getDataJSON("Notifications");
              var today = new Date();
              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

              posts.forEach(post=>{
                //console.log(props.postId);
                //console.log(post.PostID);
                if(post.PostID==props.postId){
                  let allLike=post.Likes;
                  allLike.push(auth.CurrentUser);
                  let uniqueLikes = unique(allLike,"email");
                  post.Likes=uniqueLikes;
                  //console.log(post.Likes);
                  if(Object.keys(uniqueLikes).length==Object.keys(allLike).length){
                    notifications.push({"PostId":props.postId,userInfo:auth.CurrentUser,"Operation":"Liked","Date":date,"Time":time});
                  }
                }
                allPosts.push(post);
              });
              storeDataJSON("Posts",allPosts);
              storeDataJSON("Notifications",notifications);
              //console.log(notifications);
              //console.log(allPosts);
              
            }}
            icon={<AntDesign name="like2" size={24} color="dodgerblue" />
            
            }
          />
          <Button type="solid" title={commentBtnName} 
          onPress={function(){
            props.class.navigation.navigate("Comment",{
              props:props,
            })
            //console.log("Props")
            //console.log();
          }} />
        </View>
      </Card>
      )}
      </AuthContext.Consumer>
        
  );
};

export default PostCard;
