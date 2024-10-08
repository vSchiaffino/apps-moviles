import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Typography from './Typography'

type Variants = 'center' |  //contenido centrado
                'columns'|  //contenido en dos columnas
                'aside' |   //contenido en dos columnas (una de 25% y otra de 75%)
                'quarters'| //contenido dividio en 4 cuadrantes (25%)
                'list'      //contenido en forma de lista

interface CardProps {
    title: string
    variant: Variants 
}

const Card = (props: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', width: '100%', height:'100%', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <Typography variant={'h5'} color={'light'}>{props.title}</Typography>
        <View style={props.variant === 'center' ? styles.centeredContent : props.variant === 'columns' ? styles.columnsContent : styles.centeredContent}>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
            <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
        </View>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#323232',
        width: '100%',
        height: '50%',
        borderRadius: 10,
        padding: 20
    },
    centeredContent: { 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        gap: 10,
    },
    columnsContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexBasis: '100%',
        flex: 1,
        width: '100%',
        height: '80%',
        gap: 10,
        borderWidth: 4,
    }

})