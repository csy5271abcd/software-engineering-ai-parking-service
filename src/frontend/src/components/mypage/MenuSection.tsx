import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {AppCard} from '../common/AppCard';
import {AppSeparator} from '../common/AppSeparator';
import {AppIcon} from '../common/AppIcon';

export interface MenuItem {
  icon: string; // emoji
  label: string;
  sub?: string;
  badge?: string;
}

export interface MenuSectionData {
  title: string;
  items: MenuItem[];
}

interface Props {
  section: MenuSectionData;
}

export function MenuSection({section}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <AppCard padding="none" radius="xl" elevation>
        {section.items.map((item, i) => (
          <React.Fragment key={i}>
            <Pressable style={styles.menuRow}>
              <View style={styles.menuIconWrap}>
                <Text style={styles.menuIconEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.menuBody}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.sub != null && (
                  <Text style={styles.menuSub}>{item.sub}</Text>
                )}
              </View>
              {item.badge != null && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <AppIcon name="chevronRight" size={14} color="#CAD1DB" strokeWidth={2.2} />
            </Pressable>
            {i < section.items.length - 1 && (
              <AppSeparator style={styles.rowDivider} />
            )}
          </React.Fragment>
        ))}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginHorizontal: 16},
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7C92',
    letterSpacing: 0.2,
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 6,
    includeFontPadding: false,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  menuIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuIconEmoji: {
    fontSize: 15,
    textAlign: 'center',
    includeFontPadding: false,
  },
  menuBody: {flex: 1, gap: 1},
  menuLabel: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  menuSub: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  menuBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#FB5852',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  rowDivider: {marginLeft: 54},
});
