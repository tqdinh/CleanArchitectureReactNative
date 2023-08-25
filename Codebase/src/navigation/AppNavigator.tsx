import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthNavigator, MainNavigator } from "./AppNavigatorStack"
import { useSelector } from "react-redux"
import { selectAuth } from "redux/auth/authSlice"
import { fromAuthResponeToEntityAuth } from "CONVERTER/converterAuth"
const AppNavigator = () => {

    const authUserRespone = useSelector(selectAuth)
    const authentication = fromAuthResponeToEntityAuth(authUserRespone)

    const AppStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    authentication.is_valid() ? (<AppStack.Screen component={MainNavigator} name='MainNavigator' />) : (
                        <AppStack.Screen component={AuthNavigator} name={AuthNavigator.name}
                        />
                    )
                }

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator
