import Typography from '@/components/Typography'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { View, Pressable } from 'react-native'

export interface TabsProps {
  tabs: string[]
  selected: number
  setSelected: (index: number) => void
}

const TabsSelector: React.FC<TabsProps> = ({ tabs, selected, setSelected }) => {
  const lastIndex = tabs.length - 1
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {tabs.map((tab, index) => (
        <Pressable
          onPress={() => setSelected(index)}
          key={tab}
          style={{
            paddingVertical: 15,
            flex: 1,
            borderWidth: 1,
            borderColor: Colors.primary[600],
            backgroundColor: selected === index ? Colors.primary[600] : 'transparent',
            borderTopLeftRadius: index === 0 ? 10 : 0,
            borderBottomLeftRadius: index === 0 ? 10 : 0,
            borderTopRightRadius: index === lastIndex ? 10 : 0,
            borderBottomRightRadius: index === lastIndex ? 10 : 0,
          }}
        >
          <Typography
            justify="center"
            variant="subtitle"
            color={selected === index ? 'light' : 'primary'}
          >
            {tab}
          </Typography>
        </Pressable>
      ))}
    </View>
  )
}

export default TabsSelector
