import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { GeistMono } from 'geist/font/mono'

type Variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'body'
  | 'bold'
  | 'bolder'
  | 'mini'
type Colors = 'dark' | 'light' | 'primary' | 'danger' | 'gray' | 'yellow'
export type Fonts = 'roboto' | 'poppins' | 'geist'

export interface TypographyProps extends TextProps {
  variant: Variants
  children: React.ReactNode
  justify?: 'left' | 'right' | 'center'
  style?: StyleProp<TextStyle>
  color?: Colors
  font?: Fonts
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style = {},
  justify = undefined,
  color = 'dark',
  font = 'poppins',
  ...rest
}) => {
  return (
    <Text
      style={[{ textAlign: justify }, styles[font], styles[variant], styles[color], style]}
      {...rest}
    >
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create({
  roboto: {
    fontFamily: 'Roboto',
  },
  poppins: {
    fontFamily: 'Poppins',
  },
  geist: {
    fontFamily: 'Geist',
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
  yellow: {
    color: Colors.yellow[600],
  },
  bold: {
    fontWeight: 600,
    color: Colors.primary[800],
  },
  bolder: {
    lineHeight: 32,
    fontSize: 24,
    fontWeight: 900,
    color: Colors.primary[800],
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
  mini: {
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 24,
  },
})
