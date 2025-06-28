// src/components/FixedBottomBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FixedBottomBarProps {
  text: string;
  color?: 'yellow' | 'black';
  onPress?: () => void;
  disabled?: boolean;
}

const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  text,
  color = 'black',
  onPress,
  disabled = false,
}) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[
          styles.settleButton,
          color === 'yellow' ? styles.yellowButton : styles.blackButton,
          disabled && styles.disabledButton,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.settleButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#eeeeee',
    paddingVertical: 15,
    paddingBottom: 34,
    alignItems: 'center',
  },
  settleButton: {
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowButton: {
    backgroundColor: '#F6AE24',
  },
  blackButton: {
    backgroundColor: '#000000',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  settleButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default FixedBottomBar;
