import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors } from 'themes/colors'
import { Ionicons } from 'themes/appIcon'
import Home from 'screens/Home/Home'
import TrekkingCamera from 'screens/TrekkingCamera/TrekkingCamera'
import { Icon } from 'react-native-vector-icons/Icon'
import LoginUserPass from 'screens/Login/LoginUserPass'
const MainTab = createBottomTabNavigator()
const AuthStack = createNativeStackNavigator()


const mainScreen: Array<UITabSetting> = [
    {
        name: 'Home',
        component: Home,
        icon_name_fc: 'home',
        icon_name: 'home-outline',
        color_fc: Colors.SystemPrimary,
        color: Colors.SystemGrey02,
        isShowBadge: false
    }
    // , {
    //     name: 'TET',
    //     component: Home,
    //     icon_name_fc: 'home',
    //     icon_name: 'home-outline',
    //     color_fc: Colors.SystemPrimary,
    //     color: Colors.SystemGrey02,
    //     isShowBadge: false
    // }
]



const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: true }}>
            <AuthStack.Screen name={LoginUserPass.name} component={LoginUserPass} />
        </AuthStack.Navigator>
    )
}

interface UITabSetting {
    name: string
    component: any
    icon_name: string
    icon_name_fc: string
    color: any
    color_fc: any
    isShowBadge: boolean
}



const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            initialRouteName={'Main'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const uiInfo: UITabSetting | undefined = mainScreen.find((e: any) => {
                        return e.name = route.name
                    })
                    if (uiInfo) {
                        // return <Ionicons name={focused ? uiInfo.icon_name_fc : uiInfo.icon_name} size={20} color={focused ? uiInfo.color_fc : uiInfo.color} />
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
            {/* {mainScreen.map((e: any) => {
                return (
                    <MainTab.Screen component={e.component} name={e.name} />
                )
            })} */}
            <MainTab.Screen component={Home} name='home' />
            <MainTab.Screen component={TrekkingCamera} name='Camera' />

            {/* <MainTab.Screen component={Home} name='Trang chủ0' />
            <MainTab.Screen component={Home} name='Trang chủ1' /> */}

        </MainTab.Navigator>
    )
}


const MainStack = createNativeStackNavigator()
const MainNavigator = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            {/* <MainStack.Screen name='Home' component={Home} /> */}
            <MainStack.Screen name='Main' component={MainTabNavigator} />
            {/* <MozanioStack.Screen name='Main' component={MainTabNavigator} />
        <MozanioStack.Screen name='MENU_BRANCH' component={MenuBranch} />
        <MozanioStack.Screen name='BranchDetail' component={BranchDetail} />
        <MozanioStack.Screen name='Passcode' component={Passcode} />
        <MozanioStack.Screen name='Profile' component={Profile} />
        <MozanioStack.Screen name='CreatePasscode' component={CreatePasscode} />
        <MozanioStack.Screen name='UpdatePasscode' component={UpdatePasscode} />
        <MozanioStack.Screen name='Basket' component={Basket} />
        <MozanioStack.Screen
          name='Checkout'
          component={Checkout}
          options={{ gestureEnabled: false }}
        />
        <MozanioStack.Screen name='Payment' component={Payment} />
        <MozanioStack.Screen name='Deposit' component={Deposit} />
        <MozanioStack.Screen name='OrderDetail' component={OrderDetail} />
        <MozanioStack.Screen name='LoginWithUserPass' component={LoginUserPass} />
        <MozanioStack.Screen name='LoginOTP' component={LoginOTP} />
        <MozanioStack.Screen name='VerifyOTP' component={VerifyOTP} /> */}
        </MainStack.Navigator>
    )
}

export { MainNavigator, AuthNavigator }