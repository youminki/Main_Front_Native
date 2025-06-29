import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';

interface BasketItem {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  deliveryDate?: string;
  size: string;
  color: string;
  price: number | string;
  imageUrl: any;
  $isSelected: boolean;
  rentalDays?: string;
  rating?: number;
}

const ProductReview: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const navigation = useNavigation();

  const [items] = useState<BasketItem[]>([
    {
      id: 1,
      brand: 'SANDRO',
      nameCode: 'SF25S3FRD7699',
      nameType: '원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: 50000,
      imageUrl: require('../../../assets/sample-dress.png'),
      $isSelected: true,
      rentalDays: '대여 (3일)',
      rating: 3,
    },
    {
      id: 2,
      brand: 'SANDRO',
      nameCode: 'SF25S3FRD7699',
      nameType: '원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: '489,000',
      imageUrl: require('../../../assets/sample-dress.png'),
      $isSelected: true,
      rentalDays: '구매',
      rating: 5,
    },
  ]);

  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>제품평가</Text>
        <Text style={styles.subtitle}>
          나에게 맞는 스타일을 찾을 때는 멜픽!
        </Text>
      </View>

      <StatsSection
        visits={'999'}
        sales={'2025 1분기'}
        dateRange={'SPRING'}
        visitLabel={'제품 평가수'}
        salesLabel={'시즌'}
      />

      <View style={styles.divider} />

      <View style={styles.section}>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <View style={styles.itemList}>
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.contentWrapper}>
                <View style={styles.itemDetails}>
                  <Text style={styles.brand}>{item.brand}</Text>
                  <View style={styles.itemName}>
                    <Text style={styles.nameCode}>{item.nameCode}</Text>
                    <Text style={styles.slash}>/</Text>
                    <Text style={styles.itemType}>{item.nameType}</Text>
                  </View>

                  {item.type === 'rental' ? (
                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/ServiceInfoIcon.png')}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.rowText}>
                          <Text style={styles.labelDetailText}>
                            진행 서비스 -{' '}
                          </Text>
                          <Text style={styles.detailHighlight}>
                            {item.rentalDays}
                          </Text>
                        </View>
                        {item.servicePeriod && (
                          <View style={styles.additionalText}>
                            <Text style={styles.detailText}>
                              {item.servicePeriod}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ) : (
                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/ServiceInfoIcon.png')}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.rowText}>
                          <Text style={styles.detailText}>
                            진행 서비스 - 구매
                          </Text>
                        </View>
                        {item.deliveryDate && (
                          <View style={styles.additionalText}>
                            <Text style={styles.detailText}>
                              {item.deliveryDate}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}

                  <View style={styles.infoRowFlex}>
                    <View style={styles.iconArea}>
                      <Image
                        source={require('../../../assets/Basket/ProductInfoIcon.png')}
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <View style={styles.rowText}>
                        <Text style={styles.labelDetailText}>제품 정보</Text>
                      </View>
                      <View style={styles.additionalText}>
                        <Text style={styles.detailText}>사이즈 - </Text>
                        <Text style={styles.detailHighlight}>{item.size}</Text>
                        <Text style={styles.slash}>/</Text>
                        <Text style={styles.detailText}>색상 - </Text>
                        <Text style={styles.detailHighlight}>{item.color}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoRowFlex}>
                    <View style={styles.iconArea}>
                      <Image
                        source={require('../../../assets/Basket/EvaluationIcon.png')}
                        style={styles.icon}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <View style={styles.rowText}>
                        <Text style={styles.labelDetailText}>평가 -</Text>
                        <View style={styles.starRow}>
                          {Array.from({ length: 5 }).map((_, i) => {
                            const filled = i < (item.rating || 0);
                            return (
                              <Image
                                key={i}
                                source={
                                  filled
                                    ? require('../../../assets/Basket/FilledStarIcon.png')
                                    : require('../../../assets/Basket/EmptyStarIcon.png')
                                }
                                style={styles.starIcon}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  <View style={styles.itemImageContainer}>
                    <Image source={item.imageUrl} style={styles.itemImage} />
                  </View>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    navigation.navigate(
                      'ItemDetail' as never,
                      { id: item.id } as never
                    )
                  }
                >
                  <Text style={styles.deleteButtonText}>제품상세</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.purchaseButton}
                  onPress={() =>
                    navigation.navigate('PaymentReviewWrite' as never)
                  }
                >
                  <Text style={styles.purchaseButtonText}>작성</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductReview;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 80,
    marginTop: 30,
  },
  itemList: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 20,
  },
  item: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 30,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  brand: {
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 11,
    color: '#000',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginBottom: 28,
  },
  nameCode: {
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22,
    color: '#000',
  },
  slash: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#dddddd',
    marginHorizontal: 4,
  },
  itemType: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#999',
  },
  infoRowFlex: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 5,
    width: '100%',
  },
  iconArea: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    marginBottom: 16,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  additionalText: {
    flexDirection: 'row',
    gap: 5,
  },
  detailText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#000',
  },
  detailHighlight: {
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22,
    color: '#000',
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  itemImageContainer: {
    position: 'relative',
    width: 140,
    height: 210,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#fff',
    width: 91,
    height: 46,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#888',
    fontWeight: '400',
    fontSize: 14,
  },
  purchaseButton: {
    backgroundColor: '#000',
    width: 91,
    height: 46,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelDetailText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
});
