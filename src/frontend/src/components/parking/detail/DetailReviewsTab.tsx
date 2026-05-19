import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const MOCK_REVIEWS = [
  {user: '이*수', date: '5월 16일', rating: 5, text: '입구 NFC가 빨라서 좋아요. 도보 거리도 가까웠어요.'},
  {user: '박*현', date: '5월 14일', rating: 4, text: '곧 비워질 자리 정보가 정확했습니다. 다음에도 이용할게요.'},
  {user: '김*민', date: '5월 12일', rating: 5, text: '주말에도 비교적 한산했어요. 추천합니다!'},
] as const;

function Stars({count}: {count: number}): React.JSX.Element {
  return (
    <View style={starStyles.row}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={[starStyles.star, i <= count && starStyles.starOn]}>
          ★
        </Text>
      ))}
    </View>
  );
}

const starStyles = StyleSheet.create({
  row: {flexDirection: 'row', gap: 1},
  star: {fontSize: 13, color: '#E5EAF1', includeFontPadding: false},
  starOn: {color: '#FFB800'},
});

export function DetailReviewsTab(): React.JSX.Element {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* Rating summary */}
      <View style={styles.ratingCard}>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingScore}>4.6</Text>
          <Text style={styles.ratingCount}>· 리뷰 124개</Text>
        </View>
        <Stars count={5} />
      </View>

      {/* Review list */}
      {MOCK_REVIEWS.map((r, i) => (
        <View
          key={i}
          style={[styles.reviewItem, i < MOCK_REVIEWS.length - 1 && styles.reviewBorder]}
        >
          <View style={styles.reviewHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{r.user[0]}</Text>
            </View>
            <Text style={styles.reviewUser}>{r.user}</Text>
            <Text style={styles.reviewDate}>{r.date}</Text>
            <Stars count={r.rating} />
          </View>
          <Text style={styles.reviewText}>{r.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {padding: 16, paddingBottom: 100, gap: 0},

  ratingCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EAF1',
    padding: 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },
  ratingCount: {
    fontSize: 13,
    color: '#8B99AC',
    includeFontPadding: false,
  },

  reviewItem: {
    paddingVertical: 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  reviewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4D5A6A',
    includeFontPadding: false,
  },
  reviewUser: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222225',
    includeFontPadding: false,
  },
  reviewDate: {
    fontSize: 12,
    color: '#8B99AC',
    includeFontPadding: false,
    flex: 1,
  },
  reviewText: {
    fontSize: 13,
    color: '#4D5A6A',
    lineHeight: 19,
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
});
