import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {AppIcon} from '../common/AppIcon';

interface SearchHeaderProps {
  onBack: () => void;
  paddingTop: number;
  // editable (DestinationSearchScreen)
  inputRef?: React.RefObject<TextInput | null>;
  query?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
  editable?: boolean;
  // non-editable (RecommendedParkingScreen — tap re-enters search)
  onInputPress?: () => void;
}

export function SearchHeader({
  onBack,
  paddingTop,
  inputRef,
  query = '',
  onChangeText,
  onClear,
  autoFocus = false,
  editable = true,
  onInputPress,
}: SearchHeaderProps): React.JSX.Element {
  return (
    <View style={[styles.header, {paddingTop}]}>
      <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8}>
        <AppIcon name="chevronLeft" size={20} color="#222225" strokeWidth={2.2} />
      </Pressable>

      {editable ? (
        <View style={styles.inputWrap}>
          <AppIcon name="search" size={16} color="#8B99AC" strokeWidth={2.2} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={onChangeText}
            placeholder="장소, 버스, 지하철, 주소 검색"
            placeholderTextColor="#8B99AC"
            style={styles.input}
            autoFocus={autoFocus}
            returnKeyType="search"
            clearButtonMode="never"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && onClear && (
            <Pressable onPress={onClear} style={styles.clearBtn} hitSlop={8}>
              <AppIcon name="x" size={10} color="#FFFFFF" strokeWidth={2.5} />
            </Pressable>
          )}
        </View>
      ) : (
        <Pressable style={styles.inputWrap} onPress={onInputPress}>
          <AppIcon name="search" size={16} color="#8B99AC" strokeWidth={2.2} />
          <Text style={styles.inputPlaceholder} numberOfLines={1}>
            장소, 버스, 지하철, 주소 검색
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 7,
    borderWidth: 1,
    borderColor: '#E5EAF1',
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
  inputPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: '#8B99AC',
    fontWeight: '500',
    letterSpacing: -0.3,
    includeFontPadding: false,
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
});
