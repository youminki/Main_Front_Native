// src/pages/LockerRoom/TicketDetail.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Spinner from '../../../components/Spinner';
import { getUserTickets, TicketItem } from '../../../api/ticket/ticket';

const TicketDetail: React.FC = () => {
  const route = useRoute();
  const ticketId = (route.params as any)?.ticketId as string;
  const [ticket, setTicket] = useState<TicketItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const items = await getUserTickets();
        const tplId = Number(ticketId);
        const found = items.find((t) => t.ticketList.id === tplId) ?? null;
        setTicket(found);
      } catch (err) {
        console.error('티켓 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ticketId]);

  const formatDate = (iso: string) => iso.slice(0, 10).replace(/-/g, '.');
  const formatTime = (iso: string) => new Date(iso).toTimeString().slice(0, 8);

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <Spinner />
      </View>
    );
  }

  if (!ticket) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentArea}>
          <Text style={styles.errorText}>
            해당하는 이용권을 찾을 수 없습니다.
          </Text>
        </View>
      </ScrollView>
    );
  }

  const {
    ticketList: { name, durationMonths, price, isUlimited },
    startDate,
    endDate,
    purchasedAt,
    remainingRentals,
    autoRenewal,
    nextBillingDate,
  } = ticket;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentArea}>
        {/* 이용권 이름 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이용권 이름</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{name}</Text>
          </View>
        </View>

        {/* 사용기간 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사용기간</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>
              {formatDate(startDate)} ~ {formatDate(endDate)}{' '}
              <Text style={styles.grayText}>(유효기간)</Text>
            </Text>
          </View>
        </View>

        {/* 결제일시 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제일시</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>
              {formatDate(purchasedAt)}{' '}
              <Text style={styles.grayText}>({formatTime(purchasedAt)})</Text>
            </Text>
          </View>
        </View>

        {/* 사용 가능 개월 수 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사용 가능 개월 수</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{durationMonths}개월</Text>
          </View>
        </View>

        {/* 가격 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>가격 (원)</Text>
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>{price.toLocaleString()}원</Text>
          </View>
        </View>

        {/* 잔여횟수: isUlimited가 false일 때만 */}
        {!isUlimited && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>잔여횟수</Text>
            <View style={styles.readOnlyBoxGray}>
              <Text style={styles.seasonValue}>{remainingRentals}회</Text>
            </View>
          </View>
        )}

        {/* 다음 결제일 & 자동연장 */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.halfSection}>
              <Text style={styles.sectionTitle}>다음 결제일</Text>
              <View style={styles.readOnlyBox}>
                <Text style={styles.readOnlyText}>
                  {nextBillingDate ? formatDate(nextBillingDate) : '—'}
                </Text>
              </View>
            </View>
            <View style={styles.halfSection}>
              <Text style={styles.sectionTitle}>자동연장</Text>
              <View style={styles.readOnlyBox}>
                <Text style={styles.readOnlyText}>
                  {autoRenewal ? '사용 중' : '해제됨'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 안내문 */}
        <View style={styles.noticeArea}>
          <Text style={styles.noticeText}>
            ※ 이용 중인 구독권은 시즌 중간에는{' '}
            <Text style={styles.orangeBold}>취소가 불가</Text>합니다.
          </Text>
          <Text style={styles.noticeText}>
            만약, 취소가 필요할 경우는 서비스팀에 문의해 주시기 바랍니다.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketDetail;

// --- Styles ---
const styles = StyleSheet.create({
  spinnerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  contentArea: {
    width: '100%',
    flexDirection: 'column',
    gap: 24,
  },
  section: {
    flexDirection: 'column',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  readOnlyBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  readOnlyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  readOnlyBoxGray: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  halfSection: {
    flex: 1,
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
  noticeArea: {
    flexDirection: 'column',
    gap: 4,
  },
  noticeText: {
    fontSize: 12,
    color: '#888',
    margin: 0,
  },
  errorText: {
    fontSize: 14,
    color: '#f00',
    textAlign: 'center',
  },
  grayText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  orangeBold: {
    color: '#f6ae24',
    fontWeight: '700',
  },
  seasonValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
