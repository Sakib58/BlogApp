import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import {addDataJSON} from '../functions/AsyncStorageFunctions';
import {getDataJSON} from '../functions/AsyncStorageFunctions';

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPost,setNewPost]=useState('');
  let refresh=true;

  const loadPosts = async (endpoint) => {
    const response = await getDataJSON(endpoint);
        setPosts(response);
  };

  useEffect(()=>{
    loadPosts("Posts");
  }, [refresh] );

  if (!loading) {
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
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={(currentInput)=>{
                  setNewPost(currentInput);
                }}
              />
              <Button title="Post" type="outline" onPress={function () {
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+time;
                var postId=auth.CurrentUser.email+dateTime;
                try{
                  addDataJSON("Posts",{"PostID":postId,"Author":auth.CurrentUser,"Likes":[],"Comments":[],
                  "date":date, "time":time,"post":newPost});
                }catch(error){
                  alert(error);
                }
                refresh=!refresh;
              }} />
            </Card>

            <FlatList
              data={posts}
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    author={item.Author}
                    date={item.date}
                    time={item.time}
                    post={item.post}
                    postId={item.PostID}
                    comments={item.Comments}
                    likes={item.Likes}
                    class={props}
                    
                  />
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );

  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
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

export default HomeScreen;
