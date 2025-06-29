import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

interface SizeInfoProps {
  size_picture: string;
  size_label_guide?: Record<string, string>;
}

const SIZE_PLACEHOLDER = 'https://via.placeholder.com/300x200';

const SIZE_LABELS: Record<string, string> = {
  '44': 'S',
  '55': 'M',
  '66': 'L',
  '77': 'XL',
};

const SizeInfo: React.FC<SizeInfoProps> = ({
  size_picture,
  size_label_guide,
}) => {
  const [imgSrc, setImgSrc] = useState(size_picture);
  const handleImageError = () => setImgSrc(SIZE_PLACEHOLDER);

  if (!size_picture) {
    return <Text style={styles.message}>사이즈 정보가 없습니다.</Text>;
  }

  const formatSize = (raw: string) => {
    if (/free/i.test(raw)) return 'Free';
    const num = raw.replace(/\D/g, '');
    const label = SIZE_LABELS[num];
    return label ? `${num}(${label})` : num;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사이즈 정보</Text>
      <Image
        source={{ uri: imgSrc }}
        style={styles.sizeImage}
        resizeMode='contain'
        onError={handleImageError}
      />
      {size_label_guide && (
        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>사이즈 가이드</Text>
          {Object.entries(size_label_guide).map(([key, value]) => (
            <Text key={key} style={styles.guideText}>
              {key}: {value}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sizeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  guideContainer: {
    marginTop: 16,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default SizeInfo;
