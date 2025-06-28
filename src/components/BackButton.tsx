import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={handleClick}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>←</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#000',
  },
});

export default BackButton;
