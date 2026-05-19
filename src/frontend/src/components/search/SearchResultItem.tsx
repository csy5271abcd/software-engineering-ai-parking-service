import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

interface SearchResultItemProps {
  name: string;
  sub: string;
  type?: string;
  matchQuery?: string;
  onPress?: () => void;
  icon?: 'place' | 'parking';
  showArrow?: boolean;
  isLast?: boolean;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) {return text;}
  const idx = text.indexOf(query);
  if (idx < 0) {return text;}
  return (
    <>
      <Text>{text.slice(0, idx)}</Text>
      <Text style={styles.highlight}>{query}</Text>
      <Text>{text.slice(idx + query.length)}</Text>
    </>
  );
}

export function SearchResultItem({
  name,
  sub,
  type,
  matchQuery = '',
  onPress,
  icon = 'place',
  showArrow = false,
  isLast = false,
}: SearchResultItemProps): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, !isLast && styles.rowBorder]}
    >
      <View style={[styles.iconCircle, icon === 'parking' && styles.iconCircleBlue]}>
        {icon === 'place' ? (
          <View style={styles.pinIcon}>
            <View style={styles.pinDot} />
          </View>
        ) : (
          <Text style={styles.pText}>P</Text>
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {highlightText(name, matchQuery)}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {sub}{type ? ` · ${type}` : ''}
        </Text>
      </View>
      {showArrow && (
        <View style={styles.arrowWrap}>
          <View style={styles.arrowDiag} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconCircleBlue: {
    backgroundColor: 'rgba(0,108,255,0.08)',
  },
  pinIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#8B99AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8B99AC',
  },
  pText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#006CFF',
    includeFontPadding: false,
  },
  body: {flex: 1, minWidth: 0, gap: 2},
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  highlight: {
    color: '#006CFF',
    fontWeight: '700',
  },
  sub: {
    fontSize: 11,
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  arrowWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowDiag: {
    width: 8,
    height: 8,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#CAD1DB',
    transform: [{rotate: '45deg'}],
  },
});
