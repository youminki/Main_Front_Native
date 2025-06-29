import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUserStyle, updateUserStyle, UserStyle } from '../api/user/userApi';

interface FormData {
  height: string;
  size: string;
  dress: string;
  top: string;
  bottom: string;
  brand: string;
  shoulder?: string;
  chest?: string;
  waist?: string;
  sleeve?: string;
}

const HEIGHT_OPTIONS = Array.from(
  { length: 190 - 140 + 1 },
  (_, i) => `${140 + i}`
);
const WEIGHT_RANGE = Array.from({ length: 90 - 30 + 1 }, (_, i) => `${30 + i}`);
const SIZE_OPTIONS = ['44', '55', '66', '77'] as string[];

const SIZE_LABELS: Record<(typeof SIZE_OPTIONS)[number], string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

const MyStyle: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    height: '',
    size: '',
    dress: '',
    top: '',
    bottom: '',
    brand: '',
    shoulder: '',
    chest: '',
    waist: '',
    sleeve: '',
  });

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // react-query로 스타일 데이터 패칭
  const { data } = useUserStyle();

  useEffect(() => {
    if (!data) return;
    setFormData({
      height: data.height != null ? data.height.toString() : '',
      size: data.weight != null ? data.weight.toString() : '',
      dress: data.dressSize ?? '',
      top: data.topSize ?? '',
      bottom: data.bottomSize ?? '',
      brand: (data.preferredBrands ?? []).join(', '),
      shoulder: data.shoulderWidth != null ? data.shoulderWidth.toString() : '',
      chest:
        data.chestCircumference != null
          ? data.chestCircumference.toString()
          : '',
      waist:
        data.waistCircumference != null
          ? data.waistCircumference.toString()
          : '',
      sleeve: data.sleeveLength != null ? data.sleeveLength.toString() : '',
    });
    setSelectedBrands(data.preferredBrands ?? []);
  }, [data]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload: Partial<UserStyle> = {
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.size ? parseFloat(formData.size) : undefined,
        dressSize: formData.dress,
        topSize: formData.top,
        bottomSize: formData.bottom,
        preferredBrands: selectedBrands,
        shoulderWidth: formData.shoulder
          ? parseFloat(formData.shoulder)
          : undefined,
        chestCircumference: formData.chest
          ? parseFloat(formData.chest)
          : undefined,
        waistCircumference: formData.waist
          ? parseFloat(formData.waist)
          : undefined,
        sleeveLength: formData.sleeve ? parseFloat(formData.sleeve) : undefined,
      };
      await updateUserStyle(payload);

      Alert.alert('성공', '스타일 정보가 업데이트되었습니다.');
    } catch (e) {
      console.error(e);
      Alert.alert('오류', '업데이트 중 오류가 발생했습니다.');
    }
  };

  const renderPicker = (
    field: keyof FormData,
    options: string[],
    placeholder: string,
    suffix: string = ''
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{placeholder}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => handleInputChange(field, value)}
          style={styles.picker}
        >
          <Picker.Item label={`${placeholder} 선택`} value='' />
          {options.map((option) => (
            <Picker.Item
              key={option}
              label={`${option}${suffix}`}
              value={option}
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>내 스타일</Text>
          <Text style={styles.subtitle}>나만의 스타일을 설정해보세요</Text>
        </View>

        {/* 키, 몸무게 */}
        <View style={styles.row}>
          {renderPicker('height', HEIGHT_OPTIONS, '키', ' cm')}
          {renderPicker('size', WEIGHT_RANGE, '몸무게', ' kg')}
        </View>

        <View style={styles.divider} />

        {/* 원피스·상의·하의 */}
        <View style={styles.row}>
          {renderPicker('dress', SIZE_OPTIONS, '원피스')}
          {renderPicker('top', SIZE_OPTIONS, '상의')}
          {renderPicker('bottom', SIZE_OPTIONS, '하의')}
        </View>

        <View style={styles.divider} />

        {/* 상세 치수 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상세 치수</Text>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>어깨</Text>
              <TextInput
                style={styles.textInput}
                value={formData.shoulder}
                onChangeText={(value) => handleInputChange('shoulder', value)}
                placeholder='어깨 너비 (cm)'
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>가슴</Text>
              <TextInput
                style={styles.textInput}
                value={formData.chest}
                onChangeText={(value) => handleInputChange('chest', value)}
                placeholder='가슴 둘레 (cm)'
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>허리</Text>
              <TextInput
                style={styles.textInput}
                value={formData.waist}
                onChangeText={(value) => handleInputChange('waist', value)}
                placeholder='허리 둘레 (cm)'
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>소매</Text>
              <TextInput
                style={styles.textInput}
                value={formData.sleeve}
                onChangeText={(value) => handleInputChange('sleeve', value)}
                placeholder='소매 길이 (cm)'
                keyboardType='numeric'
              />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 선호 브랜드 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>선호 브랜드</Text>
          <TextInput
            style={styles.textInput}
            value={formData.brand}
            onChangeText={(value) => handleInputChange('brand', value)}
            placeholder='선호하는 브랜드를 입력하세요'
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#f6ac36',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyStyle;
