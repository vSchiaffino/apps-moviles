import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle' | 'body'
type Colors = 'dark' | 'light' | 'primary' | 'danger' | 'gray'
type Fonts = 'roboto' | 'poppins'

export interface TypographyProps {
  variant: Variants
  children: React.ReactNode
  style?: StyleProp<TextStyle>
  color?: Colors
  font?: Fonts
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style = {},
  color = 'dark',
  font = 'poppins',
}) => {
  return <Text style={[styles[font], styles[variant], styles[color], style]}>{children}</Text>
}

export default Typography

const styles = StyleSheet.create({
  roboto: {
    fontFamily: 'Roboto',
  },
  poppins: {
    fontFamily: 'Poppins',
  },
  dark: {
    color: Colors.gray[900],
  },
  light: {
    color: 'white',
  },
  danger: {
    color: Colors.danger[600],
  },
  primary: {
    color: Colors.primary[600],
  },
  gray: {
    color: Colors.gray[600],
  },
  h1: {
    fontSize: 96,
    fontWeight: 300,
    lineHeight: 112,
  },
  h2: {
    fontSize: 60,
    fontWeight: 300,
    lineHeight: 72,
  },
  h3: {
    fontSize: 48,
    fontWeight: 400,
    lineHeight: 56,
  },
  h4: {
    fontSize: 34,
    fontWeight: 400,
    lineHeight: 42,
  },
  h5: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 32,
  },
  h6: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
  },
})
