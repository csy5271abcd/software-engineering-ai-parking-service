import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const SHORTCUTS = [
  {id: 'home',     label: '집',   icon: '🏠', sub: '12분 · 여유', subColor: '#03AA5A'},
  {id: 'work',     label: '회사', icon: '🏢', sub: '24분 · 혼잡', subColor: '#FB5852'},
  {id: 'hospital', label: '병원', icon: '🏥', sub: '한양대 9분',  subColor: '#006CFF'},
] as const;

interface QuickShortcutsProps {
  onPress?: (id: string) => void;
}

export function QuickShortcuts({onPress}: QuickShortcutsProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      {SHORTCUTS.map(s => (
        <Pressable
          key={s.id}
          onPress={() => onPress?.(s.id)}
          style={styles.card}
        >
          <View style={styles.iconWrap}>
            <Text style={styles.iconText}>{s.icon}</Text>
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.label} numberOfLines={1}>{s.label}</Text>
            <Text style={[styles.sub, {color: s.subColor}]} numberOfLines={1}>
              {s.sub}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {fontSize: 15},
  textWrap: {flex: 1, minWidth: 0},
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    letterSpacing: -0.3,
    includeFontPadding: false,
  },
  sub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
    letterSpacing: -0.4,
    includeFontPadding: false,
  },
});
