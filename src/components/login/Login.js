import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { FontFamily, FontSize, Border, Color } from '../../UI/GlobalStyles';
import { authentication } from '../../db/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(authentication, email, password)
        .then(() => {
          setEmail('');
          setPassword('');
          navigation.navigate('Home');
        })
        .catch(e => {
          setValidEmail(false);
          setValidPassword(false);
          setEmail('');
          setPassword('');
          let errorCode = e.code;
          let errorMessage;
          switch (errorCode.substr(5)) {
            case 'ERROR_EMAIL_ALREADY_IN_USE':
            case 'account-exists-with-different-credential':
            case 'email-already-in-use':
              return setErrorMessage('Email already used. Go to login page.');
            case 'ERROR_WRONG_PASSWORD':
            case 'wrong-password':
              return setErrorMessage('Wrong email/password combination.');
            case 'ERROR_USER_NOT_FOUND':
            case 'user-not-found':
              return setErrorMessage('No user found with this email.');
            case 'ERROR_USER_DISABLED':
            case 'user-disabled':
              return setErrorMessage('User disabled.');
            case 'ERROR_TOO_MANY_REQUESTS':
            case 'operation-not-allowed':
              return setErrorMessage(
                'Too many requests to log into this account.',
              );
            case 'ERROR_OPERATION_NOT_ALLOWED':
            case 'operation-not-allowed':
              return setErrorMessage('Server error, please try again later.');
            case 'ERROR_INVALID_EMAIL':
            case 'invalid-email':
              return setErrorMessage('Email address is invalid.');
            default:
              return 'Login failed. Please try again.';
          }
        });
    } catch (e) {
      console.log(e, 'error occured');
    }
  };

  const signupHandler = () => {
    setEmail('');
    setPassword('');
    setValidEmail(true);
    setValidPassword(true);
    setErrorMessage('');
    navigation.navigate('SignUp');
  };

  const submitHandler = () => {
    if (email === '' && password === '') {
      setValidEmail(false);
      setValidPassword(false);
      setErrorMessage('Please enter valid email and password');
    } else {
      login(email, password);
    }
  };

  const emailChangeHandler = input => {
    setValidEmail(true);
    setErrorMessage('');
    setEmail(input);
  };

  const passwordChangeHandler = input => {
    setValidPassword(true);
    setErrorMessage('');
    setPassword(input);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={[styles.logoContainer]}>
          <Image
            source={require('../../assets/logo.png')}
            style={{borderRadius: 100, height: 100, width: 100}}
          />
        </View>
        <View style={[styles.form]}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="Phone number, username or email"
            autoCapitalize="none"
            autoFocus={true}
            keyboardType="email-address"
            textContentType="emailAddress"
            style={[
              styles.emailField,
              {
                borderColor: validEmail ? '#e0dddd' : 'red',
                borderWidth: !validEmail ? 1 : 3,
              },
            ]}
            onChangeText={emailChangeHandler}
            value={email}
          />
          <TextInput
            placeholderTextColor="#444"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="emailAddress"
            style={[
              styles.passwordFieldButtonChild,
              {
                borderColor: validPassword ? '#e0dddd' : 'red',
                borderWidth: !validPassword ? 1 : 3,
              },
            ]}
            onChangeText={passwordChangeHandler}
            value={password}
          />
        </View>
        {/* <View><Text style={[styles.forgotPassword]}>Forgot Password?</Text></View> */}
        {errorMessage !== '' && (
          <View style={styles.errorView}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        )}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={styles.loginContainer}>
            <TouchableOpacity
              style={styles.login}
              onPress={submitHandler}>
              <Text style={{color: 'white'}}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signup}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={signupHandler}>
            <Text style={{color: Color.royalblue_100}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    width: wp('100%'),
  },
  errorView: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    width: '80%',
    padding: 5,
  },
  loginContainer:{
    marginTop: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: '80%',
    backgroundColor: Color.purple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: hp('5%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    width: '100%',
    marginTop: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    flexDirection: 'row',
    width: '100%',
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLayout1: {
    height: 36,
    width: 330,
    position: 'absolute',
  },
  iconLayout: {
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  textPosition: {
    left: '0%',
    top: '0%',
  },
  orTypo: {
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    position: 'absolute',
  },
  orTypo1: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.robotoRegular,
  },
  linePosition: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    top: 9,
    position: 'absolute',
  },
  loginLayout: {
    height: 35,
    width: 330,
    position: 'absolute',
  },
  buttonChildLayout: {
    borderRadius: Border.br_md,
    top: 0,
  },
  logInTypo: {
    letterSpacing: 0.3,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
  },
  logInTypo1: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  form: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailLayout: {
    height: 42,
    left: 0,
    width: 330,
    position: 'absolute',
  },
  passwordTypo: {
    color: Color.darkgray_100,
    left: 18,
    top: 13,
    fontSize: FontSize.size_base,
    height: 16,
    textAlign: 'left',
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
    position: 'absolute',
  },
  facebookLayout: {
    height: 32,
    position: 'absolute',
  },
  fotterLayout: {
    width: 107,
    height: 32,
  },
  englishLayout: {
    height: 21,
    position: 'absolute',
  },
  englishLayout1: {
    width: 82,
    height: 21,
  },
  instagram1Icon: {
    top: 122,
    width: 194,
    height: 50,
    position: 'absolute',
    overflow: 'hidden',
  },
  facebookButtonChild: {
    borderRadius: 8,
    backgroundColor: Color.royalblue_100,
    left: 0,
    top: 0,
  },
  facebookLogo20191Icon: {
    top: 2,
    left: 36,
    borderRadius: 9,
    width: 53,
    height: 30,
    position: 'absolute',
    overflow: 'hidden',
  },
  continueWithFacebook: {
    left: 92,
    color: '#fff9f9',
    width: 220,
    height: 16,
    textAlign: 'left',
    top: 9,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
    fontSize: FontSize.size_xl,
    position: 'absolute',
  },
  facebookButton: {
    left: 42,
    top: 237,
  },
  lightPortrait1: {
    top: 862,
    left: 140,
    width: 134,
    height: 34,
    position: 'absolute',
    overflow: 'hidden',
  },
  batteryIcon: {
    height: '62.96%',
    width: '7.4%',
    top: '24.07%',
    right: '0%',
    bottom: '12.96%',
    left: '92.6%',
  },
  wifiIcon: {
    height: '61.11%',
    width: '4.67%',
    top: '24.06%',
    right: '8.94%',
    bottom: '14.83%',
    left: '86.39%',
  },
  cellularConnectionIcon: {
    height: '59.26%',
    width: '5.18%',
    top: '25.93%',
    right: '15.13%',
    bottom: '14.81%',
    left: '79.69%',
  },
  text: {
    color: Color.black,
    width: '100%',
  },
  barsStatusBarIphoneX: {
    height: '100%',
    width: '8.84%',
    right: '91.16%',
    bottom: '0%',
    position: 'absolute',
  },
  barsStatusBarIphoneL: {
    height: '40.91%',
    width: '87.51%',
    top: '29.55%',
    right: '3.82%',
    bottom: '29.55%',
    left: '8.66%',
    position: 'absolute',
  },
  notificationBar: {
    top: -1,
    width: 414,
    height: 44,
    left: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  lineChild: {
    backgroundColor: '#ccc',
    borderColor: '#c5c5c5',
    width: 121,
    left: 0,
  },
  lineItem: {
    left: 206,
    backgroundColor: Color.silver,
    borderColor: '#ccc',
    width: 125,
  },
  or: {
    left: 155,
    color: 'rgba(15, 14, 14, 0.5)',
    top: 0,
  },
  line: {
    top: 308,
    height: 18,
    width: 330,
    left: 42,
    position: 'absolute',
  },
  loginButtonChild: {
    backgroundColor: 'rgba(24, 119, 242, 0.36)',
    left: 0,
  },
  logIn: {
    color: '#fffefe',
    backgroundColor: 'rgba(24, 119, 242, 0.36)',
  },
  loginButton: {
    top: 216,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emailField: {
    backgroundColor: Color.gainsboro,

    borderWidth: 2,
    borderStyle: 'solid',
    height: 42,
    width: '80%',
    borderRadius: Border.br_md,
    paddingLeft: 5,
  },
  passwordFieldButtonChild: {
    backgroundColor: Color.gainsboro,
    borderColor: '#e0dddd',
    borderWidth: 2,
    borderStyle: 'solid',
    height: 42,
    top: 10,
    width: '80%',
    borderRadius: Border.br_md,
    paddingLeft: 5,
  },
  emailFieldButton: {
    top: 0,
  },
  password: {
    width: 71,
  },
  emailFieldButton1: {
    top: 50,
  },
  phoneNumberusernameOr: {
    width: 233,
  },
  loginPasswordField: {
    top: 200,
    height: 92,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  forgotPassword: {
    marginTop: 20,
    letterSpacing: 0.5,
    color: Color.royalblue_100,
    width: '100%',
    fontSize: FontSize.size_base,
    height: 18,
    paddingRight: 38,
    textAlign: 'right',
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
    position: 'absolute',
  },
  dontHaveAn: {
    color: Color.darkgray_200,
  },
  text1: {
    color: Color.black,
  },
  signUp: {
    color: '#267ff3',
  },
  dontHaveAnContainer: {
    top: 581,
    left: 98,
    width: 218,
    height: 29,
    position: 'absolute',
  },
  from1: {
    color: Color.darkgray_200,
  },
  from: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  facebook2: {
    color: '#070000',
  },
  facebook1: {
    fontFamily: FontFamily.montserratRegular,
  },
  facebook: {
    margin: 0,
  },
  fromFacebook: {
    whiteSpace: 'pre-wrap',
    left: 0,
    top: 0,
  },
  fotter: {
    top: 830,
    left: 167,
  },
  english1: {
    color: Color.silver,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xl,
    left: 0,
    top: 0,
  },
  englishWrapper: {
    left: 0,
    top: 0,
  },
  bichevronCompactDownIcon: {
    left: 62,
    width: 16,
    top: 0,
    overflow: 'hidden',
  },
  english: {
    top: 51,
    left: 166,
  },
  facebookLogoIcon: {
    left: 95,
    width: 32,
    top: 237,
  },
  introductionPage: {
    backgroundColor: '#fff',
    flex: 1,
    height: 896,
    overflow: 'hidden',
    width: '100%',
  },
});

export default Login;
