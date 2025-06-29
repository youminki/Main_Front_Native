// ProductReview.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

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
  rating?: number; // 별점(0~5)
}

const ProductReview: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPeriod] = useState(6);

  // 아이템(예: 1개만 사용)
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
      imageUrl: require('../../../assets/sample-dress.svg'),
      $isSelected: true,
      rentalDays: '대여 (3일)',
      rating: 3,
    },
  ]);

  // 선택된 기간에 따라 아이템 목록 필터링 (예시: 3개월이면 앞 3개, 6개월이면 전체)
  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  // ★ 위쪽에 들어갈 상태 예시 (별점, 후기 텍스트, 사진 업로드)
  const [starRating, setStarRating] = useState(items[0].rating || 0); // 별점
  const [reviewText, setReviewText] = useState(''); // 후기 텍스트
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 업로드 이미지

  // 별점 선택
  const handleStarClick = (idx: number) => {
    setStarRating(idx + 1);
  };

  // 이미지 업로드
  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  // 후기 제출
  const handleSubmitReview = () => {
    if (starRating === 0) {
      Alert.alert('오류', '별점을 선택해주세요.');
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert('오류', '후기를 작성해주세요.');
      return;
    }

    Alert.alert('성공', '후기가 등록되었습니다.', [
      { text: '확인', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {/* 기존 ItemList */}
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

                  {/* 진행 서비스 */}
                  {item.type === 'rental' ? (
                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/ServiceInfoIcon.svg')}
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
                          source={require('../../../assets/Basket/ServiceInfoIcon.svg')}
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

                  {/* 제품 정보 */}
                  <View style={styles.infoRowFlex}>
                    <View style={styles.iconArea}>
                      <Image
                        source={require('../../../assets/Basket/ProductInfoIcon.svg')}
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
                </View>

                <View style={styles.rightSection}>
                  <View style={styles.itemImageContainer}>
                    <Image source={item.imageUrl} style={styles.itemImage} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 위쪽 추가 섹션: 제품 평가, 후기작성, 후기사진 등록 */}
        <View style={styles.aboveContentContainer}>
          {/* 제품 만족도 평가 */}
          <View style={styles.starSection}>
            <Text style={styles.sectionTitle}>제품 만족도 평가 *</Text>
            <View style={styles.starBox}>
              <View style={styles.starBulletArea}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < starRating;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => handleStarClick(i)}
                    >
                      <Image
                        source={
                          filled
                            ? require('../../../assets/Basket/FilledStarIcon.svg')
                            : require('../../../assets/Basket/EmptyStarIcon.svg')
                        }
                        style={styles.starIcon}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 후기작성 */}
          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>후기작성 (100자 내외) *</Text>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.reviewTextarea}
                maxLength={100}
                placeholder='후기를 작성 해주세요'
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={4}
                placeholderTextColor='#999'
              />
            </View>
          </View>

          {/* 후기사진 등록 */}
          <View style={styles.photoSection}>
            <Text style={styles.sectionTitle}>후기사진 등록</Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}
            >
              <Text style={styles.uploadButtonText}>사진 업로드</Text>
            </TouchableOpacity>
            {uploadedImage && (
              <Image
                source={{ uri: uploadedImage }}
                style={styles.uploadedImage}
              />
            )}
          </View>
        </View>
      </View>

      {/* 하단 고정 버튼 */}
      <View style={styles.fixedBottomBar}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>후기 등록</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  itemList: {
    gap: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  itemDetails: {
    flex: 1,
    gap: 8,
  },
  brand: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  slash: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 4,
  },
  itemType: {
    fontSize: 14,
    color: '#666',
  },
  infoRowFlex: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  iconArea: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelDetailText: {
    fontSize: 12,
    color: '#666',
  },
  detailHighlight: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  additionalText: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  rightSection: {
    marginLeft: 16,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  aboveContentContainer: {
    marginTop: 24,
    gap: 24,
  },
  starSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  starBox: {
    alignItems: 'center',
  },
  starBulletArea: {
    flexDirection: 'row',
    gap: 8,
  },
  starIcon: {
    width: 32,
    height: 32,
  },
  reviewSection: {
    gap: 12,
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  reviewTextarea: {
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoSection: {
    gap: 12,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  fixedBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
