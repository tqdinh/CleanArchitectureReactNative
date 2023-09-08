import { RealmProvider } from "@realm/react";
import { schemas } from "localDB/realm";
import { CheckpointSchema } from "localDB/realm/CheckpointSchema";
import { JourneySchema } from "localDB/realm/JourneySchema";
import { PhotoSchema } from "localDB/realm/PhotoSchema";
import AppNavigator from "navigation/AppNavigator";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "redux/store";

const AppContainer = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RealmProvider deleteRealmIfMigrationNeeded schema={[JourneySchema, CheckpointSchema, PhotoSchema]}>
          <AppNavigator />
        </RealmProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default AppContainer;
