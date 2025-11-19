> 模板版本：v0.2.2

<p align="center">
  <h1 align="center"> <code>react-native-router-flux</code> </h1>
</p>
<p align="center">
    <a href="https://github.com/react-native-oh-library/react-native-router-flux">
        <img src="https://img.shields.io/badge/platforms-android%20|%20ios%20|%20harmony%20-lightgrey.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/react-native-oh-library/react-native-router-flux/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
    </a>
</p>

> [!TIP] [Github 地址](https://github.com/react-native-oh-library/react-native-router-flux)

## 安装与使用

进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install react-native-router-flux

# 0.72
npm install @react-native-oh-tpl/react-native-gesture-handler@^2.14.1-2.14.15
npm install @react-native-oh-tpl/react-native-reanimated@^3.6.4-rc.1
npm install @react-native-oh-tpl/react-native-safe-area-context@^4.7.4-0.2.0

npm install @react-native-oh-tpl/react-native-screens@^3.34.0-rc.1
npm install @react-navigation/drawer@^6.7.2
npm install @react-navigation/bottom-tabs@^6.6.1
npm install @react-navigation/stack@6.3.0

# 0.77
npm install @react-native-ohos/react-native-gesture-handler@2.23.2-rc.1
npm install @react-native-ohos/react-native-reanimated@3.18.1-rc.1
npm install @react-native-ohos/react-native-safe-area-contextt@5.1.1-rc.1

npm install @react-native-ohos/react-native-screens@4.8.1-rc.4
npm install @react-navigation/drawer@^7.1.17
npm install @react-navigation/bottom-tabs@^7.1.0
npm install @react-navigation/stack@7.2.10

```

#### **yarn**

```bash
yarn add react-native-router-flux

# 0.72
yarn add   @react-native-oh-tpl/react-native-gesture-handler@^2.14.1-2.14.15
yarn add @react-native-oh-tpl/react-native-reanimated@^3.6.4-rc.1
yarn add @react-native-oh-tpl/react-native-safe-area-context@^4.7.4-0.2.0

yarn add @react-native-oh-tpl/react-native-screens@^3.34.0-rc.1
yarn add @react-navigation/drawer@^6.7.2
yarn add @react-navigation/bottom-tabs@^6.6.1
yarn add @react-navigation/stack@6.3.0

# 0.77
yarn add   @react-native-ohos/react-native-gesture-handler@2.23.2-rc.1
yarn add   @react-native-ohos/react-native-reanimated@3.18.1-rc.1
yarn add   @react-native-ohos/react-native-safe-area-contextt@5.1.1-rc.1

yarn add   @react-native-ohos/react-native-screens@4.8.1-rc.4
yarn add   @react-navigation/drawer@^7.1.17
yarn add   @react-navigation/bottom-tabs@^7.1.0
yarn add   @react-navigation/stack@7.2.10
```

<!-- tabs:end -->

下面的代码展示了该库的基本使用场景：

**Hello world**
从 react-native-router-flux 包中 import 组件即可使用
```
const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Login" />
      <Scene key="register" component={Register} title="Register" />
      <Scene key="home" component={Home} />
    </Stack>
  </Router>
);
```
**按需加载**
使用单独 import 组件实现按需加载
```

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
```

## Link

本库 HarmonyOS 侧实现依赖@react-native-oh-tpl/react-native-reanimated、@react-native-ohos/react-native-reanimated 的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。

如未引入请参照[@react-native-oh-tpl/react-native-screens 文档](/zh-cn/react-native-screens.md)、[@react-native-ohos/react-native-screens 文档](/zh-cn/react-native-screens.md)进行引入

## 约束与限制

### 兼容性

本文档内容基于以下环境验证通过：

1. RNOH: 0.72.x/0.77.x; SDK：HarmonyOS 6.0.0.47 (API Version 20 Release); IDE：DevEco Studio 6.0.0 Release; ROM：NEXT.5.0.0.212;

## 组件

> [!TIP] "Platform" 列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 1. Router - 路由

Router 管理整个应用的页面导航和转场效果。


**Router属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| sceneStyle | 场景容器的样式 | style | no | iOS/Android | yes |
| backAndroidHandler | Android 返回键自定义处理函数 | function | no | iOS/Android | yes |
| wrapBy | 高阶组件包装函数，用于给每个场景添加额外的包装 | function | no | iOS/Android | yes |
| scenes | 定义路由场景配置（路由表） | any | no | iOS/Android | yes |
| createReducer | 创建自定义的导航 reducer | function | no | iOS/Android | yes |
| onStateChange | 导航状态变化时的回调函数 | function | no | iOS/Android | yes |
| getSceneStyle |动态获取场景样式的函数 | function | no | iOS/Android | yes |
| uriPrefix | 设置深度链接（Deep Link）的 URI 前缀 | string | no | iOS/Android | yes |
| onDeepLink | 定义路由场景配置（路由表） | function | no | iOS/Android | yes |

### 2. Scene - 场景

定义页面路由配置的核心接口

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| key | 场景的唯一标识符 | string | yes | iOS/Android | yes |
| component | 场景对应的React组件 | React.ComponentType<any> | no | iOS/Android | yes |
| back | 是否作为返回页面 | boolean | no | iOS/Android | yes |
| init | 是否初始化场景 | boolean | no | iOS/Android | yes |
| clone | 是否克隆场景 | boolean | no | iOS/Android | yes |
| contentComponent | 内容组件 | React.ComponentType<any> | no | iOS/Android | yes |
| backButtonImage | 返回按钮图片路径 | string | no | iOS/Android | yes |
| backButtonTintColor | 返回按钮颜色 | string | no | iOS/Android | yes |
| drawer | 是否作为抽屉菜单 | boolean | no | iOS/Android | yes |
| failure | 导航失败时的回调函数或场景key | (() => void) \| string | no | iOS/Android | yes |
| headerBackTitle | 头部返回按钮标题 | string | no | iOS/Android | yes |
| headerMode | 头部模式 | HeaderModeType | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| hideBackImage | 是否隐藏返回图片 | boolean | no | iOS/Android | yes |
| initial | 是否作为初始场景 | boolean | no | iOS/Android | yes |
| leftButtonImage | 左侧按钮图片 | Image | no | iOS/Android | yes |
| modal | 是否以模态形式显示 | boolean | no | iOS/Android | yes |
| navigationBarTitleImage | 导航栏标题图片 | Image | no | iOS/Android | yes |
| navigationBarTitleImageStyle | 导航栏标题图片样式 | StyleProp<ImageStyle> | no | iOS/Android | yes |
| navTransparent | 导航栏是否透明 | boolean | no | iOS/Android | yes |
| on | 通用事件处理函数 | (props: any) => void | no | iOS/Android | yes |
| onEnter | 进入场景时的回调函数 | (props: any) => void | no | iOS/Android | yes |
| onExit | 退出场景时的回调函数 | (props: any) => void | no | iOS/Android | yes |
| onLeft | 左侧按钮点击事件 | (props: any) => void | no | iOS/Android | yes |
| onRight | 右侧按钮点击事件 | (props: any) => void | no | iOS/Android | yes |
| renderTitle | 自定义标题渲染组件 | React.ComponentType<any> | no | iOS/Android | yes |
| renderLeftButton | 自定义左侧按钮渲染组件 | React.ComponentType<any> | no | iOS/Android | yes |
| renderRightButton | 自定义右侧按钮渲染组件 | React.ComponentType<any> | no | iOS/Android | yes |
| renderBackButton | 自定义返回按钮渲染组件 | React.ComponentType<any> | no | iOS/Android | yes |
| rightTitle | 右侧按钮标题 | string | no | iOS/Android | yes |
| rightButtonImage | 右侧按钮图片 | Image \| null | no | iOS/Android | yes |
| rightButtonTextStyle | 右侧按钮文本样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| success | 导航成功时的回调函数或场景key | (() => void) \| string | no | iOS/Android | yes |
| tabs | 是否作为标签页容器 | boolean | no | iOS/Android | yes |
| title | 场景标题 | (() => string) \| string | no | iOS/Android | yes |
| titleStyle | 标题样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| type | 导航动作类型 | ActionConstShort | no | iOS/Android | yes |
| [name: string] | 其他自定义属性，会传递给场景组件 | any | no | iOS/Android | yes |


### 3. Tabs - 标签容器

定义了 标签页容器的所有配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| wrap | 是否包装标签页 | boolean | no | iOS/Android | yes |
| activeBackgroundColor | 激活状态的背景颜色 | string | no | iOS/Android | yes |
| activeTintColor | 激活状态的文字颜色 | string | no | iOS/Android | yes |
| inactiveBackgroundColor | 非激活状态的背景颜色 | string | no | iOS/Android | yes |
| inactiveTintColor | 非激活状态的文字颜色 | string | no | iOS/Android | yes |
| labelStyle | 标签文字样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| lazy | 是否懒加载标签页 | boolean | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| tabBarComponent | 自定义标签栏组件 | React.ComponentType<any> | no | iOS/Android | yes |
| tabBarPosition | 标签栏位置 | TabBarPositionType | no | iOS/Android | yes |
| tabBarStyle | 标签栏样式 | StyleProp<ViewStyle> | no | iOS/Android | yes |
| tabStyle | 单个标签样式 | StyleProp<ViewStyle> | no | iOS/Android | yes |
| indicatorStyle | 指示器样式 | StyleProp<ViewStyle> | no | iOS/Android | yes |
| showLabel | 是否显示标签文字 | boolean | no | iOS/Android | yes |
| swipeEnabled | 是否支持滑动切换 | boolean | no | iOS/Android | yes |
| tabBarOnPress | 标签栏按下事件处理函数 | Function | no | iOS/Android | yes |
| backToInitial | 返回时是否回到初始标签页 | boolean | no | iOS/Android | yes |

### 4. Drawer - 抽屉

定义了 抽屉菜单组件的配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| drawerImage | 抽屉按钮图片 | Image | no | iOS/Android | yes |
| drawerIcon | 抽屉按钮图标，可以是React元素或组件 | React.ReactElement<any> \| React.ComponentType<any> | no | iOS/Android | yes |
| drawerPosition | 抽屉位置 | DrawerPositionType | no | iOS/Android | yes |

### 5. Stack - 栈组件

定义了 堆栈导航器的所有配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| navigationBarStyle | 导航栏样式 | StyleProp<ViewStyle> | no | iOS/Android | yes |
| icon | 图标 | any | no | iOS/Android | yes |
| tintColor | 色调颜色 | string | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| title | 标题 | string | no | iOS/Android | yes |
| lightbox | 是否以灯箱模式显示 | boolean | no | iOS/Android | yes |
| tabs | 是否作为标签页 | boolean | no | iOS/Android | yes |
| initial | 是否作为初始堆栈 | boolean | no | iOS/Android | yes |
| titleStyle | 标题样式 | StyleProp<TextStyle> | no | iOS/Android | yes |
| type | 类型 | string | no | iOS/Android | yes |
| navTransparent | 导航栏是否透明 | boolean | no | iOS/Android | yes |
| renderer | 渲染器 | any | no | iOS/Android | yes |

### 6. Actions - 导航类

定义了 导航操作的所有方法。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| currentScene | 当前场景信息 | any | no | iOS/Android | yes |
| jump | 跳转到指定场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| pop | 返回上一个场景 | (params?: { animated?: boolean }) => void | no | iOS/Android | yes |
| popAndPush | 返回并推入新场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| popTo | 返回到指定场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| push | 推入新场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| refresh | 刷新当前场景 | (props?: any) => void | no | iOS/Android | yes |
| replace | 替换当前场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| reset | 重置导航栈到指定场景 | (sceneKey: string, props?: any) => void | no | iOS/Android | yes |
| addRef | 添加引用 | (name: string, ref?: any) => void | no | iOS/Android | yes |
| drawerOpen | 打开抽屉菜单 | any | no | iOS/Android | yes |
| drawerClose | 关闭抽屉菜单 | any | no | iOS/Android | yes |

### 7. ActionConstShort - 导航行为

这些常量用于在路由配置和导航操作中明确指定导航行为，确保导航逻辑的清晰和一致。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| JUMP | 跳转动作类型 | string | no | iOS/Android | yes |
| PUSH | 推入动作类型 | string | no | iOS/Android | yes |
| PUSH_OR_POP | 推入或弹出动作类型 | string | no | iOS/Android | yes |
| REPLACE | 替换动作类型 | string | no | iOS/Android | yes |
| BACK | 返回动作类型 | string | no | iOS/Android | yes |
| BACK_ACTION | 返回动作 | string | no | iOS/Android | yes |
| POP_TO | 弹出到指定场景动作类型 | string | no | iOS/Android | yes |
| REFRESH | 刷新动作类型 | string | no | iOS/Android | yes |
| RESET | 重置动作类型 | string | no | iOS/Android | yes |
| FOCUS | 获取焦点动作类型 | string | no | iOS/Android | yes |
| BLUR | 失去焦点动作类型 | string | no | iOS/Android | yes |
| ANDROID_BACK | Android返回键动作类型 | string | no | iOS/Android | yes |






## 遗留问题

无
## 其他


## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-oh-library/react-native-router-flux) ，请自由地享受和参与开源。
