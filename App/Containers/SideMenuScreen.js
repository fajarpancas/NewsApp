import React, { Component } from 'react'
import { ScrollView, Text, Alert, View, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/SideMenuScreenStyle'
import styles from './Styles/BerandaScreenStyle'
import LoginData from '../Redux/LoginRedux'
import { Images, Colors, Fonts } from '../Themes'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

class SideMenuScreen extends React.Component{
  static propTypes = {
    dispatch: PropTypes.func,
    logout: PropTypes.func
  }

  constructor(props){
    super(props)
  // alert(JSON.stringify(this.props.login))
  }

  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      //available
    }).catch((err) => {
      console.log(error)
    })

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '901376282040-f4f9hilrvn095iptekdivn6em1bla7eh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      })
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.logout()
    } catch (error) {
      console.error(error);
    }
  };

  logout = () => {
    Alert.alert(
      'Confirm Alert',
      'Are you sure to logout this account?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          if(this.props.loginType.user.data.loginType === 'google'){
            this.signOut();
          }else{
            this.props.logout()
          }
          },
        }
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={{flex: 1} }>
        {/* <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Image source={Images.logo_blue} style={styles.logoDrawer} resizeMode='stretch' />
              </View>
              <View style={styles.boxClose}>
                <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}><Image source={Images.cancel} style={styles.search} resizeMode='stretch' /></TouchableOpacity>
              </View>
          </View> */}
          <ScrollView>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.newsMenuFocused} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() =>  alert(this.props)}>
                  <Text style={{color: Colors.buttonLog,fontSize: Fonts.size.loginButton, fontFamily: Fonts.type.SPFMed}}>News</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.videosMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Videos</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.shopMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Shop</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.rewardMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Reward</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.subscripMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Subscription</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.accMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Account</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.advMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Advertise</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.setMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Setting</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.logoutMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxNameLogout}>
                <TouchableOpacity onPress={() => this.logout()}>
                  <Text style={styles.textMenu}>Logout</Text>
                </TouchableOpacity>
              </View>
          </View>
          </ScrollView>
          
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginType: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginData.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuScreen)
