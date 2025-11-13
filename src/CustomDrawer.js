import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CustomDrawer = ({
  mainContent: MainContent,
  drawerContent: DrawerContent,
  drawerWidth = width * 0.8,
  mainContentProps = {},
  drawerContentProps = {},
}) => {
  const drawerAnimation = useRef(new Animated.Value(-drawerWidth)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 提供给子组件的方法
  const drawerMethods = {
    openDrawer: () => {
      setIsDrawerOpen(true);
      Animated.parallel([
        Animated.timing(drawerAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    },
    closeDrawer: () => {
      setIsDrawerOpen(false);
      Animated.parallel([
        Animated.timing(drawerAnimation, {
          toValue: -drawerWidth,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    },
    isDrawerOpen,
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      return !isDrawerOpen && gestureState.x0 < 30;
    },
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !isDrawerOpen && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 0) {
        const newValue = Math.min(gestureState.dx - drawerWidth, 0);
        drawerAnimation.setValue(newValue);
        
        const progress = Math.abs(newValue) / drawerWidth;
        overlayAnimation.setValue(progress);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > drawerWidth / 3) {
        drawerMethods.openDrawer();
      } else {
        drawerMethods.closeDrawer();
      }
    },
  });

  const handleOverlayPress = () => {
    drawerMethods.closeDrawer();
  };

  const handleDrawerPress = (e) => {
    e.stopPropagation();
  };

  return (
    <View style={styles.container}>
      {/* 主内容 */}
      <View style={styles.mainContent}>
        <View style={styles.edgeSwipeArea} {...panResponder.panHandlers} />
        <MainContent 
          {...mainContentProps} 
          drawerMethods={drawerMethods}
        />
      </View>

      {/* 遮罩层 */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnimation,
            display: isDrawerOpen ? 'flex' : 'none',
          },
        ]}
        pointerEvents={isDrawerOpen ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={handleOverlayPress}
          activeOpacity={1}
        />
      </Animated.View>

      {/* 抽屉内容 */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            transform: [{ translateX: drawerAnimation }],
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleDrawerPress}
      >
        <DrawerContent 
          {...drawerContentProps} 
          drawerMethods={drawerMethods}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  edgeSwipeArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 998,
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 999,
  },
});

export default CustomDrawer;