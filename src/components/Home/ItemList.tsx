import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ItemCard from './ItemCard';

const { width } = Dimensions.get('window');

export interface UIItem {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  isLiked: boolean;
}

type ItemListProps = {
  items: UIItem[];
  columns?: number;
  onItemClick?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({
  items,
  columns = 2,
  onItemClick,
  onDelete,
}) => {
  const handleOpen = onItemClick ?? (() => {});
  const handleDelete = onDelete ?? (() => {});

  const renderItem = ({ item }: { item: UIItem }) => (
    <View style={styles.itemContainer}>
      <ItemCard {...item} onOpenModal={handleOpen} onDelete={handleDelete} />
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemContainer: {
    width: (width - 48) / 2, // 48 = paddingHorizontal(32) + gap(16)
  },
});

export default ItemList;
