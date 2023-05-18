import { Button, StyleSheet, Text, View } from "react-native";
import { Carousel, Radio } from "antd";
import { useState } from "react";

export default function FavorisScreen({ navigation }) {
  const [dotPosition, setDotPosition] = useState("bottom");
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };

  return (
    <View>
      <Radio.Group
        onChange={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>
      <Carousel dotPosition={dotPosition}>
        <View>
          <Text>Slide 1</Text>
        </View>
        <View>
          <Text>Slide2</Text>
        </View>
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  },
});
