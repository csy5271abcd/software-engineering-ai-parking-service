import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchHeader} from '../../components/search/SearchHeader';
import {SearchInitialState} from '../../components/search/SearchInitialState';
import {SearchLiveResults} from '../../components/search/SearchLiveResults';

// Self-contained NavParam — works in HomeStack or SearchStack
type NavParam = {
  DestinationSearchScreen: undefined;
  RecommendedParkingScreen: {destinationName: string; destinationSub?: string};
};
type NavProp = StackNavigationProp<NavParam, 'DestinationSearchScreen'>;

const SUGGESTIONS = [
  {name: '성수동 카페거리', sub: '서울 성동구 성수동2가', type: '카페·핫플'},
  {name: '성수동 디뮤지엄', sub: '서울 성동구 왕십리로 83', type: '전시·갤러리'},
  {name: '서울숲', sub: '서울 성동구 뚝섬로 273', type: '공원·테마파크'},
  {name: '한양대학교병원', sub: '서울 성동구 왕십리로 222-1', type: '병원'},
  {name: '코엑스', sub: '서울 강남구 영동대로 513', type: '쇼핑·랜드마크'},
  {name: '잠실 롯데월드', sub: '서울 송파구 올림픽로 240', type: '랜드마크'},
  {name: '강남역', sub: '서울 강남구 강남대로 396', type: '지하철역'},
  {name: '서울역', sub: '서울 용산구 한강대로 405', type: '기차역'},
  {name: '건국대학교', sub: '서울 광진구 능동로 120', type: '대학교'},
] as const;

export function DestinationSearchScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');

  const liveResults = query
    ? SUGGESTIONS.filter(
        s =>
          s.name.includes(query) ||
          s.sub.includes(query) ||
          s.type.includes(query),
      )
    : [];

  const handleSelect = useCallback(
    (name: string, sub: string) => {
      navigation.navigate('RecommendedParkingScreen', {
        destinationName: name,
        destinationSub: sub,
      });
    },
    [navigation],
  );

  const clearQuery = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={styles.container}>
        <SearchHeader
          onBack={() => navigation.goBack()}
          paddingTop={insets.top + 10}
          inputRef={inputRef}
          query={query}
          onChangeText={setQuery}
          onClear={clearQuery}
          autoFocus
          editable
        />

        <View style={styles.content}>
          {query.length === 0 ? (
            <SearchInitialState onSelect={handleSelect} />
          ) : (
            <SearchLiveResults
              results={liveResults}
              query={query}
              onSelect={handleSelect}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  content: {flex: 1},
});
