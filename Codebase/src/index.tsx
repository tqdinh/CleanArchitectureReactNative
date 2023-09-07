import { RealmProvider } from "@realm/react";
import { schemas } from "localDB/realm";
import AppNavigator from "navigation/AppNavigator";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "redux/store";

const AppContainer = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RealmProvider schema={schemas}>
          <AppNavigator />
        </RealmProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default AppContainer;
