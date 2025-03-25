import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
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

const ContemporarySettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaSignupContemporary),
    mode: 'all',
  });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
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
          <Row>
            <InputField
              label='기본정보'
              id='height'
              as={CustomSelect}
              error={errors.height}
              {...register('height', { required: true })}
            >
              <option value='' disabled selected hidden>
                키 선택
              </option>
              <option value='160'>160 cm</option>
              <option value='165'>165 cm</option>
              <option value='170'>170 cm</option>
              <option value='175'>175 cm</option>
            </InputField>
            <InputField
              label=''
              id='size'
              as={CustomSelect}
              error={errors.size}
              {...register('size', { required: true })}
            >
              <option value='' disabled selected hidden>
                몸무게 선택
              </option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}kg
                </option>
              ))}
            </InputField>
          </Row>
          <Divider />

          <Row>
            <InputField
              label='착용 제품사이즈'
              id='dress'
              as={CustomSelect}
              error={errors.dress}
              {...register('dress', { required: true })}
            >
              <option value='' disabled selected hidden>
                상의 사이즈 선택
              </option>
              <option value='44'>44 (S)</option>
              <option value='55'>55 (M)</option>
              <option value='66'>66 (L)</option>
              <option value='77'>77 (XL)</option>
            </InputField>
            <InputField
              label=''
              id='top'
              as={CustomSelect}
              error={errors.top}
              {...register('top', { required: true })}
            >
              <option value='' disabled selected hidden>
                원피스 사이즈 선택
              </option>
              <option value='44'>44 (S)</option>
              <option value='55'>55 (M)</option>
              <option value='66'>66 (L)</option>
              <option value='77'>77 (XL)</option>
            </InputField>
            <InputField
              label=''
              id='bottom'
              as={CustomSelect}
              error={errors.bottom}
              {...register('bottom', { required: true })}
            >
              <option value='' disabled selected hidden>
                하의 사이즈 선택
              </option>
              <option value='44'>44 (S)</option>
              <option value='55'>55 (M)</option>
              <option value='66'>66 (L)</option>
              <option value='77'>77 (XL)</option>
            </InputField>
          </Row>
          <Divider />

          <Row>
            <InputField
              label='선호 브랜드 선택(최대 3가지)'
              id='brand'
              type='text'
              placeholder='브랜드 3가지를 선택하세요'
              error={errors.brand}
              {...register('brand')}
              value={selectedBrands.join(', ') || '브랜드 3가지를 선택하세요'}
              buttonLabel='선택하기'
              onButtonClick={openModal}
            />
          </Row>
          <Divider />
          {/* 추가: 어깨너비, 가슴둘레 */}
          <Row>
            <InputField
              label='어깨너비 cm (선택)'
              id='shoulder'
              type='text'
              placeholder='어깨너비를 입력하세요'
              error={errors.shoulder}
              {...register('shoulder')}
            />
            <InputField
              label='가슴둘레 cm (선택)'
              id='chest'
              type='text'
              placeholder='가슴둘레를 입력하세요'
              error={errors.chest}
              {...register('chest')}
            />
          </Row>

          {/* 추가: 허리둘레, 소매길이 */}
          <Row>
            <InputField
              label='허리둘레 cm (선택)'
              id='waist'
              type='text'
              placeholder='허리둘레를 입력하세요'
              error={errors.waist}
              {...register('waist')}
            />
            <InputField
              label='소매길이 cm (선택)'
              id='sleeve'
              type='text'
              placeholder='소매길이를 입력하세요'
              error={errors.sleeve}
              {...register('sleeve')}
            />
          </Row>
        </Form>

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

  background-color: #fff;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const Divider = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid #eeeeee;
  margin-top: 30px;
`;
