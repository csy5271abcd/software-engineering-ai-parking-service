import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import {AppIcon} from './AppIcon';
import type {AppIconName} from './AppIcon';

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  autoFocus?: boolean;
  returnKeyType?: 'search' | 'done' | 'go' | 'next';
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
}

export function AppTextInput({
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconPress,
  autoFocus,
  returnKeyType = 'search',
  style,
  multiline = false,
}: AppTextInputProps): React.JSX.Element {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrap,
        focused && styles.wrapFocused,
        style,
      ]}
    >
      {leftIcon != null && (
        <AppIcon name={leftIcon} size={16} color="#717182" strokeWidth={2} />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#717182"
        style={styles.input}
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        clearButtonMode="never"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={multiline}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {rightIcon != null && (
        <Pressable onPress={onRightIconPress} hitSlop={8} disabled={!onRightIconPress}>
          <AppIcon name={rightIcon} size={16} color="#717182" strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F3F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 11 : 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  wrapFocused: {
    borderColor: '#006CFF',
    backgroundColor: '#FFFFFF',
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
});
