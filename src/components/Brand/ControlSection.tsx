import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SearchIconImage from '../../assets/BottomNav/SearchIcon.svg';
import GroupButtonIcon from '../../assets/BottomNav/GroupButtonIcon.svg';

interface ControlSectionProps {
  toggleSort: () => void;
  sortBy: 'group' | 'category';
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const ControlSection: React.FC<ControlSectionProps> = ({
  toggleSort,
  sortBy,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleSort}>
          <GroupButtonIcon width={13} height={16} />
          <Text style={styles.buttonText}>
            {sortBy === 'group' ? '그룹별' : '카테고리별'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.controlText}>정렬</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder='검색'
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <SearchIconImage width={16} height={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  controlText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    padding: 10,
  },
});
