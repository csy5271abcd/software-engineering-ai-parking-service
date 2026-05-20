import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RootStackParamList} from '../../navigation/navigationTypes';

type Props = StackScreenProps<RootStackParamList, 'SplashScreen'>;

export function SplashScreen({navigation}: Props): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.72)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({index: 0, routes: [{name: 'MainTab'}]}),
        );
      }, 900);
    });
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity, transform: [{scale}]}}>
        <Image
          source={require('../../assets/Logo/SmartParkLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
