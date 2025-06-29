import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import StatsSection from '../../../components/StatsSection';

const FAQ_DATA = [
  {
    id: 1,
    category: '서비스 - 포인트',
    question: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    answer:
      '포인트는 일반 대여 또는 제품을 구매하는 데 사용하실 수 있고, 결제 페이지 - 포인트 입력란을 통해 사용하시면 됩니다.',
  },
  {
    id: 2,
    category: '서비스 - 이용방법',
    question: '멜픽서비스의 포인트는 어떻게 사용하나요?',
    answer: '서비스 이용 방법에 대한 답변을 여기에 작성하세요.',
  },
  {
    id: 3,
    category: '주문 - 예약변경',
    question: '대여 신청한 제품의 수령 주소지를 변경하는 방법은?',
    answer: '주문/예약 변경 관련 답변을 여기에 작성하세요.',
  },
  {
    id: 4,
    category: '결제 - 카드결제',
    question: '제품구매 시 할부 개월을 변경하는 방법은?',
    answer:
      '카드결제 시 할부 개월 수 변경 방법에 대한 답변을 여기에 작성하세요.',
  },
  {
    id: 5,
    category: '결제 - 무통장 입금',
    question: '무통장 입금으로 선택 후 현금영수증을 요청 하는 방법은?',
    answer:
      '무통장 입금 시 현금영수증 발행 방법에 대한 답변을 여기에 작성하세요.',
  },
];

const PeriodSection = ({
  selectedPeriod,
  setSelectedPeriod,
}: {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
}) => {
  return (
    <View style={styles.settlementHeader}>
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 1 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(1)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 1 && styles.periodButtonTextActive,
            ]}
          >
            전체
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 2 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(2)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 2 && styles.periodButtonTextActive,
            ]}
          >
            서비스
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 3 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(3)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 3 && styles.periodButtonTextActive,
            ]}
          >
            주문/결제
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 4 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(4)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 4 && styles.periodButtonTextActive,
            ]}
          >
            배송/반품
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 5 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(5)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 5 && styles.periodButtonTextActive,
            ]}
          >
            이용권
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FrequentlyAskedQuestions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>자주묻는질문</Text>
        <Text style={styles.subtitle}>
          새로운 소식 및 서비스 안내를 드립니다.
        </Text>
      </View>

      <StatsSection
        visits='999'
        sales='999'
        dateRange='NEW 2025. 03.'
        visitLabel='전체'
        salesLabel='최근 업데이트'
      />
      <View style={styles.divider} />

      <View style={styles.section}>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <View style={styles.listContainer}>
          {FAQ_DATA.map((faq, index) => (
            <View key={faq.id} style={styles.faqItemContainer}>
              <TouchableOpacity
                style={styles.questionWrapper}
                onPress={() => toggleItem(index)}
              >
                <View style={styles.questionText}>
                  <View style={styles.row}>
                    <Text style={styles.qPrefix}>Q.</Text>
                    <Text style={styles.questionLabel}>{faq.question}</Text>
                  </View>
                  <Text style={styles.categoryLabel}>{faq.category}</Text>
                </View>
                <Text
                  style={
                    openIndex === index ? styles.arrowOpen : styles.arrowClosed
                  }
                >
                  ▼
                </Text>
              </TouchableOpacity>
              {openIndex === index && (
                <View style={styles.answerWrapper}>
                  <Text style={styles.answerInner}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FrequentlyAskedQuestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 27,
    color: '#000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 30,
  },
  section: {
    width: '100%',
    paddingBottom: 80,
    marginTop: 30,
  },
  settlementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
  },
  periodSelector: {
    flexDirection: 'row',
    marginRight: 10,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    marginTop: 20,
  },
  faqItemContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  questionText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qPrefix: {
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  questionLabel: {
    fontSize: 16,
    color: '#222',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  arrowOpen: {
    fontSize: 18,
    color: '#007AFF',
    transform: [{ rotate: '180deg' }],
  },
  arrowClosed: {
    fontSize: 18,
    color: '#ccc',
  },
  answerWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  answerInner: {
    fontSize: 15,
    color: '#333',
  },
});
