import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WarehousePage from '@/pages/WarehousePage/WarehousePage'
import WarehouseDetailPage from '@/pages/WarehouseDetailPage/WarehouseDetailPage'

export type WarehouseStackParamList = {
  'warehouse-page': undefined
  'warehouse-detail': { id: number }
}

const Stack = createNativeStackNavigator<WarehouseStackParamList>()

const WarehouseStack = () => {
  return (
    <Stack.Navigator
      id="warehouse"
      initialRouteName="warehouse-page"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        component={WarehousePage}
        name="warehouse-page"
        options={{ title: 'Depósitosss' }}
      />
      <Stack.Screen
        component={WarehouseDetailPage}
        name="warehouse-detail"
        options={({ route }) => ({ title: `Detalle del depósito ${route.params.id}` })}
      />
    </Stack.Navigator>
  )
}

export default WarehouseStack
