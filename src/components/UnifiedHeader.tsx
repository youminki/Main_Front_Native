import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderInfo } from '../api/user/userApi';

import MypageModal from '../components/MypageModal';
import ReusableModal from '../components/ReusableModal';

interface UnifiedHeaderProps {
  variant?: 'default' | 'oneDepth' | 'twoDepth' | 'threeDepth';
  title?: string;
  onBack?: () => void;
  exit?: boolean;
}

const HISTORY_KEY = 'search_history';

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  variant = 'default',
  title,
  onBack,
  exit,
}) => {
  const navigation = useNavigation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showMypageModal, setShowMypageModal] = useState(false);
  const [showReusableModal, setShowReusableModal] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const { data: headerInfo } = useHeaderInfo();

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  };

  const saveHistory = async (term: string) => {
    try {
      const newHistory = [
        term,
        ...searchHistory.filter((item) => item !== term),
      ].slice(0, 10);
      setSearchHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      saveHistory(searchTerm.trim());
      setSearchOpen(false);
      setSearchTerm('');
      setShowHistory(false);
      // 검색 결과 페이지로 이동
      // navigation.navigate('SearchResults', { query: searchTerm.trim() });
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setShowHistory(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setShowHistory(false);
    // 검색 결과 페이지로 이동
    // navigation.navigate('SearchResults', { query: term });
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  const renderDefaultHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.logoText}>MELPIK</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <View style={[styles.searchBox, searchOpen && styles.searchBoxOpen]}>
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, searchOpen && styles.searchInputOpen]}
            placeholder='검색어를 입력하세요'
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearchSubmit}
            onFocus={() => setShowHistory(true)}
          />
          <TouchableOpacity
            onPress={toggleSearch}
            style={styles.searchIconWrapper}
          >
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
        </View>
        {showHistory && searchHistory.length > 0 && (
          <View style={styles.dropdown}>
            <ScrollView>
              {searchHistory.map((term, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.historyItem}
                  onPress={() => handleHistoryClick(term)}
                >
                  <Text style={styles.historyText}>{term}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.clearAll} onPress={clearHistory}>
                <Text style={styles.clearAllText}>검색 기록 삭제</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Alarm' as never)}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Basket' as never)}
        >
          <Text style={styles.iconText}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMypageModal(true)}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOneDepthHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.iconText}>🏠</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Alarm' as never)}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Basket' as never)}
        >
          <Text style={styles.iconText}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMypageModal(true)}>
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTwoDepthHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => Alert.alert('공유', '공유 기능')}>
          <Text style={styles.iconText}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.iconText}>🏠</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderThreeDepthHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.rightSection}>
        {exit && (
          <TouchableOpacity onPress={() => setShowReusableModal(true)}>
            <Text style={styles.iconText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHeader = () => {
    switch (variant) {
      case 'oneDepth':
        return renderOneDepthHeader();
      case 'twoDepth':
        return renderTwoDepthHeader();
      case 'threeDepth':
        return renderThreeDepthHeader();
      default:
        return renderDefaultHeader();
    }
  };

  return (
    <>
      <View style={styles.header}>{renderHeader()}</View>

      <MypageModal
        isOpen={showMypageModal}
        onClose={() => setShowMypageModal(false)}
      />

      <ReusableModal
        visible={showReusableModal}
        onClose={() => setShowReusableModal(false)}
        title='페이지 종료'
      >
        <Text style={styles.modalText}>페이지를 종료하시겠습니까?</Text>
      </ReusableModal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    position: 'relative',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f6ac36',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    width: '100%',
    maxWidth: 200,
  },
  searchBoxOpen: {
    maxWidth: 250,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 14,
    color: '#333',
  },
  searchInputOpen: {
    fontSize: 16,
  },
  searchIconWrapper: {
    padding: 4,
  },
  iconText: {
    fontSize: 20,
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    maxHeight: 200,
    zIndex: 1000,
  },
  historyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  clearAll: {
    padding: 12,
    alignItems: 'center',
  },
  clearAllText: {
    fontSize: 14,
    color: '#f6ac36',
    fontWeight: '600',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default UnifiedHeader;
