import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

type PeriodSectionProps = {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
};

const PeriodSection: React.FC<PeriodSectionProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  return (
    <View style={styles.settlementHeader}>
      <View style={styles.periodSelector}>
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
            공지
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 6 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(6)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 6 && styles.periodButtonTextActive,
            ]}
          >
            안내
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='검색'
          placeholderTextColor='#999'
        />
        <View style={styles.searchIconContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 36,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  searchIconContainer: {
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
  },
});

export default PeriodSection;
