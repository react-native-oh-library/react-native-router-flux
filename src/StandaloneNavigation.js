// StandaloneNavigation.js
import React from 'react';
import { NavigationContainer,createNavigationContainerRef,useRoute } from '@react-navigation/native';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button,Image, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import {drawerData,tabData,sceneOriginData,clonesData} from 'react-native-router-flux/src/Store.js'
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { func } from 'prop-types';
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import CustomDrawer from 'react-native-router-flux/src/CustomDrawer.js'
const Drawer = createDrawerNavigator();

 const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export var sceneData={};


export const navigationRef = createNavigationContainerRef();


export function ToggleNavTab(action){
 
   const type = action.type;
  if(navigationRef.isReady()&&type==="Navigation/SET_PARAMS"&&action.key!==undefined){
   const currentRoute = navigationRef.getCurrentRoute();
    const isCurrentTab = currentRoute?.name === action.key;
    
    console.info("📊 当前状态:", {
      targetTab: action.key,
      currentTab: currentRoute?.name,
      isCurrentTab: isCurrentTab
    });

       navigationRef.navigate(currentRoute?.name, action.params);
      
      }

}


export function ReplaceAction(action){
 
   const type = action.type;
    if(navigationRef.isReady()&&type==="REACT_NATIVE_ROUTER_FLUX_REPLACE"&&action.routeName!=undefined){
   //navigateByKey(action.routeName);
  const tabitem=findTabScreenInYourStructure(action.routeName);

  console.info("找到的tabitem=",tabitem);
  if(tabitem!=null){
navigationRef.navigate(tabitem.key);
return true;
  }
            
      }
      return false;

}


const findTabClone=(targetKey)=>{

  for(const item of clonesData){
     if(item.key==targetKey){
      return true;
     }

  }
  return false;
}

const findTabScreenInYourStructure = (targetKey) => {
  try {
    // 从你的 drawerData 结构中获取 tabchildren
    var sceneInfo = drawerData.props.children.props;
    var tabsInfo_tabbar = sceneInfo.children.props;
    var tabchildren = tabsInfo_tabbar.children;
    
    // 统一处理为数组
    if (!Array.isArray(tabchildren)) {
      tabchildren = [tabchildren];
    }
    
    console.log(`🔍 在 ${tabchildren.length} 个 Tab.Screen 中查找 key: ${targetKey}`);

      // 安全地处理 children
      const children = tabchildren;
      if (children) {
        // 将 children 转换为数组进行安全迭代
        const childrenArray = Array.isArray(children) ? children : [children];
      
    
    
    for (const tabItem of childrenArray) {
      if (!tabItem) continue;
      
      console.log(`🔍 检查: ${tabItem.key} - ${tabItem.props?.title || '无标题'}`);
      
      if (tabItem.key === targetKey) {
        console.log(`✅ 找到匹配的 Tab.Screen:`, tabItem);
        return tabItem;
      }else{
   const childrenArraydata = Array.isArray(tabItem.props?.children) ? tabItem.props?.children : [tabItem.props?.children];
      
       if(childrenArraydata)
          for(const itemins of childrenArraydata){

             console.log(`✅ 找到匹配的 itemins.Screen:`, itemins); 
            if( itemins!=undefined&& itemins.key === targetKey){
              return tabItem;
            }
          }

        console.log(`✅ 找到匹配的 ssTab.Screen:`, tabItem);
      }
    }  }
    
    console.log(`❌ 未找到 key: ${targetKey}`);
    return null;
    
  } catch (error) {
    console.log("❌ 查找过程中出错:", error);
    return null;
  }
};
// 获取当前页面名称（ID）
const getCurrentScreenId = () => {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute?.name; // 这就是当前页面的 ID/名称
};

export function goBackWithAction() {
  if(navigationRef.isReady()){
  var id=getCurrentScreenId();

  var tabitem=findRouteNameByKey(id);
  console.info("backinfo==id=",id);
    console.info("backinfo==tabitem=",tabitem);
    if(tabitem!=null&&tabitem.key==id){

    }else{
 navigationRef.current?.goBack();
 return true;
    }

  }
  return false;
 
}

const checkNavigationStructure = () => {
  if (navigationRef.current) {
    const state = navigationRef.current.getRootState();
    console.log('🎯 导航结构:', JSON.stringify(state, null, 2));
  }
};

export function navigationAction(action, result) {
  console.info("daohangaction", action);
  
  const type = action.type;
  const routeName_key = action.routeName;

      if(navigationRef.isReady()&&type==="Navigation/RESET"){

        checkNavigationStructure();

         var sceneInfo = drawerData.props?.children.props;
  var tabsInfo_tabbar = sceneInfo?.children?.props;


       if(action.actions!=undefined&&action.actions.length>0&&action.actions[0].routeName==tabsInfo_tabbar.routeName){

         var tabchildren = tabsInfo_tabbar.children;
       var inittab=  getInitName(tabchildren);

       if(inittab!==undefined)
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: inittab }]
      })
    );
    return true;
       }
     

      }

    if(navigationRef.isReady()&&type==="Navigation/PUSH"&&routeName_key!==undefined){

    console.info("📝 设置参数000:",routeName_key, action.params);

         const tabitem=findTabScreenInYourStructure(action.routeName);
  console.info("找到的tabitempush=",tabitem);
  console.info("scenedata===",sceneOriginData);

  if(tabitem!=null){
navigationRef.current?.navigate(tabitem.key,  {
      screen:routeName_key,
      params:action.params
    });
    return true;
  }
    

    if(tabitem==null){

     const findboo= findTabClone(action.routeName);
      console.info("scenedata=clone==",findboo);
     if(findboo){
  //  navigationRef.current?.navigate(routeName_key,  {
  //     screen:routeName_key,
  //     params:action.params
  //   });

    navigationRef.current?.navigate(routeName_key, action.params);

        return true;
     }
    
    }
    //  navigationRef.setParams()
     
  }
  else
    if (routeName_key!==undefined&& navigationRef.isReady()) {
    console.info("daohangactionrouteName_key", routeName_key);
    navigationRef.navigate(routeName_key, action.params);
        return true;
  }

  if(navigationRef.isReady()&&type==="Navigation/SET_PARAMS"&&action.key!==undefined){

    console.info("📝 设置参数:", action.key, action.params);
    
    // 在 v6 中，使用 setParams 方法
  if (isRouteName(action.key)) {
        console.info("🎯 导航到路由设置参数:", action.key);
 
    const currentRoute = navigationRef.getCurrentRoute();
    const isCurrentTab = currentRoute?.name === action.key;
    
    console.info("📊 当前状态:", {
      targetTab: action.key,
      currentTab: currentRoute?.name,
      isCurrentTab: isCurrentTab
    });
       navigationRef.navigate(action.key, action.params);
    //  navigationRef.setParams()
        return true;
      }
  }
      return false;
  // if (type === 'Navigation/NAVIGATE' && navigationRef.isReady()) {
  //   console.info("daohangactionrouteName_key", routeName_key);
  //   navigationRef.navigate(routeName_key, action.params);
  // }
}


function isRouteName(key) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key);
}

// React Navigation v6 的设置参数方法
function handleSetParamsV6(routeKey, params) {
  try {
    // 方法1: 获取当前路由并设置参数
    const currentRoute = navigationRef.getCurrentRoute();
    
    if (currentRoute && currentRoute.key === routeKey) {
      // 如果是当前路由，可以直接设置参数
      navigationRef.setParams(params);
      console.info("✅ 参数已设置:", params);
    } else {
      // 如果不是当前路由，需要通过导航来传递参数
      console.info("🔄 目标路由不是当前路由，通过导航传递参数");
      handleSetParamsViaNavigation(routeKey, params);
    }
  } catch (error) {
    console.error("❌ 设置参数失败:", error);
    // 回退到导航方式
    handleSetParamsViaNavigation(routeKey, params);
  }
}


function handleSetParamsViaNavigation(routeKey, params) {
  // 通过导航到目标路由来传递参数
  const routeName = findRouteNameByKey(routeKey);
  
  if (routeName) {
    console.info("🔄 通过导航更新参数:", routeName);
    navigationRef.navigate(routeName, params);
  } else {
    console.warn("⚠️ 无法找到路由名称，无法更新参数");
  }
}

// 辅助函数：通过 key 查找路由名称
function findRouteNameByKey(targetKey) {
  if (!navigationRef.isReady()) return null;
  
  const state = navigationRef.getState();
  
  const findRouteInState = (navigationState) => {
    if (!navigationState) return null;
    
    // 检查当前层级的 routes
    if (navigationState.routes) {
      for (const route of navigationState.routes) {
        if (route.key === targetKey) {
          return route.name;
        }
        // 递归检查嵌套状态
        if (route.state) {
          const found = findRouteInState(route.state);
          if (found) return found;
        }
      }
    }
    return null;
  };
  
  return findRouteInState(state);
}


// 创建 Tab 状态管理 Hook
function useTabParams() {
  const [tabParams, setTabParams] = React.useState({});
  
  React.useEffect(() => {
    if (!navigationRef.isReady()) return;
    
    const updateTabParams = () => {
      const state = navigationRef.getRootState();
      const newParams = {};
      
      // 递归收集所有路由的参数
      const collectParams = (navState) => {
        if (!navState?.routes) return;
        
        navState.routes.forEach(route => {
          if (route.params) {
            newParams[route.name] = route.params;
          }
          if (route.state) {
            collectParams(route.state);
          }
        });
      };
      
      collectParams(state);
      setTabParams(newParams);
    };
    
    // 初始更新
    updateTabParams();
    
    // 监听导航变化
    const unsubscribe = navigationRef.addListener('state', updateTabParams);
    
    return unsubscribe;
  }, []);
  
  return tabParams;
}
// 标签页导航器
function MainTabs00() {
  return (
    <Tab.Navigator
    initialRouteName='Profile'
    
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: '首页' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={GetTestStack}
        options={{ title: '资料' }}
      />
 
    </Tab.Navigator>
  );
}

function GetTestStack(){

  return <Stack.Navigator initialRouteName='tab1'>

    <Stack.Screen       name="ta0" 
        component={ProfileScreen}
        options={{ title: '资料ertre' }}></Stack.Screen>

           <Stack.Screen             name="tab1" 
        component={SettingsScreen}
        options={{ title: '设置' }}></Stack.Screen>
  </Stack.Navigator>
}


function getInitName(tabs){

  for(const item of tabs){

      const { 
            component,
            initial,
             hideNavBar,
             hideTabBar,
            title, 
            tabBarLabel, 
            inactiveBackgroundColor, 
            activeBackgroundColor, 
            icon, 
            navigationBarStyle, 
            titleStyle, 
            children 
          } = item.props;
    if(initial){
        return item.key
    }
  }
}


 export function MainTabs000008({route,navigation}) {



  
  console.log("📦 drawer scene maintabs对象drawerData:", drawerData);

    console.log("📦 drawer scene maintabs对象drawerData--route-:", route);

  var sceneInfo = drawerData.props.children.props;
  var tabsInfo_tabbar = sceneInfo.children.props;
  var tabchildren = tabsInfo_tabbar.children;

  console.log("📦 drawer scene maintabs对象tabsInfo_tabbar:", tabsInfo_tabbar);
  console.log("📦 drawer scene maintabs对象tabchildren:", tabchildren);

  return (
    <Tab.Navigator
    key="tabbar"
    name="tabbar"
    routeName="tabbar"
    initialRouteName={getInitName(tabchildren)}

        screenOptions={({ route }) => {
 
 // 直接使用 navigationRef 获取最新参数
    // const getLatestParams = () => {
    //   if (!navigationRef.isReady()) return {};
    //   const state = navigationRef.getState();
    //   const tabRoute = state.routes.find(r => r.name === route.name);
    //   return tabRoute?.params || {};
    // };
    
    // const tabParams = getLatestParams();

    // console.info("latestparams",tabParams);
    // const hideTabBar = tabParams.hideTabBar || false;
    
    // return {
    //   tabBarStyle: hideTabBar ? { display: 'none' } : { display: 'flex' },
    // };

    
    return {
   // 全局标签栏样式
        tabBarShowLabel: tabsInfo_tabbar.showLabel,
          // 激活状态标签样式
    tabBarActiveBackgroundColor: tabsInfo_tabbar.activeBackgroundColor,
      
 // inactiveBackgroundColor: tabsInfo_tabbar.inactiveBackgroundColor, // 整个标签栏的背景色
   // tabBarActiveBackgroundColor:tabsInfo_tabbar.activeBackgroundColor, // 激活状态文字/图标颜色
   // tabBarBackground: tabsInfo_tabbar.inactiveBackgroundColor,  // 非激活状态颜色

      tabBarBackground: () => (
      <View style={{ 
       flex: 1, 
        backgroundColor: tabsInfo_tabbar.inactiveBackgroundColor 
      }} />
    ),
      // 其他样式...
    };
  }}
    >
      {tabchildren.map((tabItem, index) => {

        // 获取标签页信息
        const tabProps = tabItem.props;
        const tabKey = tabItem.key;
        const tabTitle = tabProps.title || `Tab ${index + 1}`;


        // 直接解构获取需要的属性
          const { 
            component,
            initial,
             hideNavBar,
             hideTabBar,
            title, 
            tabBarLabel, 
            inactiveBackgroundColor, 
            activeBackgroundColor, 
            icon, 
            navigationBarStyle, 
            titleStyle, 
            children 
          } = tabItem.props;
      



        console.log(`📦 处理标签页 ${tabKey}:`, tabProps);
           console.log(`📦 处理标签页 ${title}:`, children);

         var  tabBarStyledata={};
      
           if(children==undefined){
            var Dcom=component;

          return (
          <Tab.Screen 
            key={tabKey}
            hideTabBar={hideTabBar}
            name={tabKey} 
           
            options={({ navigation,route }) => {
              
                      const finalHideTabBar = route.params?.hideTabBar ?? hideTabBar;
                            const finalhideNavBar=  route.params?.hideNavBar??hideNavBar
              
              return{ 
              
              title: title||tabItem.title,
              headerShown: !finalhideNavBar,

              // Header 左边抽屉按钮
              headerLeft: () => (
                <TouchableOpacity 
                  onPress={() => navigation.openDrawer()}
                  activeOpacity={0.7}
                  style={{ marginLeft: 15 }}
                >
                  <Image 
                    source={drawerData.props.drawerImage} 
                    style={{ width: 24, height: 24 }} 
                  />
                </TouchableOpacity>
              ),
        
              tabBarStyle: hideTabBar ? { display: 'none' } : { display: 'flex' },
              // 顶部导航栏样式
              headerStyle: {
                backgroundColor:navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color: titleStyle?.color || '#000',
              },

              // 底部标签栏图标和样式
              tabBarIcon: ({ focused, color, size }) => {
                if (icon) {
                  // 使用自定义图标组件
                  return React.createElement(icon, {
                    focused,
                    title: tabTitle
                  });
                }
                // 默认图标
                return (
                  <Ionicons 
                    name={focused ? 'home' : 'home-outline'} 
                    size={size} 
                    color={color} 
                  />
                );
              },
            }}}
          >

             {(props) => (  // ✅ 使用 children
              <Dcom  title={title||tabItem.title} 
      name={tabKey}
       />
            )}
  
          </Tab.Screen>
        );
           }
       
        var StackCompent=GetTabStack(children,tabItem.props,drawerData,tabsInfo_tabbar);

        return  (
          <Tab.Screen 
            key={tabKey}
            name={tabKey} 
      
            options={({ navigation,route }) => {

    console.info(`📊 Tab ${route.name} hideTabBar:`, hideTabBar);
        console.info(`📊 Tab ${route.name} initial:`, initial);
        console.info(`📊 Tab ${route.name} hideTabBarroute:`, route);

          const finalHideTabBar = route.params?.hideTabBar ?? hideTabBar;
              return { 
              title: title,
              headerShown: false,
  // 底部标签栏图标和样式
              tabBarIcon: ({ focused, color, size }) => {
                if (icon) {
                  // 使用自定义图标组件
                  return React.createElement(icon, {
                    focused,
                    title: tabTitle
                  });
                }
                // 默认图标
                return (
                  <Ionicons 
                    name={focused ? 'home' : 'home-outline'} 
                    size={size} 
                    color={color} 
                  />
                );
              },
                 tabBarStyle: finalHideTabBar ? { display: 'none' } : { display: 'flex' },
            }}}
          >



             {() => (
    StackCompent
  )}

            </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
}


function GetTabStack000888(childrenScens,tabItem,drawerData,tabbarinfo){

    // 确保 childrenScens 是数组
  const scenesArray = Array.isArray(childrenScens) 
    ? childrenScens 
    : childrenScens ? [childrenScens] : [];

  console.log("📦 childrenScens 数据类型:", typeof childrenScens);
  console.log("📦 转换后的 scenesArray:", scenesArray);

   return <Stack.Navigator>

  {scenesArray.map((stackSceneItem) => {

        // 获取标签页信息

        let sceneKey = stackSceneItem.key;
        // 直接解构获取需要的属性
          const { 
            hideNavBar,
            component, 
            title, 
            onRight, 
            rightTitle,
            renderRightButton
          } = stackSceneItem.props;
          var ComP=component;

                  console.info("logggoookey==",sceneKey);
        console.info("logggooo",stackSceneItem.props);

        console.log(`📦 处理stackscene页 :`, stackSceneItem);

          console.log(`📦 处理stackscene页 rightTitle:`, rightTitle);

          var rightFun=()=>{};

       if(rightTitle!==undefined) {
    rightFun=() => 
              <TouchableOpacity 
     onPress={onRight}
     activeOpacity={0.7} // 点击时的透明度
      >
           <Text  >{rightTitle}</Text>
        
            </TouchableOpacity>
           
          
       }  else if(renderRightButton!==undefined){
        rightFun=renderRightButton
       }

  

     return  <Stack.Screen 
       key={sceneKey }
      name={sceneKey }
      routeName={sceneKey}
      routeKey={sceneKey}
      options={({ route,navigation }) => {
          console.info(`📊 Tab ${route.name} hideNavBar:`, hideNavBar);
        console.info(`📊 Tab ${route.name} hideNavBar:`, route);

      const finalhideNavBar=  route.params?.hideNavBar??hideNavBar
         console.info(`📊 Tab ${route.name} finalhideNavBar:`, finalhideNavBar);
      return  { 
        headerShown:!finalhideNavBar,
          title:title||tabItem.title,

         // Header 左边抽屉按钮
              headerLeft: () => (
                <TouchableOpacity 
                  onPress={() => navigation.openDrawer()}
                  activeOpacity={0.7}
                  style={{ marginLeft: 15 }}
                >
                  <Image 
                    source={drawerData.props.drawerImage} 
                    style={{ width: 24, height: 24 }} 
                  />
                </TouchableOpacity>
              ),
      
              // 顶部导航栏样式
              headerStyle: {
                backgroundColor:tabItem.navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: tabItem.titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color:tabItem. titleStyle?.color || '#000',
              },

              // 底部标签栏图标和样式
              // tabBarIcon: ({ focused, color, size }) => {
              //   if (tabItem.icon) {
              //     // 使用自定义图标组件
              //     return React.createElement(tabItem.icon, {
              //       focused,
              //      // title: tabbarinfo.tabBarLabel
              //      title:"titless"
                   
              //     });
              //   }
              //   // 默认图标
              //   return (
              //     <Ionicons 
              //       name={focused ? 'home' : 'home-outline'} 
              //       size={size} 
              //       color={color} 
              //     />
              //   );
              // },
     
           headerRight:rightFun, // 右边文字
       }}}
    >


  {({route}) => {  // ✅ 使用 children

const { data } = route.params || {};

         return     <ComP  title={title||tabItem.title} 
 name={sceneKey}
    onRight={onRight}
    data={data}
        rightTitle={rightTitle||""}/>
  }
            
            
            }




      </Stack.Screen>
     })}

  </Stack.Navigator>
}
// 标签页导航器
 const  MainTabs=({route, navigation}) =>{



  
  console.log("📦 drawer scene maintabs对象drawerData:", drawerData);

    console.log("📦 drawer scene maintabs对象drawerData--route-:", route);

  var sceneInfo = drawerData.props.children.props;
  var tabsInfo_tabbar = sceneInfo.children.props;
  var tabchildren = tabsInfo_tabbar.children;

  console.log("📦 drawer scene maintabs对象tabsInfo_tabbar:", tabsInfo_tabbar);
  console.log("📦 drawer scene maintabs对象tabchildren:", tabchildren);

  return (
    <Tab.Navigator
    key="tabbar"
    name="tabbar"
    routeName="tabbar"

    initialRouteName={getInitName(tabchildren)}

        screenOptions={({ route }) => {
 


    
    return {
   // 全局标签栏样式
        tabBarShowLabel: tabsInfo_tabbar.showLabel,
          // 激活状态标签样式
    tabBarActiveBackgroundColor: tabsInfo_tabbar.activeBackgroundColor,

    tabBarInactiveBackgroundColor: tabsInfo_tabbar.inactiveBackgroundColor,

    tabBarStyle:tabsInfo_tabbar.tabBarStyle,
      
 // inactiveBackgroundColor: tabsInfo_tabbar.inactiveBackgroundColor, // 整个标签栏的背景色
   // tabBarActiveBackgroundColor:tabsInfo_tabbar.activeBackgroundColor, // 激活状态文字/图标颜色
   // tabBarBackground: tabsInfo_tabbar.inactiveBackgroundColor,  // 非激活状态颜色

    //   tabBarBackground: () => (
    //   <View style={{ 
       
    //     backgroundColor: tabsInfo_tabbar.inactiveBackgroundColor ,
    //     height:60
    //   }} />
    // ),
      // 其他样式...
    };
  }}
    >
      {tabchildren.map((tabItem, index) => {

        // 获取标签页信息
        const tabProps = tabItem.props;
        const tabKey = tabItem.key;
        const tabTitle = tabProps.title || `Tab ${index + 1}`;


        // 直接解构获取需要的属性
          const { 
            component,
            initial,
             hideNavBar,
             hideTabBar,
            title, 
            tabBarLabel, 
            inactiveBackgroundColor, 
            activeBackgroundColor, 
            icon, 
            navigationBarStyle, 
            titleStyle, 
            children ,
            onRight,
            rightTitle,
            renderRightButton
          } = tabItem.props;
      



        console.log(`📦 处理标签页 ${tabKey}:`, tabProps);
           console.log(`📦 处理标签页 ${title}:`, children);

         var  tabBarStyledata={};
      
           if(children==undefined){
            var Dcom=component;

     console.log(`📦 处理标签页 ${tabKey} Dcom:`, Dcom);
                var rightFun=()=>{};

       if(rightTitle!==undefined) {
    rightFun=() => 
              <TouchableOpacity 
     onPress={onRight}
     activeOpacity={0.7} // 点击时的透明度
      >
           <Text  >{rightTitle}</Text>
        
            </TouchableOpacity>
           
          
       }  else if(renderRightButton!==undefined){
        rightFun=renderRightButton
       }
          return (
          <Tab.Screen 
            key={tabKey}
            hideTabBar={hideTabBar}
            name={tabKey} 
           
            options={({ route }) => {
              
                      const finalHideTabBar = route.params?.hideTabBar ?? hideTabBar;
                            const finalhideNavBar=  route.params?.hideNavBar??hideNavBar
              
              return{ 
              
              title: title||tabItem.title,
              headerShown: !finalhideNavBar,

              // Header 左边抽屉按钮
              headerLeft: () => (
                <TouchableOpacity 
         
                  activeOpacity={0.7}
                  style={{ marginLeft: 15 }}
                >
                  <Image 
                    source={drawerData.props.drawerImage} 
                    style={{ width: 32, height: 32 }} 
                     resizeMode= 'contain'
                  />
                </TouchableOpacity>
              ),
        
              tabBarStyle: hideTabBar ? { display: 'none' } : { display: 'flex' },
              // 顶部导航栏样式
              headerStyle: {
                backgroundColor:navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color: titleStyle?.color || '#000',
              },

              // 底部标签栏图标和样式
              tabBarIcon: ({ focused, color, size }) => {
                if (icon) {
                  // 使用自定义图标组件
                  return React.createElement(icon, {
                    focused,
                    title: tabTitle
                  });
                }
                // 默认图标
                return (
                  <Ionicons 
                    name={focused ? 'home' : 'home-outline'} 
                    size={size} 
                    color={color} 
                  />
                );
              },
            }}}
          >
     {() => (
        <Stack.Navigator>
          {/* 主屏幕 */}
          <Stack.Screen 
            name={tabKey}
        
                  options={({ route }) => {
          console.info(`📊 Tab ${route.name} hideNavBar:`, hideNavBar);
        console.info(`📊 Tab ${route.name} hideNavBar:`, route);

      const finalhideNavBar=  route.params?.hideNavBar??hideNavBar
         console.info(`📊 Tab ${route.name} finalhideNavBar:`, finalhideNavBar);

         
      return  { 
        headerShown:!finalhideNavBar,
          title:title||tabItem.title,

         // Header 左边抽屉按钮
              headerLeft: () => (
                <TouchableOpacity 
            onPress={() => navigation.openDrawer()}
                  activeOpacity={0.7}
                  style={{ marginLeft: 15 }}
                >
                  <Image 
                    source={drawerData.props.drawerImage} 
                    style={{ width: 32, height: 32 }} 
                     resizeMode= 'contain'
                  /> 
                </TouchableOpacity>
              ),
      
              // 顶部导航栏样式
              headerStyle: {
                backgroundColor:tabItem.navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: tabItem.titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color:tabItem. titleStyle?.color || '#000',
              },
     
           headerRight:rightFun, // 右边文字
       }}}
          >
            {({ route }) => {
              const { data } = route.params || {};
              
              return (
                <Dcom
                  name={tabKey}
                 data={data}
                  title={title||tabItem.title} 
                />
              );
            }}
          </Stack.Screen>

          {/* 克隆屏幕 */}
          {clonesData.map((stackSceneItem) => {
            if (!stackSceneItem || !stackSceneItem.props) {
              console.warn('❌ 无效的 stackSceneItem:', stackSceneItem);
              return null;
            }

            let sceneKey = stackSceneItem.key;
            const { 
              back,
              clone, 
              component, 
              getTitle,
              title,
              hideNavBar 
            } = stackSceneItem.props;
            
            const ComP =component ;

            console.log(`🎯 处理 clone 组件 ${sceneKey}:`, {
              component: ComP?.name,
              clone: clone,
              back: back,
              title: title
            });

            // 如果不是克隆屏幕，跳过
            if (!clone) return null;

            return (
              <Stack.Screen 
                key={sceneKey}
                name={sceneKey}
                options={({ route }) => {
                  const finalHideNavBar = route.params?.hideNavBar ?? hideNavBar;
                  
                  return { 
                    headerShown: !finalHideNavBar,
                    title: tabItem.title || sceneKey,

                          headerTitleAlign: route.params?.titleStyle?.alignSelf || 'center',
                    headerStyle: {
                      backgroundColor: '#F5FCFF',
                    },
                  };
                }}
              >
                {({ route }) => {
                  const { data } = route.params || {};
                  
                  return (
                    <ComP  
                      name={sceneKey}
                      data={data}
                      isClone={true}
                    />
                  );
                }}
              </Stack.Screen>
            );
          })}
        </Stack.Navigator>
      )}
          </Tab.Screen>
        );
           }
       
        var StackCompent=GetTabStack(children,tabItem.props,drawerData,tabsInfo_tabbar,navigation);

        return  (
          <Tab.Screen 
            key={tabKey}
            name={tabKey} 
      
            options={({ navigation,route }) => {

    console.info(`📊 Tab ${route.name} hideTabBar:`, hideTabBar);
        console.info(`📊 Tab ${route.name} initial:`, initial);
        console.info(`📊 Tab ${route.name} hideTabBarroute:`, route);

          const finalHideTabBar = route.params?.hideTabBar ?? hideTabBar;
              return { 
              title: title,
              headerShown: false,
  // 底部标签栏图标和样式
              tabBarIcon: ({ focused, color, size }) => {
                if (icon) {
                  // 使用自定义图标组件
                  return React.createElement(icon, {
                    focused,
                    title: tabTitle
                  });
                }
                // 默认图标
                return (
                  <Ionicons 
                    name={focused ? 'home' : 'home-outline'} 
                    size={size} 
                    color={color} 
                  />
                );
              },
                 tabBarStyle: finalHideTabBar ? { display: 'none' } : { display: 'flex' },
            }}}
          >



             {() => (
     StackCompent

   
  )}

            </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
}


function GetTabStack(childrenScens,tabItem,drawerData,tabbarinfo,navigation){

    // 确保 childrenScens 是数组
  const scenesArray = Array.isArray(childrenScens) 
    ? childrenScens 
    : childrenScens ? [childrenScens] : [];

  console.log("📦 childrenScens 数据类型:", typeof childrenScens);
  console.log("📦 转换后的 scenesArray:", scenesArray);
 
   return <Stack.Navigator>
{ 
  scenesArray.map((stackSceneItem) => {

        // 获取标签页信息

        let sceneKey = stackSceneItem.key;
        // 直接解构获取需要的属性
          const { 
            hideNavBar,
            component, 
            title, 
            onRight, 
            rightTitle,
            renderRightButton
          } = stackSceneItem.props;
          var ComP=component;

                  console.info("logggoookey==",sceneKey);
        console.info("logggooo",stackSceneItem.props);

        console.log(`📦 处理stackscene页 :`, stackSceneItem);

          console.log(`📦 处理stackscene页 rightTitle:`, rightTitle);

          var rightFun=()=>{};

       if(rightTitle!==undefined) {
    rightFun=() => 
              <TouchableOpacity 
     onPress={onRight}
     activeOpacity={0.7} // 点击时的透明度
      >
           <Text  >{rightTitle}</Text>
        
            </TouchableOpacity>
           
          
       }  else if(renderRightButton!==undefined){
        rightFun=renderRightButton
       }

  

     return  <Stack.Screen 
       key={sceneKey }
      name={sceneKey }
      routeName={sceneKey}
      routeKey={sceneKey}
      options={({ route }) => {
          console.info(`📊 Tab ${route.name} hideNavBar:`, hideNavBar);
        console.info(`📊 Tab ${route.name} hideNavBar:`, route);

      const finalhideNavBar=  route.params?.hideNavBar??hideNavBar
         console.info(`📊 Tab ${route.name} finalhideNavBar:`, finalhideNavBar);

  
      return  { 
        headerShown:!finalhideNavBar,
          title:title||tabItem.title,

         // Header 左边抽屉按钮
              headerLeft: () => (
                <TouchableOpacity 
         onPress={() => navigation.openDrawer()}
                  activeOpacity={0.7}
                  style={{ marginLeft: 15 }}
                >
                  <Image 
                    source={drawerData.props.drawerImage} 
                    style={{ width: 32, height: 32 }} 
                     resizeMode= 'contain'
                  /> 
                </TouchableOpacity>
              ),
      
              // 顶部导航栏样式
              headerStyle: {
                backgroundColor:tabItem.navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: tabItem.titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color:tabItem. titleStyle?.color || '#000',
              },

              // 底部标签栏图标和样式
              // tabBarIcon: ({ focused, color, size }) => {
              //   if (tabItem.icon) {
              //     // 使用自定义图标组件
              //     return React.createElement(tabItem.icon, {
              //       focused,
              //      // title: tabbarinfo.tabBarLabel
              //      title:"titless"
                   
              //     });
              //   }
              //   // 默认图标
              //   return (
              //     <Ionicons 
              //       name={focused ? 'home' : 'home-outline'} 
              //       size={size} 
              //       color={color} 
              //     />
              //   );
              // },
     
           headerRight:rightFun, // 右边文字
       }}}
    >


  {({route}) => {  // ✅ 使用 children

const { data } = route.params || {};

         return     <ComP  title={title||tabItem.title} 
 name={sceneKey}
   onRight={onRight}
   data={data}
        rightTitle={rightTitle||""}/>
  }
            
            
            }

      </Stack.Screen>
     })
       
     
     }


{

clonesData.map((stackSceneItem) => {
        if (!stackSceneItem || !stackSceneItem.props) {
          console.warn('❌ 无效的 stackSceneItem:', stackSceneItem);
          return null;
        }

        let sceneKey = stackSceneItem.key;
        const { 
          back,
          clone, 
          component, 
          getTitle,
          title,
          hideNavBar 
        } = stackSceneItem.props;
        
        const ComP = component;

        console.log(`🎯 处理 clone 组件 ${sceneKey}:`, {
          component: ComP?.name,
          clone: clone,
          back: back,
          title: title
        });

        return (
          <Stack.Screen 
            key={sceneKey}
            name={sceneKey}
            options={({ route,navigation  }) => {

                   console.info("echoroute===",route);
              const finalhideNavBar = route.params?.hideNavBar ?? hideNavBar;

              // 安全地获取标题
    let screenTitle = tabItem.title;
    try {
      if (typeof route.params?.getTitle === 'function') {
    console.info("echoroute=navigation==",navigation);

        const customTitle = route.params.getTitle(
        {navigation}
         
      );
        if (customTitle) {
          screenTitle = customTitle;
        }
      } else if (route.params?.title) {
        screenTitle = route.params.title;
      }
    } catch (error) {
      console.warn('获取标题时出错:', error);
    }
              
              return { 
                headerShown: !finalhideNavBar,
                title: screenTitle,
               
                      // 顶部导航栏样式
              headerStyle: {
                backgroundColor:tabItem.navigationBarStyle?.backgroundColor || '#F5FCFF',
              },
              headerTitleAlign: route.params?.titleStyle?.alignSelf || 'center',
              headerTitleStyle: {
                color:route.params?. titleStyle?.color || '#000',
              },
              };
            }}
          >
            {({ route }) => {
              const { data } = route.params || {};

              console.info("echoroute",data);
                    console.info("echoroute000",route);
              
              return (
                <ComP  
                  name={sceneKey}
                  data={data}
                  isClone={true}
                />
              );
            }}
          </Stack.Screen>
        );
      })
}

  </Stack.Navigator>
}



function GetCloneScreen(){

  if (!clonesData || clonesData.length === 0) {
    console.log('⚠️ 没有找到 clone 组件');
    return null;
  }

  console.log('🔍 开始处理 clonesData:', clonesData);

  return (
    <>
      {clonesData.map((stackSceneItem) => {
        if (!stackSceneItem || !stackSceneItem.props) {
          console.warn('❌ 无效的 stackSceneItem:', stackSceneItem);
          return null;
        }

        let sceneKey = stackSceneItem.key;
        const { 
          back,
          clone, 
          component, 
          getTitle,
          title,
          hideNavBar 
        } = stackSceneItem.props;
        
        const ComP = component;

        console.log(`🎯 处理 clone 组件 ${sceneKey}:`, {
          component: ComP?.name,
          clone: clone,
          back: back,
          title: title
        });

        return (
          <Stack.Screen 
            key={sceneKey}
            name={sceneKey}
            options={({ route }) => {
              const finalhideNavBar = route.params?.hideNavBar ?? hideNavBar;
              
              return { 
                headerShown: !finalhideNavBar,
                title: title || sceneKey,
                headerStyle: {
                  backgroundColor: '#F5FCFF',
                },
              };
            }}
          >
            {({ route }) => {
              const { data } = route.params || {};
              
              return (
                <ComP  
                  name={sceneKey}
                  data={data}
                  isClone={true}
                />
              );
            }}
          </Stack.Screen>
        );
      })}
    </>
  );
    
  
    
    }

// 标签页导航器
function MainTabs238() {


     console.log("📦 drawer scene maintabs对象drawerData:", drawerData);


     var sceneInfo=drawerData.props.children.props;

       var tabsInfo_tabbar=sceneInfo.children.props;

       var tabchildren=tabsInfo_tabbar.children;

  console.log("📦 drawer scene maintabs对象tabsInfo_tabbar:", tabsInfo_tabbar);


  var tab0_p=tabchildren[0].props.children

    var Tab0_compent=tab0_p[0].props.component;

    const Tab0_info=tabchildren[0].props;


    const TabInfo_com=tab0_p[0].props;
    const name_info=tab0_p[0].key;



    console.log("📦 drawer scene maintabs对象Tab0_compent:", Tab0_compent);


     console.log("📦 drawer scene maintabs对象Tab0_compentTab0_info111:", tabchildren[0]);

  console.log("📦 drawer scene maintabs对象Tab0_compentTab0_info000:", tab0_p[0]);
      console.log("📦 drawer scene maintabs对象Tab0_compentTab0_info:", Tab0_info);

      const titlestr=tab0_p[0].props.title;

      const OnReight=tab0_p[0].props.onRight;

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="tab_1" 
        component={(props)=>{
 return <Tab0_compent  title={titlestr} 
 name={name_info}
    onRight={OnReight}
        rightTitle={TabInfo_com.rightTitle}/>

        }}
        options={({ navigation }) => ({ title: titlestr,
          headerShown:true,

             headerRight: () => (

              <TouchableOpacity 
     onPress={OnReight}
     activeOpacity={0.7} // 点击时的透明度
      >
           <Text  >{TabInfo_com.rightTitle}</Text>
        
            </TouchableOpacity>
     
      ), // 右边文字
   
      headerLeft:()=>{
   return     <TouchableOpacity 
     onPress={() => navigation.openDrawer()}
     activeOpacity={0.7} // 点击时的透明度
      >
           <Image  source={drawerData.props.drawerImage } style={{ width: 24, height: 24 ,marginLeft:15}} 
         ></Image>
            </TouchableOpacity>

      },
   

          
            // 顶部导航栏样式
  headerStyle: {
    backgroundColor:Tab0_info.navigationBarStyle.backgroundColor,        // 背景色
   // elevation: 0,                      // Android阴影
   // shadowOpacity: 0,                  // iOS阴影
   // height: 100,                       // 高度
  },
  headerTitleAlign: Tab0_info.titleStyle.alignSelf,          // 标题居中
headerTitleStyle: {
     // fontSize: 20,                    // 字体大小
      //fontWeight: '600',               // 字体粗细
      color: Tab0_info.titleStyle.color,                  // 字体颜色
    },




            // 底部标签栏样式
  tabBarStyle: {
   backgroundColor: 'red',
   // height: 60,
    //paddingBottom: 5,
  },
  tabBarActiveTintColor: Tab0_info.inactiveBackgroundColor,     // 激活状态颜色
  tabBarInactiveTintColor: Tab0_info.activeBackgroundColor,     // 非激活状态颜色
  tabBarLabelStyle: {
  //  fontSize: 12,
   // fontWeight: 'bold',
  },
         })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: '资料' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: '设置' }}
      />
    </Tab.Navigator>
  );
}

// 屏幕组件
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>首页</Text>
    <Button 
      title="打开菜单" 
      onPress={() => navigation.openDrawer()} 
    />
  </View>
);

const ProfileScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>个人资料</Text>
    <Button 
      title="打开菜单" 
      onPress={() => navigation.openDrawer()} 
    />
  </View>
);

const SettingsScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>设置</Text>
    <Button 
      title="打开菜单" 
      onPress={() => navigation.openDrawer()} 
    />
  </View>
);

// 抽屉内容
const DrawerContent = ({ navigation }) => (
  <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30, marginTop: 40 }}>
      导航菜单
    </Text>
    
    <Button 
      title="主界面" 
      onPress={() => navigation.navigate('MainTabs')} 
    />
    <View style={{ height: 10 }} />
    
    <Button 
      title="单独页面" 
      onPress={() => navigation.navigate('Standalone')} 
    />
    <View style={{ height: 10 }} />
    
    <View style={{ flex: 1 }} />
    <Button 
      title="关闭" 
      onPress={() => navigation.closeDrawer()} 
    />
  </View>
);

// 独立页面
const StandaloneScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>独立页面</Text>
    <Button 
      title="返回主界面" 
      onPress={() => navigation.openDrawer()} 
    />
  </View>
);

// 无动画的屏幕配置
const noAnimationConfig = {
  animationEnabled: false,
  swipeEnabled: false,
  gestureEnabled: false,
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
    screenInterpolator: () => ({}),
  }),
};
// 无动画的抽屉配置
const drawerConfig = {
  drawerType: 'front',
  overlayColor: 'transparent',
  animationEnabled: false,
  gestureEnabled: false,
};


export function StandaloneNavigation099(){
 return  <NavigationContainer ref={navigationRef} > 
 <CustomDrawer  
   mainContent={(props)=>{
  return  <MainTabs {...props}></MainTabs>

 }}
      drawerContent={()=>{

        return <drawerData.props.contentComponent/>
      }}
      
         key="drawer"
    name="drawer"
    routeName="drawer" 
      ></CustomDrawer>
      </NavigationContainer>
}

export  function StandaloneNavigation09() {

  return (

    <NavigationContainer ref={navigationRef} > 

    <MainTabs></MainTabs>

    </NavigationContainer>

  )
}
export  function StandaloneNavigation() {
   console.log("📦 drawer scene 对象drawerData:", drawerData);

     console.log("📦 drawer scene 对象prpdrawerData:", drawerData.props.contentComponent);
  return (
    <NavigationContainer ref={navigationRef}       > 
      <Drawer.Navigator
      key="drawer"
      name="drawer"
      routeName="drawer"
        initialRouteName="tabbar"
        drawerContent={(props)=>{
          return <drawerData.props.contentComponent/>
        }}
        screenOptions={({ route, navigation }) => {
           console.log("📦 Drawer screen route:", route);
          return{
          drawerPosition:drawerData.props?.drawerPosition==undefined?"left":drawerData.props?.drawerPosition,
              // 禁用所有动画
        animationEnabled: false,
        // 禁用手势动画
        swipeEnabled: false,
        // 禁用键盘处理动画
        keyboardDismissMode: 'none',
        // 禁用过度动画
        transitionConfig: () => ({
          transitionSpec: {
            duration: 0, // 动画持续时间为0
          },
        }),

            screenInterpolator: () => ({}),
          drawerStyle: { width: 300 },
          headerShown: false,
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          
              tabBarStyle:{
                backgroundColor: '#FF0000'
              }
        }}}

              drawerContentOptions={drawerConfig}
      >
        { <Drawer.Screen 
          name="tabbar" 
        component={MainTabs}
         
        /> }
        <Drawer.Screen 
          name="Standalone" 
          component={StandaloneScreen}
              options={noAnimationConfig}
     
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}





