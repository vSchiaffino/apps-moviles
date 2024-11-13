import React from 'react'
import MutateEntityModal from '@/components/MutateEntityModal'
import OutlinedInput from '@/components/OutlinedInput'
import StyledButton from '@/components/StyledButton'
import { View } from 'react-native'

const EditStockModal = ({
  selectedRow,
  setSelectedRow,
  setStockSelectedIndex,
  onSubmit,
  onNext,
  shouldShowNext,
}: any) => {
  const ref = React.useRef(null)
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
            label="Producto"
            value={selectedRow.product.name}
            disabled
            backgroundColor="white"
          />
          <OutlinedInput
            label="Stock Inicial"
            keyboardType="numeric"
            value={String(selectedRow.initialStock)}
            backgroundColor="white"
            onSubmitEditing={() => (ref as any)?.current.focus()}
            onChangeText={(value: any) => {
              setSelectedRow({ ...selectedRow, initialStock: value })
            }}
          />
          <OutlinedInput
            inputRef={ref}
            label="Stock final"
            keyboardType="numeric"
            value={String(selectedRow.finalStock)}
            backgroundColor="white"
            onSubmitEditing={shouldShowNext ? onNext : onSubmit}
            onChangeText={(value: any) => {
              setSelectedRow({ ...selectedRow, finalStock: value })
            }}
          />
          {shouldShowNext && <StyledButton label="Siguiente" onPress={onNext}></StyledButton>}
          <StyledButton label="Guardar" onPress={onSubmit}></StyledButton>
        </View>
      )}
    </MutateEntityModal>
  )
}

export default EditStockModal
