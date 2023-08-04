import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import store from "redux/store"

const AppContainer = () => {
    return (

        <Provider store={store}>
            <SafeAreaProvider>
                <>

                </>
            </SafeAreaProvider>
        </Provider>

    )
}

export default AppContainer
