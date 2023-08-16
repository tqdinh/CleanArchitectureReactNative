import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors } from 'themes/colors'
import { Ionicons } from 'themes/appIcon'
import Home from 'screens/Home/Home'
import TrekkingCamera from 'screens/TrekkingCamera/TrekkingCamera'
import { Icon } from 'react-native-vector-icons/Icon'
import LoginUserPass from 'screens/Login/LoginUserPass'
import Logout from 'screens/Logout/Logout'
const MainTab = createBottomTabNavigator()
const AuthStack = createNativeStackNavigator()

interface UITabSetting {
    name: string
    component: any
    icon_name: string
    icon_name_fc: string
    color: any
    color_fc: any
    isShowBadge: boolean
}
const tabs: Array<UITabSetting> = [
    {
        name: 'Home',
        component: Home,
        icon_name_fc: 'home',
        icon_name: 'home-outline',
        color_fc: Colors.SystemPrimary,
        color: Colors.SystemGrey02,
        isShowBadge: false
    }
    , {
        name: 'Account',
        component: Logout,
        icon_name_fc: 'home',
        icon_name: 'home-outline',
        color_fc: Colors.SystemPrimary,
        color: Colors.SystemGrey02,
        isShowBadge: false
    }
]

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: true }}>
            <AuthStack.Screen name={LoginUserPass.name} component={LoginUserPass} />
            <AuthStack.Screen name='Main' component={MainTabNavigator} />
        </AuthStack.Navigator>
    )
}





const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            initialRouteName={'Main'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const uiInfo: UITabSetting | undefined = tabs.find((e: any) => {
                        return e.name === route.name
                    })
                    if (uiInfo) {
                        return <Ionicons name={'newspaper'} size={20} color={focused ? uiInfo.color_fc : uiInfo.color} />
                    }
                },

                tabBarActiveTintColor: Colors.SystemPrimary,
                tabBarInactiveTintColor: Colors.SystemGrey02,
                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: 5
                },
                tabBarStyle: {
                    paddingVertical: 5,
                    backgroundColor: Colors.SystemWhite
                },
                headerShown: false
            })}
        >
            {tabs.map((e: any) => {
                return (
                    <MainTab.Screen component={e.component} name={e.name} key={e.name} />
                )
            })}
        </MainTab.Navigator>
    )
}

const MainStack = createNativeStackNavigator()
const MainNavigator = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='Main' component={MainTabNavigator} />
        </MainStack.Navigator>
    )
}

export { MainNavigator, AuthNavigator }