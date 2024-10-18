import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Aseguramos que sea el paquete correcto
import OutlinedSelect from '@/components/OutlinedSelect/OutlinedSelect';


interface IconSelectProps {
  icon: keyof typeof MaterialIcons.glyphMap; 
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const IconSelect: React.FC<IconSelectProps> = ({
  icon,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <View style={styles.selectWrapper}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={icon} size={20} color="#333" />
      </View>
      <View style={{ flex: 1 }}>
        <OutlinedSelect
          label={label}
          options={options}
          option={value}
          setOption={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
    width: '100%',
  },
  iconWrapper: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default IconSelect;

