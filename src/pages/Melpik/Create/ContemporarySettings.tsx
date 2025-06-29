import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignupContemporary } from '../../../hooks/ValidationYup';
import InputField from '../../../components/InputField';
import AgreementSection from '../../../components/Melpik/CreateMelpik/Settings/AgreementSection';
import BottomBar from '../../../components/BottomNav2';
import Modal from '../../../components/Melpik/CreateMelpik/Settings/Modal';
import CustomSelect from '../../../components/CustomSelect';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  height: string;
  size: string;
  dress: string;
  top: string;
  bottom: string;
  brand: string;
  productCount: string;
  exposureFrequency: string;
}

const ContemporarySettings: React.FC = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaSignupContemporary),
    mode: 'all',
  });

  const [productCount] = useState<string>('상품 6개');
  const [exposureFrequency] = useState<string>('월 2회');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const onSubmit = (data: FormData) => {
    // console.log('Form Data: ', data);
    Alert.alert('성공', '설정이 완료되었습니다.');
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleBrandSelect = (brands: string[]) => {
    setSelectedBrands(brands);
    setValue('brand', brands.join(', '));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <AgreementSection />

        <View style={styles.row}>
          <Controller
            control={control}
            name='height'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='기본정보'
                id='height'
                as={CustomSelect}
                error={errors.height}
                value={value}
                onValueChange={onChange}
              >
                <option value='160'>160 cm</option>
                <option value='165'>165 cm</option>
                <option value='170'>170 cm</option>
                <option value='175'>175 cm</option>
              </InputField>
            )}
          />
          <Controller
            control={control}
            name='size'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='사이즈'
                id='size'
                as={CustomSelect}
                error={errors.size}
                value={value}
                onValueChange={onChange}
              >
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='L'>L</option>
              </InputField>
            )}
          />
        </View>
        <View style={styles.grayLine} />

        <View style={styles.row}>
          <Controller
            control={control}
            name='dress'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='착용스펙 상세입력'
                id='dress'
                as={CustomSelect}
                error={errors.dress}
                value={value}
                onValueChange={onChange}
              >
                <option value='원피스'>원피스</option>
              </InputField>
            )}
          />
          <Controller
            control={control}
            name='top'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='상의'
                id='top'
                as={CustomSelect}
                error={errors.top}
                value={value}
                onValueChange={onChange}
              >
                <option value='상의'>상의</option>
              </InputField>
            )}
          />
          <Controller
            control={control}
            name='bottom'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='하의'
                id='bottom'
                as={CustomSelect}
                error={errors.bottom}
                value={value}
                onValueChange={onChange}
              >
                <option value='하의'>하의</option>
              </InputField>
            )}
          />
        </View>
        <View style={styles.grayLine} />

        <View style={styles.row}>
          <Controller
            control={control}
            name='brand'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='선호 브랜드 선택(최대 3가지)'
                id='brand'
                type='text'
                placeholder='브랜드 3가지를 선택하세요'
                error={errors.brand}
                value={selectedBrands.join(', ') || '브랜드 3가지를 선택하세요'}
                onChangeText={onChange}
                editable={false}
                buttonLabel='선택하기'
                onButtonClick={openModal}
              />
            )}
          />
        </View>
        <View style={styles.grayLine} />

        <View style={styles.row}>
          <Controller
            control={control}
            name='productCount'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='상품 노출수 설정'
                id='productCount'
                as={CustomSelect}
                value={productCount}
                error={errors.productCount}
                onValueChange={onChange}
              >
                <option value='상품 6개'>상품 6개</option>
                <option value='상품 12개'>상품 12개</option>
              </InputField>
            )}
          />

          <Controller
            control={control}
            name='exposureFrequency'
            render={({ field: { onChange, value } }) => (
              <InputField
                label='노출기간 설정'
                id='exposureFrequency'
                as={CustomSelect}
                value={exposureFrequency}
                error={errors.exposureFrequency}
                onValueChange={onChange}
              >
                <option value='월 1회'>월 1회</option>
                <option value='월 2회'>월 2회</option>
              </InputField>
            )}
          />
        </View>
      </ScrollView>

      <BottomBar buttonText='설정완료' onPress={handleSubmit(onSubmit)} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleBrandSelect}
        selectedBrands={selectedBrands}
      />
    </View>
  );
};

export default ContemporarySettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  grayLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    width: '100%',
    marginVertical: 10,
  },
});
