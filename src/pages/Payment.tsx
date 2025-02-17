import { useState } from 'react';

const Payment = () => {
  const [recipient, setRecipient] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'>
      {/* 수령인 입력 */}
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        수령인 *
      </label>
      <input
        type='text'
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder='이름을 입력하세요'
        className='w-full p-3 border rounded-md mb-4 bg-gray-100'
      />

      {/* 배송 방법 */}
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        배송방법 *
      </label>
      <div className='relative w-full mb-4'>
        <select className='w-full p-3 border rounded-md appearance-none bg-gray-100'>
          <option>매니저 배송</option>
        </select>
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          ▼
        </div>
      </div>

      {/* 매니저 배송 설명 */}
      <div className='bg-gray-100 p-4 rounded-md mb-4 text-sm'>
        <p className='font-semibold'>※ 매니저 배송 이란..?</p>
        <p>매니저가 직접 고객에게 전달하는 방식으로 당일 배송가능.</p>
        <p className='text-orange-500 font-bold'>
          서비스 지역 [ 서울 / 경기 일부 ]
        </p>
        <p className='text-xs text-gray-500'>( 결제 시 추가비용 발생 )</p>
      </div>

      {/* 배송지 입력 */}
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        배송지 입력 *
      </label>
      <div className='flex gap-2 mb-2'>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='주소를 검색하세요'
          className='flex-1 p-3 border rounded-md bg-gray-100'
        />
        <button className='px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md'>
          검색
        </button>
      </div>
      <button className='w-full py-3 bg-black text-white font-semibold rounded-md mb-2'>
        배송목록
      </button>
      <input
        type='text'
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        placeholder='상세주소를 입력하세요'
        className='w-full p-3 border rounded-md bg-gray-100'
      />
    </div>
  );
};

export default Payment;
