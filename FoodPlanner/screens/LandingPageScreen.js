import { Button, StyleSheet, Text, View } from 'react-native';


export default function LandingPageScreen({navigation}){
    return (
        <View>
          <Text>LandingPage Screen</Text>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('TabNavigator')}
          />
        </View>
      );
}