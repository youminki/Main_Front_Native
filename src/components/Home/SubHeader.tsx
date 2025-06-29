// src/components/Header/SubHeader.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../Spinner';

const { width } = Dimensions.get('window');

const homeIcons = [
  { name: '전체', category: 'All' },
  { name: '미니원피스', category: 'MiniDress' },
  { name: '미디원피스', category: 'MidiDress' },
  { name: '롱 원피스', category: 'LongDress' },
  { name: '투피스', category: 'TowDress' },
  { name: '점프수트', category: 'JumpSuit' },
  { name: '블라우스', category: 'Blouse' },
  { name: '니트 상의', category: 'KnitTop' },
  { name: '셔츠 상의', category: 'ShirtTop' },
  { name: '미니 스커트', category: 'MiniSkirt' },
  { name: '미디 스커트', category: 'MidiSkirt' },
  { name: '롱 스커트', category: 'LongSkirt' },
  { name: '팬츠', category: 'Pants' },
  { name: '자켓', category: 'Jacket' },
  { name: '코트', category: 'Coat' },
  { name: '탑', category: 'Top' },
  { name: '티셔츠', category: 'Tshirt' },
  { name: '가디건', category: 'Cardigan' },
  { name: '베스트', category: 'Best' },
  { name: '패딩', category: 'Padding' },
];

interface SubHeaderProps {
  selectedCategory: string;
  onCategoryChange?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const ICON_WIDTH = 80;

const SubHeader: React.FC<SubHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery = '',
  onSearchChange,
}) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleClick = (category: string) => {
    onCategoryChange?.(category);
  };

  const scrollToCategory = (category: string) => {
    const index = homeIcons.findIndex((icon) => icon.category === category);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * ICON_WIDTH,
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCategory(selectedCategory);
  }, [selectedCategory]);

  if (loading) {
    return (
      <View style={styles.subHeaderWrapper}>
        <View style={styles.contentWrapper}>
          <Spinner />
        </View>
        <View style={styles.divider} />
      </View>
    );
  }

  return (
    <View style={styles.subHeaderWrapper}>
      <View style={styles.contentWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.iconsWrapper}
          style={styles.scrollView}
        >
          {homeIcons.map((icon, idx) => {
            const isSelected = icon.category === selectedCategory;
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.iconContainer,
                  isSelected && styles.selectedIcon,
                ]}
                onPress={() => handleClick(icon.category)}
                activeOpacity={0.7}
              >
                <View
                  style={[styles.icon, isSelected && styles.selectedIconBg]}
                >
                  <Text style={styles.iconText}>{icon.name.charAt(0)}</Text>
                </View>
                <Text
                  style={[styles.iconText, isSelected && styles.selectedText]}
                >
                  {icon.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  subHeaderWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  iconsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: ICON_WIDTH,
    alignItems: 'center',
    paddingVertical: 10,
    opacity: 0.6,
  },
  selectedIcon: {
    opacity: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  selectedIconBg: {
    backgroundColor: '#f6ae24',
  },
  iconText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedText: {
    color: '#f6ae24',
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
});

export default SubHeader;
