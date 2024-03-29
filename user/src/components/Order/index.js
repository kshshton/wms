import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {get_order} from '../../services/get_order';
import styles from './styles';

const Order = ({route}) => {
  const [order, setOrder] = useState([]);
  const {orderId} = route.params;

  const getOrderInfo = async () => {
    const {data} = await get_order(orderId);
    setOrder(data);
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemList}>
        <Text style={styles.itemText}>Nazwa: {item.name}</Text>
        <Text style={styles.itemText}>Kategoria: {item.category}</Text>
        <Text style={styles.itemText}>Ilość: {item.quantity}</Text>
        <Text style={styles.itemText}>Sektor: {item.sectorName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Order;
