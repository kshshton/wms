import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../config/colors';
import {user_login} from '../../services/user_login';
import style from './style';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const onPressLogin = async () => {
    await user_login({
      email: data.email,
      password: data.password,
    }).then(res => {
      if (res.status === 200) {
        AsyncStorage.setItem('accessToken', res.data.accessToken);
        navigation.navigate('Zamówienia');
      }
    });
  };
  return (
    <View style={style.container}>
      <View style={style.inputView}>
        <TextInput
          style={style.inputText}
          placeholder="Email"
          placeholderTextColor={colors.lightBlue}
          onChangeText={text =>
            setData(prevState => ({...prevState, email: text}))
          }
        />
      </View>
      <View style={style.inputView}>
        <TextInput
          style={style.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.lightBlue}
          onChangeText={text =>
            setData(prevState => ({...prevState, password: text}))
          }
        />
      </View>
      <TouchableOpacity onPress={onPressLogin} style={style.loginBtn}>
        <Text style={style.loginText}>LOGIN </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;