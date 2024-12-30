import { FlatList, Image, Text, View } from "react-native";

interface ProducrImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProducrImagesProps) {
  if (images.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/no-product-image.png")}
          style={{
            width: 300,
            height: 300,
          }}
        />
      </View>
    );
  }

  return (
    <FlatList
      keyExtractor={(item) => item}
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: 7,
            borderRadius: 5,
          }}
        />
      )}
    />
  );
}
