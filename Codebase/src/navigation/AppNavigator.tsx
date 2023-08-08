import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthNavigator, MainNavigator } from "./AppNavigatorStack"
import { useSelector } from "react-redux"
import { selectAuth } from "redux/auth/authSlice"
import EntityAuthentication from "DOMAIN/entities/EntityAuthentication"

const AppNavigator = () => {

    const authUserRespone = useSelector(selectAuth)
    const authentication = new EntityAuthentication(authUserRespone.access, authUserRespone.refresh, authUserRespone.avatar)
    const AppStack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <AppStack.Screen component={MainNavigator} name='MainNavigator' />
                {/* {
                    authentication.is_valid() ? (<AppStack.Screen component={MainNavigator} name='MainNavigator' />) : (

                        <AppStack.Screen component={AuthNavigator} name={AuthNavigator.name}
                        />
                    )
                } */}

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator
