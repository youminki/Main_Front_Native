import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCardRegistration } from '../../../hooks/ValidationYup';

import InputField from '../../../components/InputField';
import ReusableModal from '../../../components/ReusableModal';
import ReusableModal2 from '../../../components/ReusableModal2';
import FixedBottomBar from '../../../components/FixedBottomBar';

interface CardFormValues {
  cardNumber: string;
  cardExpiration: string;
  cardPassword: string;
  birthOrBusiness: string;
  cardIssuer?: string;
}

const AddCard: React.FC = () => {
  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: yupResolver(schemaCardRegistration),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardExpiration: '',
      cardPassword: '',
      birthOrBusiness: '',
      cardIssuer: '',
    },
  });

  const onSubmit = (data: CardFormValues) => {
    console.log('Form Submit Data:', data);
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationConfirm = () => {
    setIsRegistrationModalOpen(false);
    setIsFinalModalOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsFinalModalOpen(false);
    navigation.navigate('PaymentMethod' as never);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.agreementSection}>
            <TouchableOpacity
              style={styles.checkboxLabel}
              onPress={() => setIsAgree(!isAgree)}
            >
              <View
                style={[styles.checkbox, isAgree && styles.checkboxChecked]}
              >
                {isAgree && <View style={styles.checkmark} />}
              </View>
              <Text style={styles.labelText}>
                카드등록에 따른 동의{' '}
                <Text style={styles.requiredText}>(필수)</Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                이용 전 필수사항 및 주의사항 안내.
              </Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => setIsModalOpen(true)}
              >
                <Text style={styles.viewAllButtonText}>전체보기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <InputField
            label='카드사 선택 *'
            id='cardIssuer'
            options={['신한카드', '국민카드', '우리카드', '하나카드']}
            error={errors.cardIssuer}
            {...register('cardIssuer')}
            onSelectChange={(val: string) => console.log('카드사 선택:', val)}
          />

          <Controller
            name='cardNumber'
            control={control}
            render={({ field }) => {
              const handleCardNumberChange = (text: string) => {
                const rawValue = text.replace(/[^0-9]/g, '').slice(0, 16);
                const formatted = rawValue.match(/.{1,4}/g)?.join('-') || '';
                field.onChange(formatted);
              };

              return (
                <InputField
                  label='카드번호 (16자리) *'
                  id='cardNumber'
                  placeholder='카드번호를 입력해주세요.'
                  maxLength={19}
                  error={errors.cardNumber}
                  value={field.value}
                  onChange={handleCardNumberChange}
                />
              );
            }}
          />

          <View style={styles.twoColumns}>
            <View style={styles.columnItem}>
              <Controller
                name='cardExpiration'
                control={control}
                render={({ field }) => {
                  const handleExpirationChange = (text: string) => {
                    const rawValue = text.replace(/[^0-9]/g, '').slice(0, 4);
                    let formatted = rawValue;
                    if (rawValue.length > 2) {
                      formatted =
                        rawValue.slice(0, 2) + '/' + rawValue.slice(2);
                    }
                    field.onChange(formatted);
                  };
                  return (
                    <InputField
                      label='유효기간 *'
                      id='cardExpiration'
                      placeholder='MM/YY'
                      maxLength={5}
                      error={errors.cardExpiration}
                      value={field.value}
                      onChange={handleExpirationChange}
                    />
                  );
                }}
              />
            </View>
            <View style={styles.columnItem}>
              <InputField
                label='비밀번호 (앞 2자리) *'
                id='cardPassword'
                placeholder='00'
                maxLength={2}
                type='password'
                error={errors.cardPassword}
                {...register('cardPassword')}
              />
            </View>
          </View>

          <InputField
            label='생년월일 6자리 or 사업자번호 10자리 (법인) *'
            id='birthOrBusiness'
            placeholder='800101 또는 3124512345 ( - 없이 입력해주세요 )'
            maxLength={10}
            error={errors.birthOrBusiness}
            {...register('birthOrBusiness')}
          />

          <Text style={styles.guideMessage}>
            ※ 결제를 위한 등록은 본인카드 그리고 사업자는 법인 카드가
            가능합니다.
            {'\n'}
            자세한 문의 ( 평일 09:00 ~ 18:00 ) 서비스팀에 남겨주세요.
          </Text>

          <ReusableModal
            visible={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title='카드 등록'
          >
            <Text>카드 등록이 완료되었습니다.</Text>
          </ReusableModal>
        </View>
      </ScrollView>

      <FixedBottomBar
        text='카드 등록'
        color='yellow'
        onPress={handleSubmit(onSubmit)}
      />

      <ReusableModal
        visible={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        title='등록 확인'
      >
        <Text>카드를 등록하시겠습니까?</Text>
      </ReusableModal>

      <ReusableModal
        visible={isFinalModalOpen}
        onClose={() => setIsFinalModalOpen(false)}
        title='완료'
      >
        <Text>카드 등록이 완료되었습니다.</Text>
      </ReusableModal>
    </>
  );
};

export default AddCard;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    padding: 16,
  },
  agreementSection: {
    flexDirection: 'column',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#f4f4f4',
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  labelText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000000',
  },
  requiredText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 13,
    color: '#999999',
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#aaa',
  },
  checkmark: {
    width: 10,
    height: 5,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'orange',
    transform: [{ rotate: '-45deg' }],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  infoText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 13,
    color: '#aaaaaa',
  },
  viewAllButton: {
    width: 69,
    height: 34,
    backgroundColor: '#000000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  columnItem: {
    flex: 1,
  },
  guideMessage: {
    marginTop: 30,
    fontSize: 12,
    color: '#999999',
    lineHeight: 18,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
