import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useDeferredValue, useMemo } from 'react';
import { usePost } from '@virtualswitch/hooks/usePost';
import { Post } from '@virtualswitch/api/types';
import PostItem from '@virtualswitch/components/PostItem';

import { SearchIcon } from '@assets/svg';

export default function Home() {
  const { allPost: posts, getAllPosts, loading, error } = usePost();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    getAllPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    if (!deferredSearchQuery.trim()) {
      return posts;
    }

    const query = deferredSearchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      return post.title?.toLowerCase().includes(query) || post.body?.toLowerCase().includes(query);
    });
  }, [posts, deferredSearchQuery]);

  const handlePostPress = (post: Post) => {
    setSelectedPost(selectedPost?.id === post.id ? null : post);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text className="mt-4 text-black">Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="m-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <View className="flex-row">
          <Text className="ml-2 text-red-700">{error}</Text>
        </View>
      </View>
    );
  }
  const isSearching = searchQuery !== deferredSearchQuery;

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9f9]">
      <View className="flex-row justify-between p-[20px] items-center mb-6 bg-blue-900">
        <Text className="text-2xl font-100 text-white mt-[30px]">Posts</Text>
      </View>
      <View className="px-4 py-4 ">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-[10px] h-[40px] mb-4 border border-gray-200">
          <SearchIcon />
          <TextInput
            className="flex-1 ml-2 text-black h-[40px]"
            placeholder="Search posts..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Text className="text-blue-500">Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {deferredSearchQuery.trim() !== '' && (
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-500">
              Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
            </Text>
            {isSearching && (
              <ActivityIndicator size="small" color="#4A90E2" style={{ marginLeft: 8 }} />
            )}
          </View>
        )}

        <FlatList
          data={filteredPosts}
          renderItem={({ item, index }) => (
            <PostItem
              handlePostPress={handlePostPress}
              item={item}
              isSelected={selectedPost?.id === item?.id}
              index={index}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="pb-6"
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-gray-500">
                {deferredSearchQuery.trim() !== '' ? 'No matching posts found' : 'No posts found'}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
