import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Platform,
} from 'react-native';

const Header: React.FC = () => {
  const handleShare = async () => {
    const shareUrl = 'https://me1pik.com';
    try {
      await Share.share({
        url: shareUrl,
        message: `멜픽에서 나만의 스타일을 찾아보세요! ${shareUrl}`,
      });
    } catch (error) {
      console.error('공유 중 에러 발생:', error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/Landing/LandingLogoIcon.png')}
        style={styles.logo}
        resizeMode='contain'
      />
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Image
          source={require('../../assets/Landing/ShareIcon.png')}
          style={styles.icon}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
  },
  logo: {
    height: 24,
    width: 100,
  },
  shareButton: {
    position: 'absolute',
    right: 20,
    padding: 8,
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default Header;
