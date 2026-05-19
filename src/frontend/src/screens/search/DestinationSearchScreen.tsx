import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {SearchStackParamList} from '../../navigation/navigationTypes';
import {SearchInitialState} from '../../components/search/SearchInitialState';
import {SearchLiveResults} from '../../components/search/SearchLiveResults';
import {SearchFilterModal} from '../../components/search/SearchFilterModal';

type NavProp = StackNavigationProp<SearchStackParamList, 'DestinationSearchScreen'>;

const SUGGESTIONS = [
  {name: '강남역', sub: '서울 강남구 강남대로 396', type: '지하철역'},
  {name: '코엑스', sub: '서울 강남구 영동대로 513', type: '랜드마크'},
  {name: '홍대입구역', sub: '서울 마포구 양화로 160', type: '지하철역'},
  {name: '신촌 연세대학교', sub: '서울 서대문구 연세로 50', type: '대학교'},
  {name: '잠실 롯데월드', sub: '서울 송파구 올림픽로 240', type: '랜드마크'},
  {name: '서울대병원', sub: '서울 종로구 대학로 101', type: '병원'},
  {name: '건국대학교', sub: '서울 광진구 능동로 120', type: '대학교'},
  {name: '이태원', sub: '서울 용산구 이태원로 177', type: '상권'},
  {name: '서울역', sub: '서울 용산구 한강대로 405', type: '기차역'},
] as const;

export function DestinationSearchScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const inputRef = useRef<TextInput>(null);

  const [query, setQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

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
      <View style={[styles.container]}>
        {/* ── Search header ── */}
        <View
          style={[
            styles.header,
            {paddingTop: insets.top + 10},
          ]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={8}
          >
            <View style={styles.chevronLeft} />
          </Pressable>

          <View style={styles.inputWrap}>
            <View style={styles.searchIcon}>
              <View style={styles.searchCircle} />
              <View style={styles.searchTail} />
            </View>
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="장소, 버스, 지하철, 주소 검색"
              placeholderTextColor="#8B99AC"
              style={styles.input}
              autoFocus
              returnKeyType="search"
              clearButtonMode="never"
            />
            {query.length > 0 && (
              <Pressable onPress={clearQuery} style={styles.clearBtn} hitSlop={8}>
                <Text style={styles.clearBtnText}>✕</Text>
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => setFilterVisible(true)}
            style={styles.filterBtn}
            hitSlop={8}
          >
            <View style={styles.filterIcon}>
              <View style={[styles.filterBar, {width: 14}]} />
              <View style={[styles.filterBar, {width: 10}]} />
              <View style={[styles.filterBar, {width: 6}]} />
            </View>
          </Pressable>
        </View>

        {/* ── Content ── */}
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

        <SearchFilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chevronLeft: {
    width: 9,
    height: 9,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#222225',
    transform: [{rotate: '45deg'}],
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F9FB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5EAF1',
  },
  searchIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  searchCircle: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 1.5,
    borderColor: '#8B99AC',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchTail: {
    width: 5,
    height: 1.5,
    backgroundColor: '#8B99AC',
    borderRadius: 1,
    position: 'absolute',
    bottom: 1,
    right: 0,
    transform: [{rotate: '45deg'}],
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222225',
    fontWeight: '500',
    letterSpacing: -0.3,
    includeFontPadding: false,
    padding: 0,
  },
  clearBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#8B99AC',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  clearBtnText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
    includeFontPadding: false,
  },
  filterBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  filterIcon: {gap: 3, alignItems: 'center'},
  filterBar: {
    height: 1.5,
    backgroundColor: '#4D5A6A',
    borderRadius: 1,
  },

  content: {flex: 1},
});
