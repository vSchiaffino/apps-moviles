import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PersonalDataTab from './PersonalDataTab'
import ChangePasswordTab from './ChangePasswordTab'
import ProfilePage from './ProfilePage'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from '@/constants/Colors'

const Tab = createMaterialTopTabNavigator()

function TabsSelectorMaterial() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Foto"
        screenOptions={{ tabBarPressColor: Colors.primary[200] }}
      >
        <Tab.Screen name="Foto" component={ProfilePage} />
        <Tab.Screen name="Datos" component={PersonalDataTab} />
        <Tab.Screen name="Contraseña" component={ChangePasswordTab} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabsSelectorMaterial
