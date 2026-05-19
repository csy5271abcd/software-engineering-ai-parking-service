import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SearchResultItem} from './SearchResultItem';

interface SearchResult {
  name: string;
  sub: string;
  type?: string;
}

interface SearchLiveResultsProps {
  results: readonly SearchResult[];
  query: string;
  onSelect: (name: string, sub: string) => void;
}

export function SearchLiveResults({
  results,
  query,
  onSelect,
}: SearchLiveResultsProps): React.JSX.Element {
  if (results.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {results.map((r, i) => (
        <SearchResultItem
          key={i}
          name={r.name}
          sub={r.sub}
          type={r.type}
          matchQuery={query}
          icon="place"
          showArrow
          onPress={() => onSelect(r.name, r.sub)}
          isLast={i === results.length - 1}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#8B99AC',
    includeFontPadding: false,
  },
});
