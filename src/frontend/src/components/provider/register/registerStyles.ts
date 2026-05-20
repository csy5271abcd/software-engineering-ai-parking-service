import {StyleSheet} from 'react-native';

// Shared styles used across all register step components
export const shared = StyleSheet.create({
  stepScroll: {flex: 1},
  stepContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginBottom: 8,
  },
  fieldLabelGap: {marginTop: 16},
  fieldHint: {
    fontSize: 11.5,
    color: '#6B7C92',
    letterSpacing: -0.2,
    includeFontPadding: false,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EAF1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#222225',
    letterSpacing: -0.2,
    includeFontPadding: false,
  },
  inputMulti: {
    height: 100,
    paddingTop: 12,
  },
});
