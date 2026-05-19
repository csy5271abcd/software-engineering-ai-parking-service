import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type TabVariant = 'line' | 'pill';

interface TabItem<T extends string = string> {
  key: T;
  label: string;
}

interface AppTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  active: T;
  onSelect: (key: T) => void;
  variant?: TabVariant;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppTabs<T extends string = string>({
  tabs,
  active,
  onSelect,
  variant = 'line',
  scrollable = false,
  style,
}: AppTabsProps<T>): React.JSX.Element {
  if (variant === 'pill') {
    return (
      <View style={[styles.pillList, style]}>
        {tabs.map(t => {
          const isActive = active === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => onSelect(t.key)}
              style={[styles.pillTab, isActive && styles.pillTabActive]}
            >
              <Text style={[styles.pillLabel, isActive && styles.pillLabelActive]}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  const content = (
    <>
      {tabs.map(t => {
        const isActive = active === t.key;
        return (
          <Pressable
            key={t.key}
            onPress={() => onSelect(t.key)}
            style={[styles.lineTab, isActive && styles.lineTabActive]}
          >
            <Text style={[styles.lineLabel, isActive && styles.lineLabelActive]}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </>
  );

  if (scrollable) {
    return (
      <View style={[styles.lineBar, style]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lineBarContent}
        >
          {content}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.lineBar, style]}>
      <View style={styles.lineBarContent}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Pill variant ──────────────────────────────────────────────
  pillList: {
    flexDirection: 'row',
    backgroundColor: '#ECECF0',
    borderRadius: 12,
    padding: 3,
    alignSelf: 'flex-start',
  },
  pillTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillTabActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5EAF1',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#717182',
    includeFontPadding: false,
    letterSpacing: -0.2,
  },
  pillLabelActive: {
    fontWeight: '600',
    color: '#030213',
  },

  // ── Line variant ──────────────────────────────────────────────
  lineBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF1',
    backgroundColor: '#FFFFFF',
  },
  lineBarContent: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  lineTab: {
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  lineTabActive: {
    borderBottomColor: '#006CFF',
  },
  lineLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B99AC',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  lineLabelActive: {
    fontWeight: '700',
    color: '#006CFF',
  },
});
