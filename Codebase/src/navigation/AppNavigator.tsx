import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainNavigator } from "./AppNavigatorStack"

const AppNavigator = () => {

    const AppStack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <AppStack.Screen component={MainNavigator} name='MainNavigator' />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator
