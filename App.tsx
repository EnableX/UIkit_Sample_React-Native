import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnxJoinScreen from './src/EnxJoinScreen';
import EnxConferenceScreen from './src/EnxConferenceScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EnxJoinScreen" component={EnxJoinScreen} />
        <Stack.Screen name="EnxConferenceScreen" component={EnxConferenceScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;