import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Typography from '../Typography'

interface CardProps {
    title: string
}

const Card = (props: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', width: '100%', height:'100%', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <Typography variant={'h5'} color={'light'}>{props.title}</Typography>
        <View style={styles.container}>
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
    content: { 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80%',
        gap: 10,
    },

})