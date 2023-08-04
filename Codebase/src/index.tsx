import AppNavigator from "navigation/AppNavigator"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import store from "redux/store"

const AppContainer = () => {
    return (

        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>

    )
}

export default AppContainer
