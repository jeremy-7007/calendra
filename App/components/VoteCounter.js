import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import colors from "../config/colors";
import IconButton from "./IconButton";
import Text from "./Text";

function VoteCounter({ originalScore, id }) {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [score, setScore] = useState(originalScore);

  const docRef = firebase.firestore().collection("events").doc(id);

  function updateBackend(newScore) {
    docRef.update({ score: newScore }).catch((error) => alert(error));
  }

  function onPressUp() {
    if (downvote) {
      setScore(score + 2);
      setDownvote(!downvote);
      updateBackend(score + 2);
    } else {
      if (!upvote) {
        setScore(score + 1);
        updateBackend(score + 1);
      } else {
        setScore(score - 1);
        updateBackend(score - 1);
      }
    }
    setUpvote(!upvote);
  }

  function onPressDown() {
    if (upvote) {
      setScore(score - 2);
      setUpvote(!upvote);
      updateBackend(score - 2);
    } else {
      if (!downvote) {
        setScore(score - 1);
        updateBackend(score - 1);
      } else {
        setScore(score + 1);
        updateBackend(score + 1);
      }
    }
    setDownvote(!downvote);
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-bold-up"
        size={35}
        color={upvote ? colors.upvote : colors.medium}
        onPress={onPressUp}
      />
      <Text style={styles.score}>{score.toString()}</Text>
      <IconButton
        icon="arrow-bold-down"
        size={35}
        color={downvote ? colors.downvote : colors.medium}
        onPress={onPressDown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
  },
  score: {
    fontSize: 25,
    paddingHorizontal: 10,
  },
});

export default VoteCounter;
