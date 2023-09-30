import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import profileicondef from "../../assets/profileicondefault.png";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/slices/postSlice";

const Posts = ({ post }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,.95)",
        flex: 1,
      }}
    >
      <Divider width={1} color="rgba(255,255,255,.15)" />
      <View style={{ padding: 5 }}>
        <PostHeader post={post} />
        <View
          style={{
            marginHorizontal: 5,
          }}
        >
          <PostMessage post={post} />
          <PostImage post={post} />
          <PostFooter post={post} />
        </View>
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={profileicondef} style={styles.story} />
        <View style={{ marginHorizontal: 5 }}>
          <Text style={styles.name}>{post?.owner?.name}</Text>
          <Text style={styles.username}>{post?.owner?.username}</Text>
        </View>
      </View>
      <Entypo
        name="dots-three-horizontal"
        size={24}
        color="rgba(255,255,255,0.6)"
        style={{ paddingHorizontal: 5 }}
      />
    </View>
  );
};

const PostMessage = ({ post }) => (
  <View
    style={{
      paddingHorizontal: 15,
      paddingTop: 5,
      paddingBottom: 10,
      display: `${post?.message === "" ? "none" : "flex"}`,
    }}
  >
    <Text style={styles.message}>{post?.message}</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      flex: 1,
      paddingTop: 10,
    }}
  >
    {post?.images?.map((item, i) => {
      return (
        <Image
          source={{ uri: item.url }}
          style={{
            resizeMode: "contain",
            aspectRatio: 4 / 3,
            borderRadius: 30,
            width: "auto",
            height: "auto",
          }}
          key={i}
        />
      );
    })}
  </View>
);

const PostFooter = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [liked, setLiked] = useState(
    post?.isLiked === undefined ? false : post?.isLiked
  );
  const dispatch = useDispatch();
  async function handleLike() {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount +1);
    dispatch(likePost({ postId: post._id }));
  }

  return (
    <View style={styles.footer}>
      <Icons count={post.viewsCount} iconname="eyeo" />
      <Icons count={post.retweetsCount} iconname="retweet" />
      <Icons count={post.commentsCount} iconname="message1" />
      <Pressable onPress={handleLike}>
        <Icons
          count={likeCount}
          iconname={`${liked ? "heart" : "hearto"}`}
          isLiked={liked}
        />
      </Pressable>
      <Icons iconname="sharealt" />
    </View>
  );
};

const Icons = ({ iconname, count, isLiked }) => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
      }}
    >
      <AntDesign
        name={iconname}
        size={16}
        color={`${!isLiked ? "rgba(255,255,255,0.5)" : "red"}`}
      />
      <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
        {count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1.6,
    marginHorizontal: 3,
    borderColor: "rgba(255,255,255,.1)",
  },
  name: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  username: {
    color: "#a3a3a3",
    fontSize: 12,
  },
  message: {
    color: "white",
    fontSize: 16,
  },

  footer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,

    justifyContent: "space-around",
    gap: 10,
  },
});
export default Posts;
