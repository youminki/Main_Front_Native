import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import ItemCard from './ItemCard';

const { width } = Dimensions.get('window');

type Item = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
};

type ItemListProps = {
  items: Item[];
  onDelete: (id: string) => void;
};

const ItemList: React.FC<ItemListProps> = ({ items, onDelete }) => {
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <ItemCard
        id={item.id}
        image={item.image}
        brand={item.brand}
        description={item.description}
        price={item.price}
        discount={item.discount}
        onDelete={handleDelete}
      />
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
