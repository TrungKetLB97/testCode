import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {
  const [data, setData] = useState([]);
  const [visitedPosts, setVisitedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://vnexpress.net/rss/tin-moi-nhat.rss',
      );
      setData(response.data.rss.channel.item);
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    const visited = visitedPosts.includes(item.link);
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: visited ? 'gray' : 'white',
        }}
        onPress={() => {
          setVisitedPosts([...visitedPosts, item.link]);
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {' '}
          {item.title}{' '}
        </Text>
        <Text> {item.pubDate} </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={data}
        keyExtractor={item => item.link}
        renderItem={renderItem}
        onRefresh={() => {
          const fetchData = async () => {
            const response = await axios.get(
              'https://vnexpress.net/rss/tin-moi-nhat.rss',
            );
            setData(response.data.rss.channel.item);
          };
          fetchData();
        }}
        refreshing={false}
      />
    </View>
  );
}
