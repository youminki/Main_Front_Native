import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignupContemporary } from '../hooks/ValidationYup';
import InputField from '../components/InputField';
import Theme from '../styles/Theme';
import Modal from '../components/Melpik/CreateMelpik/Settings/Modal';
import { CustomSelect } from '../components/CustomSelect';
import FixedBottomBar from '../components/FixedBottomBar';

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
  productCount: string;
  exposureFrequency: string;
}

// 140cm~190cm, 5cm 단위
const HEIGHT_OPTIONS = Array.from(
  { length: 190 - 140 + 1 },
  (_, i) => `${140 + i}`
);
// 30kg~90kg, 1kg 단위
const WEIGHT_RANGE = Array.from({ length: 90 - 30 + 1 }, (_, i) => `${30 + i}`);
const SIZE_OPTIONS = ['44', '55', '66', '77'] as const;

const ContemporarySettings: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaSignupContemporary),
    mode: 'all',
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data: ', data);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleBrandSelect = (brands: string[]) => {
    setSelectedBrands(brands);
    setValue('brand', brands.join(', '));
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* 키 / 몸무게 */}
          <Row>
            <InputField
              label='키'
              id='height'
              as={CustomSelect}
              error={errors.height}
              {...register('height')}
            >
              <option value='' disabled hidden>
                키 선택
              </option>
              {HEIGHT_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h} cm
                </option>
              ))}
            </InputField>

            <InputField
              label='몸무게'
              id='size'
              as={CustomSelect}
              error={errors.size}
              {...register('size')}
            >
              <option value='' disabled hidden>
                몸무게 선택
              </option>
              {WEIGHT_RANGE.map((w) => (
                <option key={w} value={w}>
                  {w} kg
                </option>
              ))}
            </InputField>
          </Row>
          <Divider />

          {/* 제품 사이즈 */}
          <Row>
            {(['dress', 'top', 'bottom'] as const).map((id) => {
              const labels = {
                dress: '상의 사이즈',
                top: '원피스 사이즈',
                bottom: '하의 사이즈',
              };
              return (
                <InputField
                  key={id}
                  label={labels[id]}
                  id={id}
                  as={CustomSelect}
                  error={(errors as any)[id]}
                  {...register(id)}
                >
                  <option value='' disabled hidden>
                    {labels[id]} 선택
                  </option>
                  {SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size} (
                      {['S', 'M', 'L', 'XL'][SIZE_OPTIONS.indexOf(size)]})
                    </option>
                  ))}
                </InputField>
              );
            })}
          </Row>
          <Divider />

          {/* 브랜드 */}
          <Row>
            <InputField
              label='선호 브랜드 선택 (최대 3가지)'
              id='brand'
              type='text'
              placeholder='브랜드 3가지를 선택하세요'
              error={errors.brand}
              {...register('brand')}
              value={selectedBrands.join(', ') || ''}
              buttonLabel='선택하기'
              onButtonClick={openModal}
            />
          </Row>
          <Divider />

          {/* 어깨너비 / 가슴둘레 */}
          <Row>
            <Controller
              name='shoulder'
              control={control}
              render={({ field }) => (
                <InputField
                  label='어깨너비 (선택)'
                  id='shoulder'
                  value={field.value ?? ''}
                  placeholder='어깨너비(cm)'
                  error={errors.shoulder}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const num = e.target.value.replace(/\D/g, '');
                    field.onChange(num ? `${num}cm` : '');
                  }}
                />
              )}
            />
            <Controller
              name='chest'
              control={control}
              render={({ field }) => (
                <InputField
                  label='가슴둘레 (선택)'
                  id='chest'
                  value={field.value ?? ''}
                  placeholder='가슴둘레(cm)'
                  error={errors.chest}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const num = e.target.value.replace(/\D/g, '');
                    field.onChange(num ? `${num}cm` : '');
                  }}
                />
              )}
            />
          </Row>

          {/* 허리둘레 / 소매길이 */}
          <Row>
            <Controller
              name='waist'
              control={control}
              render={({ field }) => (
                <InputField
                  label='허리둘레 (선택)'
                  id='waist'
                  value={field.value ?? ''}
                  placeholder='허리둘레(cm)'
                  error={errors.waist}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const num = e.target.value.replace(/\D/g, '');
                    field.onChange(num ? `${num}cm` : '');
                  }}
                />
              )}
            />
            <Controller
              name='sleeve'
              control={control}
              render={({ field }) => (
                <InputField
                  label='소매길이 (선택)'
                  id='sleeve'
                  value={field.value ?? ''}
                  placeholder='소매길이(cm)'
                  error={errors.sleeve}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const num = e.target.value.replace(/\D/g, '');
                    field.onChange(num ? `${num}cm` : '');
                  }}
                />
              )}
            />
          </Row>
        </Form>

        {/* 모달 & 버튼 */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleBrandSelect}
          selectedBrands={selectedBrands}
        />
        <FixedBottomBar
          text='정보 변경'
          color='yellow'
          onClick={handleSubmit(onSubmit)}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ContemporarySettings;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1rem;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;
const Divider = styled.hr`
  border: none;
  width: 100%;
  border-top: 1px solid #eee;
  margin: 1.5rem 0;
`;
