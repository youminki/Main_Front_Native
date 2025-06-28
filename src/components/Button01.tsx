// src/components/Button01.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Button01Props {
  children: React.ReactNode;
  /** 흰색 텍스트/배경 사용 */
  white?: boolean;
  /** 회색 텍스트/배경 사용 */
  gray?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onPress?: () => void;
  /** 추가 스타일 */
  style?: any;
}

const Button01: React.FC<Button01Props> = ({
  children,
  white,
  gray,
  disabled,
  onPress,
  style,
  ...props
}) => {
  const buttonStyle = [
    styles.button,
    white && styles.whiteButton,
    gray && styles.grayButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.text,
    white && styles.whiteText,
    gray && styles.grayText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    padding: 15,
    marginTop: 20,
    backgroundColor: '#f6ae24',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  grayButton: {
    backgroundColor: '#cccccc',
  },
  disabledButton: {
    backgroundColor: '#eeeeee',
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 17.68,
    textAlign: 'center',
    color: '#ffffff',
  },
  whiteText: {
    color: '#333333',
  },
  grayText: {
    color: '#666666',
  },
  disabledText: {
    color: '#aaaaaa',
  },
});

export default Button01;
