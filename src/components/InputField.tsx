// src/components/InputField.tsx

import React, { useState, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button02 from './Button02';

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  error?: { message: string };
  buttonLabel?: string;
  buttonColor?: 'yellow' | 'blue' | 'red';
  onButtonPress?: () => void;
  prefix?: string;
  prefixcontent?: string | React.ReactNode;
  suffixcontent?: string | React.ReactNode;
  useToggle?: boolean;
  options?: string[];
  onSelectChange?: (value: string) => void;
  readOnly?: boolean;
  disabledOptions?: string[];
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  [key: string]: any;
};

function parsePrefixContent(content: string) {
  const tokens = content.split(/(해당없음|\(.*?\)|\|)/g);
  let applyGray = false;
  return tokens.map((token, i) => {
    if (token === '|') {
      applyGray = true;
      return (
        <Text key={i} style={styles.grayText}>
          {token}
        </Text>
      );
    }
    if (applyGray) {
      return (
        <Text key={i} style={styles.grayText}>
          {token}
        </Text>
      );
    }
    if (
      (token.startsWith('(') && token.endsWith(')')) ||
      token === '해당없음'
    ) {
      return (
        <Text key={i} style={styles.grayText}>
          {token}
        </Text>
      );
    }
    return <Text key={i}>{token}</Text>;
  });
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      id,
      type = 'text',
      error,
      buttonLabel,
      buttonColor = 'yellow',
      onButtonPress,
      prefix,
      prefixcontent,
      suffixcontent,
      useToggle = false,
      options,
      onSelectChange,
      readOnly = false,
      disabledOptions = [],
      value,
      onChangeText,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState<string>(
      options && options.length > 0 ? options[0] : ''
    );

    const handleSelectChange = (val: string) => {
      setSelectedOption(val);
      onSelectChange?.(val);
    };

    const renderPrefixContent = () => {
      if (!prefixcontent) return null;
      if (typeof prefixcontent === 'string') {
        return (
          <Text style={styles.prefixContentText}>
            {parsePrefixContent(prefixcontent)}
          </Text>
        );
      }
      return <Text style={styles.prefixContentText}>{prefixcontent}</Text>;
    };

    const renderSuffixContent = () => {
      if (!suffixcontent) return null;
      return <Text style={styles.suffixContentText}>{suffixcontent}</Text>;
    };

    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.label, !label && styles.hiddenLabel]}>
          {label.split('(')[0] || '​'}
          {label.includes('(') && (
            <Text style={styles.grayText}>{`(${label.split('(')[1]}`}</Text>
          )}
        </Text>

        <View style={styles.inputRow}>
          {prefix && <Text style={styles.prefixText}>{prefix}</Text>}
          <View
            style={[styles.inputWrapper, readOnly && styles.readOnlyWrapper]}
          >
            {prefixcontent && renderPrefixContent()}

            {options ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={handleSelectChange}
                  enabled={!readOnly}
                  style={styles.picker}
                >
                  {options.map((option: string) => (
                    <Picker.Item
                      key={option}
                      label={option}
                      value={option}
                      enabled={!disabledOptions.includes(option)}
                    />
                  ))}
                </Picker>
              </View>
            ) : (
              <TextInput
                ref={ref}
                style={[styles.input, readOnly && styles.readOnlyInput]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={!readOnly}
                {...rest}
              />
            )}

            {suffixcontent && renderSuffixContent()}

            {buttonLabel && onButtonPress && !readOnly && (
              <View style={styles.buttonWrapper}>
                <Button02 onPress={onButtonPress} color={buttonColor}>
                  {buttonLabel}
                </Button02>
              </View>
            )}

            {useToggle && <View style={styles.toggleWrapper} />}
          </View>
        </View>

        <View style={styles.errorContainer}>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  hiddenLabel: {
    opacity: 0,
  },
  grayText: {
    paddingLeft: 3,
    color: '#888888',
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  prefixContentText: {
    marginLeft: 10,
    fontWeight: '800',
    fontSize: 13,
    color: '#000000',
  },
  suffixContentText: {
    marginLeft: 'auto',
    marginRight: 10,
    fontSize: 13,
    color: '#999999',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    height: 57,
    flex: 1,
    backgroundColor: 'white',
  },
  readOnlyWrapper: {
    backgroundColor: '#f5f5f5',
  },
  buttonWrapper: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  toggleWrapper: {
    position: 'absolute',
    right: 40,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    borderWidth: 0,
    paddingHorizontal: 11,
    fontSize: 13,
    backgroundColor: 'transparent',
    color: '#000000',
  },
  readOnlyInput: {
    backgroundColor: '#f5f5f5',
    color: '#999999',
  },
  pickerContainer: {
    flex: 1,
    height: '100%',
  },
  picker: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  errorContainer: {
    minHeight: 18,
    marginTop: 6,
    marginLeft: 4,
  },
  errorMessage: {
    color: 'blue',
    fontSize: 12,
  },
});

export default InputField;
