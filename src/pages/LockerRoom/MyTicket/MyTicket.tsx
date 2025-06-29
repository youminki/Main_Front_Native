// src/pages/LockerRoom/MyTicket.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatsSection from '../../../components/StatsSection';
import Spinner from '../../../components/Spinner';
import theme from '../../../styles/Theme';
import { useUserTickets } from '../../../api/ticket/ticket';

const { width } = Dimensions.get('window');

const visitLabel = '사용중인 이용권';
const salesLabel = '시즌';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyTicket: React.FC = () => {
  const navigation = useNavigation();
  // react-query로 티켓 데이터 패칭
  const { data: tickets = [], isLoading } = useUserTickets();

  const handleTicketPress = (tplId: string) => {
    navigation.navigate('TicketDetail' as never, { id: tplId } as never);
  };

  const handleAddTicket = () => {
    navigation.navigate('PurchaseOfPasses' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>이용권</Text>
          <Text style={styles.subtitle}>
            나에게 맞는 스타일을 찾을 때는 멜픽!
          </Text>
        </View>

        <StatsSection
          visits={String(tickets.length)}
          sales={sales}
          dateRange={dateRange}
          visitLabel={visitLabel}
          salesLabel={salesLabel}
        />
        <View style={styles.divider} />

        <View style={styles.ticketWrapper}>
          {isLoading ? (
            <View style={styles.spinnerWrapper}>
              <Spinner />
            </View>
          ) : (
            <>
              {tickets.map((ticket) => {
                const {
                  id,
                  startDate,
                  endDate,
                  remainingRentals,
                  ticketList: {
                    id: tplId,
                    name,
                    price,
                    isLongTerm,
                    isUlimited,
                  },
                } = ticket;

                const subtitle = isLongTerm ? '(매월결제)' : '(일반결제)';
                const formattedPrice = `${price.toLocaleString()}원`;
                const formattedDate = `${startDate.replace(
                  /-/g,
                  '.'
                )} ~ ${endDate.replace(/-/g, '.')}`;

                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.ticketCard}
                    onPress={() => handleTicketPress(String(tplId))}
                    activeOpacity={0.7}
                  >
                    <View style={styles.remainingBadge}>
                      <Text style={styles.remainingText}>
                        {isUlimited
                          ? '무제한'
                          : `잔여횟수 ${remainingRentals}회`}
                      </Text>
                    </View>
                    <View style={styles.left}>
                      <View style={styles.seasonRow}>
                        <Text style={styles.seasonText}>
                          2025 <Text style={styles.yellowText}>SPRING</Text>
                        </Text>
                      </View>
                      <Text style={styles.ticketTitle}>{name}</Text>
                      <Text style={styles.ticketSubtitle}>{subtitle}</Text>
                      <Text style={styles.ticketPrice}>{formattedPrice}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* 항상 표시되는 "이용권 추가" 카드 */}
              <TouchableOpacity
                style={styles.ticketCardAdd}
                onPress={handleAddTicket}
                activeOpacity={0.7}
              >
                <View style={styles.addLeft}>
                  <View style={styles.plusBox}>
                    <Text style={styles.plusSign}>＋</Text>
                  </View>
                  <Text style={styles.addText}>이용권 추가</Text>
                </View>
                <View style={styles.addRight} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
  },
  ticketWrapper: {
    gap: 20,
    alignItems: 'center',
    minHeight: 200,
  },
  spinnerWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  ticketCard: {
    position: 'relative',
    width: '100%',
    height: 160,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  remainingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  remainingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  left: {
    flex: 1,
    justifyContent: 'space-between',
  },
  seasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seasonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  yellowText: {
    color: '#FFD700',
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginTop: 8,
  },
  ticketSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  ticketCardAdd: {
    width: '100%',
    height: 160,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  addLeft: {
    flex: 1,
    alignItems: 'center',
  },
  plusBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  plusSign: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  addRight: {
    width: 60,
    height: 60,
  },
});

export default MyTicket;
