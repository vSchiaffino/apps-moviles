import { View, Text } from 'react-native'
import React from 'react'
import OutlinedInput from '@/components/OutlinedInput'
import StyledButton from '@/components/StyledButton'
import MutateEntityModal from '@/components/MutateEntityModal'

const EditStockModal = ({ selectedRow, setSelectedRow, setStockSelectedIndex, onSubmit }: any) => {
  return (
    <MutateEntityModal
      show={selectedRow !== null}
      setShow={() => {
        setSelectedRow(null)
        setStockSelectedIndex(null)
      }}
      title="Editar stock registrado"
    >
      {selectedRow !== null && (
        <View
          style={{
            gap: 20,
            padding: 20,
            borderRadius: 16,
            backgroundColor: 'white',
            backfaceVisibility: 'hidden',
          }}
        >
          <OutlinedInput
            label="Stock Inicial"
            keyboardType="numeric"
            value={selectedRow.initialStock}
            onChangeText={(value: any) => {
              setSelectedRow({ ...selectedRow, initialStock: value })
            }}
          />
          <OutlinedInput
            label="Stock final"
            keyboardType="numeric"
            value={selectedRow.finalStock}
            onChangeText={(value: any) => {
              setSelectedRow({ ...selectedRow, finalStock: value })
            }}
          />
          <StyledButton label="Guardar" onPress={onSubmit}></StyledButton>
        </View>
      )}
    </MutateEntityModal>
  )
}

export default EditStockModal
