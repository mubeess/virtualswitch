import { View, Text, SafeAreaView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePost } from '@virtualswitch/hooks/usePost';
import { Post } from '@virtualswitch/api/types';
import PostItem from '@virtualswitch/components/PostItem';

export default function Home() {
  const { allPost: posts, getAllPosts, loading, error } = usePost();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getAllPosts();
  }, []);
  const handlePostPress = (post: Post) => {
    setSelectedPost(selectedPost?.id === post.id ? null : post);
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

  return (
    <SafeAreaView className="flex-1 bg-[#f9f9f9]">
      <View className="px-4 py-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-black">Posts</Text>
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostItem
              handlePostPress={handlePostPress}
              item={item}
              isSelected={selectedPost?.id == item?.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="pb-6"
          ListEmptyComponent={
            <View className="py-10 items-center">
              <Text className="text-gray-500">No posts found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
