import * as React from 'react';

import {Button, Image, StyleSheet, Text, View} from 'react-native';

export default function App() {
  const [uri, setUri] = React.useState();

  const showImage = async url => {
    const result = await fetch(url);
    const blob = await result.blob();
    const objectURL = URL.createObjectURL(blob);
    setUri(objectURL);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri}}
        style={styles.image}
        onError={() => console.log('Error')}
        onLoad={() => console.log('Load')}
        onLoadStart={() => console.log('LoadStart')}
        onLoadEnd={() => console.log('LoadEnd')}
        onProgress={({nativeEvent: {loaded, total}}) =>
          console.log('Progress', loaded, total)
        }
      />
      <Text>{uri}</Text>
      <Button
        title="Load image (15 kB)"
        onPress={() =>
          showImage(
            'https://upload.wikimedia.org/wikipedia/commons/e/e0/JPEG_example_JPG_RIP_050.jpg',
          )
        }
      />
      <Button
        title="Load image (83 kB)"
        onPress={() =>
          showImage(
            'https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg',
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
