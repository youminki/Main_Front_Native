import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface FixedBottomBarProps {
  text: string;
  color: 'black' | 'yellow';
  onPress: () => void;
  disabled?: boolean;
  type?: string;
  onClick?: () => void;
}

const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  text,
  color,
  onPress,
  disabled = false,
  type,
  onClick,
}) => {
  const handlePress = () => {
    if (onPress) onPress();
    if (onClick) onClick();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          color === 'black' ? styles.blackButton : styles.yellowButton,
          disabled && styles.buttonDisabled,
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.buttonText,
            color === 'black'
              ? styles.blackButtonText
              : styles.yellowButtonText,
            disabled && styles.buttonTextDisabled,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButton: {
    backgroundColor: '#000',
  },
  yellowButton: {
    backgroundColor: '#f6ae24',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  blackButtonText: {
    color: '#fff',
  },
  yellowButtonText: {
    color: '#000',
  },
  buttonTextDisabled: {
    color: '#999',
  },
});

export default FixedBottomBar;
