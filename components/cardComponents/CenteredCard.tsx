import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import Typography from '../Typography'

interface CardProps {
    title: string
}

const Card = (props: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Typography style={{width: '100%', textAlign: 'center', margin: 10,}} variant='h5' color='light'>{props.title}</Typography>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
          <Image src={'https://reactnative.dev/img/tiny_logo.png'} style={{resizeMode: 'contain', width: 50, height: 50}}/>
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderWidth: 4,
      borderColor: 'red',
      height: '100%',
    },

    card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#323232',
      width: '100%',
      maxHeight: 400,
    },

    content: { 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flexDirection: 'row',
      borderWidth: 2,
      flexWrap: 'wrap',
      gap: 10,
    },

})