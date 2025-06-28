import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Button02Props {
  children: React.ReactNode;
  onPress?: () => void;
  color: 'yellow' | 'blue' | 'red' | 'black';
  disabled?: boolean;
  style?: any;
}

const Button02: React.FC<Button02Props> = ({
  children,
  onPress,
  color,
  disabled,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`${color}Button`],
    disabled && styles.disabledButton,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 69,
    minHeight: 34,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  yellowButton: {
    backgroundColor: '#f6ae24',
  },
  blueButton: {
    backgroundColor: '#007bff',
  },
  redButton: {
    backgroundColor: '#ff4d4d',
  },
  blackButton: {
    backgroundColor: '#333333',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  text: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center',
  },
});

export default Button02;
