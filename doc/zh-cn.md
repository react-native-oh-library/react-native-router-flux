> 模板版本：v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-router-flux</code> </h1>
</p>


本项目基于 [react-native-router-flux@4.3.1](https://github.com/aksonov/react-native-router-flux/tree/4.3.1) 开发。

请到三方库的 Releases 发布地址查看配套的版本信息：

| Version                   | Package Name                     | Repository                                                   | Release                                                      | Supported RN Version |
| ------------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- |
| 4.3.2                    | @react-native-ohos/react-native-router-flux | [Github](https://github.com/react-native-oh-library/react-native-router-flux) | [GitCode Releases](https://github.com/react-native-oh-library/react-native-router-flux/releases) | 0.72/0.77                |


## 1. 安装与使用
### 0.72
本库实现依赖@react-native-oh-tpl/react-native-reanimated、 @react-native-oh-tpl/react-native-gesture-handler、@react-native-oh-tpl/react-native-safe-area-context、
@react-native-oh-tpl/react-native-pager-view、@react-native-oh-tpl/react-native-tab-view
的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。
如未引入请参照[@react-native-oh-tpl/react-native-reanimated 文档](./react-native-reanimated.md)、[@react-native-oh-tpl/react-native-gesture-handler 文档](./react-native-gesture-handler.md)、[@react-native-oh-tpl/react-native-safe-area-context 文档](./react-native-safe-area-context.md)、[@react-native-oh-tpl/react-native-pager-view文档](./react-native-pager-view.md)、[@react-native-oh-tpl/react-native-tab-view文档](./react-native-tab-view.md)进行引入


### 0.77
本库实现依赖@react-native-ohos/react-native-reanimated、 @react-native-ohos/react-native-gesture-handler、@react-native-ohos/react-native-safe-area-context、
@react-native-ohos/react-native-pager-view、@react-native-ohos/react-native-tab-view的原生端代码，如已在 HarmonyOS 工程中引入过该库，则无需再次引入，可跳过本章节步骤，直接使用。
如未引入请参照[@react-native-ohos/react-native-reanimated 文档](./react-native-reanimated.md)、[@react-native-ohos/react-native-gesture-handler 文档](./react-native-gesture-handler.md)、[@react-native-ohos/react-native-safe-area-context 文档](./react-native-safe-area-context.md)、
[@react-native-ohos/react-native-pager-view 文档](./react-native-pager-view.md)、[@react-native-ohos/react-native-tab-view 文档](./react-native-tab-view.md)进行引入

进入到工程目录并输入以下命令：

#### **npm**

```bash
npm install @react-native-ohos/react-native-router-flux

# 0.72
npm install react-native-screens@3.34.0
npm install @react-navigation/drawer@7.1.17
npm install @react-navigation/bottom-tabs@7.1.0
npm install @react-navigation/stack@7.2.10
npm install @react-native-oh-tpl/react-native-pager-view@6.2.3-0.2.8
npm install @react-native-oh-tpl/react-native-tab-view@3.5.2-0.1.3
npm install @react-native-oh-tpl/react-native-gesture-handler@2.14.1-2.14.15
npm install @react-native-oh-tpl/react-native-reanimated@3.6.4-rc.1
npm install @react-navigation/material-top-tabs@6.5.0


# 0.77
npm install react-native-screens@3.29.0
npm install @react-navigation/drawer@7.1.17
npm install @react-navigation/bottom-tabs@7.1.0
npm install @react-navigation/stack@7.2.10
npm install @react-native-ohos/react-native-pager-view@6.7.2-rc.2
npm install @react-native-ohos/react-native-tab-view@4.0.11-rc.1
npm install @react-native-ohos/react-native-gesture-handler@2.23.2-rc.1
npm install @react-native-ohos/react-native-reanimated@3.18.1-rc.1
npm install @react-navigation/material-top-tabs@7.4.0
```

#### **yarn**

```bash
yarn add @react-native-ohos/react-native-router-flux

# 0.72
yarn add react-native-screens@3.34.0
yarn add @react-navigation/drawer@7.1.17
yarn add @react-navigation/bottom-tabs@7.1.0
yarn add @react-navigation/stack@7.2.10
yarn add @react-native-oh-tpl/react-native-pager-view@6.2.3-0.2.8
yarn add @react-native-oh-tpl/react-native-tab-view@3.5.2-0.1.3
yarn add @react-native-oh-tpl/react-native-gesture-handler@2.14.1-2.14.15
yarn add @react-native-oh-tpl/react-native-reanimated@3.6.4-rc.1
yarn add @react-navigation/material-top-tabs@6.5.0


# 0.77
yarn add react-native-screens@3.29.0
yarn add @react-navigation/drawer@7.1.17
yarn add @react-navigation/bottom-tabs@7.1.0
yarn add @react-navigation/stack@7.2.10
yarn add @react-native-ohos/react-native-pager-view@6.7.2-rc.2
yarn add @react-native-ohos/react-native-tab-view@4.0.11-rc.1
yarn add @react-native-ohos/react-native-gesture-handler@2.23.2-rc.1
yarn add @react-native-ohos/react-native-reanimated@3.18.1-rc.1
yarn add @react-navigation/material-top-tabs@7.4.0
```

下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

```js
import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>首页</Text>
        <Text style={styles.description}>欢迎使用 react-native-router-flux</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="跳转到详情页"
                onPress={() => Actions.detail()}
                />
            <Button
                title="打开用户页面"
                onPress={() => Actions.user()}
                />
            <Button
                title="打开设置（模态框）"
                onPress={() => Actions.settings()}
                />
        </View>
    </View>
);

const DetailScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>详情页面</Text>
        <Text style={styles.description}>这是详情页的内容</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="返回首页"
                onPress={() => Actions.pop()}
                />
            <Button
                title="跳转到用户页"
                onPress={() => Actions.user()}
                />
        </View>
    </View>
);

const UserScreen = (props) => (
    <View style={styles.container}>
        <Text style={styles.title}>用户页面</Text>
        <Text style={styles.description}>
            用户ID: {props.userId || '未传递参数'}
        </Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="返回"
                onPress={() => Actions.pop()}
                />
            <Button
                title="带参数跳转"
                onPress={() => Actions.user({ userId: '12345' })}
                />
            <Button
                title="重置到首页"
                onPress={() => Actions.reset('home')}
                />
        </View>
    </View>
);

const SettingsScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>设置</Text>
        <Text style={styles.description}>这是模态框页面</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="关闭模态框"
                onPress={() => Actions.pop()}
                />
        </View>
    </View>
);

const App = () => {
    return (
        <Router>
            <Stack key="root">
                {/* 首页 */}
                <Scene
                    key="home"
                    component={HomeScreen}
                    title="首页"
                    initial />
        
                {/* 详情页 */}
                <Scene
                    key="detail"
                    component={DetailScreen}
                    title="详情页" />
        
                {/* 用户页 */}
                <Scene
                    key="user"
                    component={UserScreen}
                    title="用户信息" />
        
                {/* 设置页（模态框） */}
                <Scene
                    key="settings"
                    component={SettingsScreen}
                    title="设置"
                    modal />
            </Stack>                                                
        </Router>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    buttonContainer: {
        width: '100%',
        gap: 10,
    },
});

export default App;
```

## 2. Manual Link

此步骤为手动配置原生依赖项的指导。

首先需要使用 DevEco Studio 打开项目里的 HarmonyOS 工程 `harmony`。

### 2.1. Overrides RN SDK

为了让工程依赖同一个版本的 RN SDK，需要在工程根目录的 `oh-package.json5` 添加 overrides 字段，指向工程需要使用的 RN SDK 版本。替换的版本既可以是一个具体的版本号，也可以是一个模糊版本，还可以是本地存在的 HAR 包或源码目录。

关于该字段的作用请阅读[官方说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#zh-cn_topic_0000001792256137_overrides)

```json

#0.72
{
  "overrides": {
    "@rnoh/react-native-openharmony": "0.72.96" // ohpm 在线版本
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony.har" // 指向本地 har 包的路径
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // 指向源码路径
  }
}
#0.77
{
  "overrides": {
    "@rnoh/react-native-openharmony": "0.77.18" // ohpm 在线版本
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony.har" // 指向本地 har 包的路径
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // 指向源码路径
  }
}
```

### 2.2. 运行

点击右上角的 `sync` 按钮

或者在命令行终端执行：

```bash
cd entry
ohpm install
```

然后编译、运行即可。

## 3. 约束与限制

### 3.1. 兼容性

本文档内容基于以下环境验证通过：
1. RNOH：0.72.96; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio  6.0.0.868; ROM: 6.0.0.112;
2. RNOH: 0.77.18; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio  6.0.0.868; ROM: 6.0.0.112;

## 4. 属性

> [!TIP] "Platform"列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

### 1. Router - 路由

Router 管理整个应用的页面导航和转场效果。

**Router属性：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| sceneStyle | 场景容器的样式 | style | no | iOS/Android | yes |
| backAndroidHandler | Android 返回键自定义处理函数 | function | no | Android | no |
| wrapBy | 高阶组件包装函数，用于给每个场景添加额外的包装 | function | no | iOS/Android | yes |
| scenes | 定义路由场景配置（路由表） | object | no | iOS/Android | yes |
| createReducer | 创建自定义的导航 reducer | function | no | iOS/Android | yes |
| onStateChange | 导航状态变化时的回调函数 | function | no | iOS/Android | yes |
| getSceneStyle |动态获取场景样式的函数 | function | no | iOS/Android | yes |

### 2. Scene - 场景

定义页面路由配置的核心接口

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| key | 场景的唯一标识符 | string | yes | iOS/Android | yes |
| component | 场景对应的React组件 | element | no | iOS/Android | yes |
| back | 是否作为返回页面 | boolean | no | iOS/Android | yes |
| init | 是否初始化场景 | boolean | no | iOS/Android | yes |
| clone | 是否克隆场景 | boolean | no | iOS/Android | yes |
| contentComponent | 内容组件 | element | no | iOS/Android | yes |
| backButtonImage | 返回按钮图片路径 | string | no | iOS/Android | yes |
| backButtonTintColor | 返回按钮颜色 | string | no | iOS/Android | yes |
| drawer | 是否作为抽屉菜单 | boolean | no | iOS/Android | yes |
| failure | 导航失败时的回调函数或场景key | function \| string | no | iOS/Android | yes |
| headerBackTitle | 头部返回按钮标题 | string | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| hideBackImage | 是否隐藏返回图片 | boolean | no | iOS/Android | yes |
| initial | 是否作为初始场景 | boolean | no | iOS/Android | yes |
| leftButtonImage | 左侧按钮图片 | Image | no | iOS/Android | yes |
| modal | 是否以模态形式显示 | boolean | no | / | no |
| navigationBarTitleImage | 导航栏标题图片 | Image | no | iOS/Android | yes |
| navigationBarTitleImageStyle | 导航栏标题图片样式 | style | no | iOS/Android | yes |
| navTransparent | 导航栏是否透明 | boolean | no | iOS/Android | yes |
| on | 通用事件处理函数 | function | no | iOS/Android | yes |
| onEnter | 进入场景时的回调函数 | function | no | iOS/Android | yes |
| onExit | 退出场景时的回调函数 | function | no | iOS/Android | yes |
| onLeft | 左侧按钮点击事件 | function | no | iOS/Android | yes |
| onRight | 右侧按钮点击事件 | function | no | iOS/Android | yes |
| renderTitle | 自定义标题渲染组件 | element | no | iOS/Android | yes |
| renderLeftButton | 自定义左侧按钮渲染组件 | element | no | iOS/Android | yes |
| renderRightButton | 自定义右侧按钮渲染组件 | element | no | iOS/Android | yes |
| rightTitle | 右侧按钮标题 | string | no | iOS/Android | yes |
| rightButtonImage | 右侧按钮图片 | Image \| null | no | iOS/Android | yes |
| rightButtonTextStyle | 右侧按钮文本样式 | style | no | iOS/Android | yes |
| success | 导航成功时的回调函数或场景key | function \| string | no | iOS/Android | yes |
| tabs | 是否作为标签页容器 | boolean | no | iOS/Android | yes |
| title | 场景标题 | function \| string | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| type | 导航动作类型 | string | no | iOS/Android | yes |
| [name: string] | 其他自定义属性，会传递给场景组件 | object | no | iOS/Android | yes |


### 3. Tabs - 标签容器

定义了 标签页容器的所有配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| wrap | 是否包装标签页 | boolean | no | iOS/Android | yes |
| activeBackgroundColor | 激活状态的背景颜色 | string | no | iOS/Android | yes |
| activeTintColor | 激活状态的文字颜色 | string | no | iOS/Android | yes |
| inactiveBackgroundColor | 非激活状态的背景颜色 | string | no | iOS/Android | yes |
| inactiveTintColor | 非激活状态的文字颜色 | string | no | iOS/Android | yes |
| labelStyle | 标签文字样式 | style | no | iOS/Android | yes |
| lazy | 是否懒加载标签页 | boolean | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| tabBarComponent | 自定义标签栏组件 | element | no | iOS/Android | yes |
| tabBarPosition | 标签栏位置 | string | no | iOS/Android | yes |
| tabBarStyle | 标签栏样式 | style | no | iOS/Android | yes |
| tabStyle | 单个标签样式 | style | no | iOS/Android | yes |
| indicatorStyle | 指示器样式 | style | no | iOS/Android | yes |
| showLabel | 是否显示标签文字 | boolean | no | iOS/Android | yes |
| swipeEnabled | 是否支持滑动切换 | boolean | no | iOS/Android | yes |
| tabBarOnPress | 标签栏按下事件处理函数 | function | no | iOS/Android | yes |
| backToInitial | 返回时是否回到初始标签页 | boolean | no | iOS/Android | yes |

### 4. Drawer - 抽屉

定义了 抽屉菜单组件的配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| drawerImage | 抽屉按钮图片 | Image | no | iOS/Android | yes |
| drawerIcon | 抽屉按钮图标，可以是React元素或组件 | element | no | iOS/Android | yes |
| drawerPosition | 抽屉位置 | string | no | iOS/Android | yes |

### 5. Stack - 栈组件

定义了 堆栈导航器的所有配置选项。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| navigationBarStyle | 导航栏样式 | style | no | iOS/Android | yes |
| icon | 图标 | object | no | iOS/Android | yes |
| tintColor | 栈和屏幕组件标题颜色 | string | no | iOS/Android | yes |
| hideNavBar | 是否隐藏导航栏 | boolean | no | iOS/Android | yes |
| hideTabBar | 是否隐藏标签栏 | boolean | no | iOS/Android | yes |
| title | 标题 | string | no | iOS/Android | yes |
| lightbox | 是否以灯箱模式显示 | boolean | no | iOS/Android | yes |
| tabs | 是否作为标签页 | boolean | no | iOS/Android | yes |
| initial | 是否作为初始堆栈 | boolean | no | iOS/Android | yes |
| titleStyle | 标题样式 | style | no | iOS/Android | yes |
| type | 类型 | string | no | iOS/Android | yes |
| navTransparent | 导航栏是否透明 | boolean | no | iOS/Android | yes |
| renderer | 渲染器 | object | no | iOS/Android | yes |

### 6. Actions - 导航类

定义了 导航操作的所有方法。

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| currentScene | 当前场景信息 | object | no | iOS/Android | yes |
| jump | 跳转到指定场景 | function| no | iOS/Android | yes |
| pop | 返回上一个场景 | function | no | iOS/Android | yes |
| popAndPush | 返回并推入新场景 | function| no | / | no |
| popTo | 返回到指定场景 | function| no | iOS/Android | yes |
| push | 推入新场景 | function| no | iOS/Android | yes |
| refresh | 刷新当前场景 | function| no | iOS/Android | yes |
| replace | 替换当前场景 | function| no | iOS/Android | yes |
| reset | 重置导航栈到指定场景 | function| no | iOS/Android | yes |
| addRef | 添加引用 | function | no | iOS/Android | yes |
| drawerOpen | 打开抽屉菜单 | object | no | iOS/Android | yes |
| drawerClose | 关闭抽屉菜单 | object | no | iOS/Android | yes |

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
| ANDROID_BACK | Android返回键动作类型 | string | no | Android | no |

## 7. 遗留问题

## 8. 其他
Router:backAndroidHandler android独有  
Scene:modal  是否以模态形式显示 源库不支持  
Actions：popAndPush 返回并推入新场景方法 源库未实现，不支持  
Actions：addRef      属性是对组件添加引用而内部使用，没有提供对外暴露ref的使用接口。getRef库中没有该定义  
ActionConstShort：ANDROID_BACK Android返回键动作类型 android独有  
## 9. 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/aksonov/react-native-router-flux/blob/master/LICENSE) ，请自由地享受和参与开源。

