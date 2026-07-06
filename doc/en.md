> version：v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-router-flux</code> </h1>
</p>


> This project is based on [react-native-router-flux@4.3.1](https://github.com/aksonov/react-native-router-flux/tree/4.3.1)。

Please visit the Releases page of the third-party library to check the corresponding version information:

| Version                   | Package Name                     | Repository                                                   | Release                                                      | Supported RN Version |
| ------------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- |
| 4.3.2                    | @react-native-ohos/react-native-router-flux | [Github](https://github.com/react-native-oh-library/react-native-router-flux) | [GitCode Releases](https://github.com/react-native-oh-library/react-native-router-flux/releases) | 0.72/0.77                 |


## 1. install and use
### 0.72
The implementation of this library depends on the native  code from @react-native-oh-tpl/react-native-reanimated and @react-native-oh-tpl/react-native-gesture-handler and @react-native-oh-tpl/react-native-safe-area-context and @react-native-oh-tpl/react-native-pager-view and @react-native-oh-tpl/react-native-tab-view. If this library is included into your application, there is no need to include it again; you can skip the steps in this section and use it directly.
If it is not included, follow the guide provided in [@react-native-oh-tpl/react-native-reanimated](./react-native-reanimated.md) and [@react-native-oh-tpl/react-native-gesture-handler](./react-native-gesture-handler.md) and [@react-native-oh-tpl/react-native-safe-area-context](./react-native-safe-area-context.md) and [@react-native-oh-tpl/react-native-pager-view](./react-native-pager-view.md)  and [@react-native-oh-tpl/react-native-tab-view](./react-native-tab-view.md)  to add it to your project.

### 0.77
The implementation of this library depends on the native  code from @react-native-ohos/react-native-reanimated and @react-native-ohos/react-native-gesture-handler and @react-native-ohos/react-native-safe-area-context  and @react-native-ohos/react-native-pager-view and @react-native-ohos/react-native-tab-view. If this library is included into your application, there is no need to include it again; you can skip the steps in this section and use it directly.
If it is not included, follow the guide provided in [@react-native-ohos/react-native-reanimated](./react-native-reanimated.md) and [@react-native-ohos/react-native-gesture-handler](./react-native-gesture-handler.md) and [@react-native-ohos/react-native-safe-area-context](./react-native-safe-area-context.md)  and [@react-native-ohos/react-native-pager-view](./react-native-pager-view.md) and [@react-native-ohos/react-native-tab-view](./react-native-tab-view.md)  to add it to your project.

into project and input command：

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

The following code shows the basic use scenario of the repository:

> [!WARNING] The name of the imported repository remains unchanged.

```js
import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>home</Text>
        <Text style={styles.description}>welcome use react-native-router-flux</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="jump det"
                onPress={() => Actions.detail()}
                />
            <Button
                title="open user"
                onPress={() => Actions.user()}
                />
            <Button
                title="open set）"
                onPress={() => Actions.settings()}
                />
        </View>
    </View>
);

const DetailScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>detail</Text>
        <Text style={styles.description}>detail content</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="backhome"
                onPress={() => Actions.pop()}
                />
            <Button
                title="user"
                onPress={() => Actions.user()}
                />
        </View>
    </View>
);

const UserScreen = (props) => (
    <View style={styles.container}>
        <Text style={styles.title}>user page</Text>
        <Text style={styles.description}>
            userID: {props.userId || 'no par'}
        </Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="back"
                onPress={() => Actions.pop()}
                />
            <Button
                title="jumppar"
                onPress={() => Actions.user({ userId: '12345' })}
                />
            <Button
                title="home"
                onPress={() => Actions.reset('home')}
                />
        </View>
    </View>
);

const SettingsScreen = () => (
    <View style={styles.container}>
        <Text style={styles.title}>set</Text>
        <Text style={styles.description}>model page</Text>
    
        <View style={styles.buttonContainer}>
            <Button
                title="close"
                onPress={() => Actions.pop()}
                />
        </View>
    </View>
);

const App = () => {
    return (
        <Router>
            <Stack key="root">
          
                <Scene
                    key="home"
                    component={HomeScreen}
                    title="home"
                    initial />
        
               
                <Scene
                    key="detail"
                    component={DetailScreen}
                    title="deta" />
        
                <Scene
                    key="user"
                    component={UserScreen}
                    title="userinfo" />
        
        
                <Scene
                    key="settings"
                    component={SettingsScreen}
                    title="set"
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

This step provides guidance for manually configuring native dependencies.

Open the `harmony` directory of the HarmonyOS project in DevEco Studio.

### 2.1. Overrides RN SDK

To ensure the project relies on the same version of the RN SDK, you need to add an `overrides` field in the project's root `oh-package.json5` file, specifying the RN SDK version to be used. The replacement version can be a specific version number, a semver range, or a locally available HAR package or source directory.

For more information about the purpose of this field, please refer to the [official documentation](https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#en-us_topic_0000001792256137_overrides).

```json

#0.72
{
  "overrides": {
    "@rnoh/react-native-openharmony": "0.72.96" // ohpm version
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony.har" // a locally available HAR package
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // source code directory
  }
}


#0.77
{
  "overrides": {
    "@rnoh/react-native-openharmony": "0.77.18" // ohpm version
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony.har" // a locally available HAR package
    // "@rnoh/react-native-openharmony" : "./react_native_openharmony" // source code directory
  }
}
```

### 2.2. Running

Click the `sync` button in the upper right corner.

Alternatively, run the following instruction on the terminal:

```bash
cd entry
ohpm install
```

Then build and run the code.

## 3. Constraints

### 3.1. Compatibility

The content in this document has been verified under the following environment:

1. RNOH：0.72.96; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio  6.0.0.868; ROM: 6.0.0.112;
2. RNOH: 0.77.18; SDK: HarmonyOS 6.0.0 Release SDK; IDE: DevEco Studio  6.0.0.868; ROM: 6.0.0.112;

## 4. Properties

> [!TIP] The **Platform** column indicates the platform where the properties are supported in the original third-party library.

> [!TIP] If the value of **HarmonyOS Support** is **yes**, it means that the HarmonyOS platform supports this property; **no** means the opposite; **partially** means some capabilities of this property are supported. The usage method is the same on different platforms and the effect is the same as that of iOS or Android.

### 1. Router 

Router manages page navigation and transition effects for the entire application.

**Router properties：**

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| sceneStyle | Style of the scene container | style | no | iOS/Android | yes |
| backAndroidHandler | Custom handler for Android back button | function | no | Android | no |
| wrapBy | Higher-order component wrapper function for adding extra wrappers to each scene | function | no | iOS/Android | yes |
| scenes | Define routing scene configuration (route table) | object | no | iOS/Android | yes |
| createReducer | Create custom navigation reducer | function | no | iOS/Android | yes |
| onStateChange | Callback function when navigation state changes | function | no | iOS/Android | yes |
| getSceneStyle | Function to dynamically get scene style | function | no | iOS/Android | yes |

### 2. Scene

Defines the core interface for page route configuration.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| key | Unique identifier for the scene | string | yes | iOS/Android | yes |
| component | React component corresponding to the scene | element | no | iOS/Android | yes |
| back | Whether to use as back page | boolean | no | iOS/Android | yes |
| init | Whether to initialize the scene | boolean | no | iOS/Android | yes |
| clone | Whether to clone the scene | boolean | no | iOS/Android | yes |
| contentComponent | Content component | element | no | iOS/Android | yes |
| backButtonImage | Back button image path | string | no | iOS/Android | yes |
| backButtonTintColor | Back button color | string | no | iOS/Android | yes |
| drawer | Whether to use as drawer menu | boolean | no | iOS/Android | yes |
| failure | Callback function or scene key when navigation fails | function\| string | no | Android | no |
| headerBackTitle | Header back button title | string | no | iOS/Android | yes |
| hideNavBar | Whether to hide navigation bar | boolean | no | iOS/Android | yes |
| hideTabBar | Whether to hide tab bar | boolean | no | iOS/Android | yes |
| hideBackImage | Whether to hide back image | boolean | no | iOS/Android | yes |
| initial | Whether to use as initial scene | boolean | no | iOS/Android | yes |
| leftButtonImage | Left button image | Image | no | iOS/Android | yes |
| modal | Whether to display in modal form | boolean | no | / | no |
| navigationBarTitleImage | Navigation bar title image | Image | no | iOS/Android | yes |
| navigationBarTitleImageStyle | Navigation bar title image style | style | no | iOS/Android | yes |
| navTransparent | Whether navigation bar is transparent | boolean | no | iOS/Android | yes |
| on | General event handler function | function | no | iOS/Android | yes |
| onEnter | Callback function when entering the scene | function | no | iOS/Android | yes |
| onExit | Callback function when exiting the scene | function | no | iOS/Android | yes |
| onLeft | Left button click event | function | no | iOS/Android | yes |
| onRight | Right button click event | function | no | iOS/Android | yes |
| renderTitle | Custom title rendering component | element | no | iOS/Android | yes |
| renderLeftButton | Custom left button rendering component | element | no | iOS/Android | yes |
| renderRightButton | Custom right button rendering component | element | no | iOS/Android | yes |
| rightTitle | Right button title | string | no | iOS/Android | yes |
| rightButtonImage | Right button image | Image \| null | no | iOS/Android | yes |
| rightButtonTextStyle | Right button text style | style | no | iOS/Android | yes |
| success | Callback function or scene key when navigation succeeds | function\| string | no | iOS/Android | yes |
| tabs | Whether to use as tab container | boolean | no | iOS/Android | yes |
| title | Scene title | function \| string | no | iOS/Android | yes |
| titleStyle | Title style | style | no | iOS/Android | yes |
| type | Navigation action type | string | no | iOS/Android | yes |
| [name: string] | Other custom properties that will be passed to the scene component | object | no | iOS/Android | yes |


### 3. Tabs 
Defines all configuration options for the tab container.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| wrap | Whether to wrap tabs | boolean | no | iOS/Android | yes |
| activeBackgroundColor | Background color in active state | string | no | iOS/Android | yes |
| activeTintColor | Text color in active state | string | no | iOS/Android | yes |
| inactiveBackgroundColor | Background color in inactive state | string | no | iOS/Android | yes |
| inactiveTintColor | Text color in inactive state | string | no | iOS/Android | yes |
| labelStyle | Label text style | style | no | iOS/Android | yes |
| lazy | Whether to lazy load tabs | boolean | no | iOS/Android | yes |
| hideNavBar | Whether to hide navigation bar | boolean | no | iOS/Android | yes |
| hideTabBar | Whether to hide tab bar | boolean | no | iOS/Android | yes |
| tabBarComponent | Custom tab bar component | element | no | iOS/Android | yes |
| tabBarPosition | Tab bar position | string | no | iOS/Android | yes |
| tabBarStyle | Tab bar style | style | no | iOS/Android | yes |
| tabStyle | Single tab style | style | no | iOS/Android | yes |
| indicatorStyle | Indicator style | style | no | iOS/Android | yes |
| showLabel | Whether to show label text | boolean | no | iOS/Android | yes |
| swipeEnabled | Whether swipe switching is supported | boolean | no | iOS/Android | yes |
| tabBarOnPress | Tab bar press event handler | function | no | iOS/Android | yes |
| backToInitial | Whether to return to initial tab when going back | boolean | no | iOS/Android | yes |

### 4. Drawer

Defines the configuration options for the drawer menu component.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| drawerImage | Drawer button image | Image | no | iOS/Android | yes |
| drawerIcon | Drawer button icon, can be a React element or component | element | no | iOS/Android | yes |
| drawerPosition | Drawer position | string | no | iOS/Android | yes |

### 5. Stack 

Defines all configuration options for the stack navigator.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| navigationBarStyle | Navigation bar style | style | no | iOS/Android | yes |
| icon | Icon | object | no | iOS/Android | yes |
| tintColor | Stack and Screen Component Title Color | string | no | iOS/Android | yes |
| hideNavBar | Whether to hide navigation bar | boolean | no | iOS/Android | yes |
| hideTabBar | Whether to hide tab bar | boolean | no | iOS/Android | yes |
| title | Title | string | no | iOS/Android | yes |
| lightbox | Whether to display in lightbox mode | boolean | no | iOS/Android | yes |
| tabs | Whether to use as tabs | boolean | no | iOS/Android | yes |
| initial | Whether to use as initial stack | boolean | no | iOS/Android | yes |
| titleStyle | Title style | style | no | iOS/Android | yes |
| type | Type | string | no | iOS/Android | yes |
| navTransparent | Whether navigation bar is transparent | boolean | no | iOS/Android | yes |
| renderer | Renderer | object | no | iOS/Android | yes |

### 6. Actions 

Defines all methods for navigation operations.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| currentScene | Current scene information | object | no | iOS/Android | yes |
| jump | Jump to specified scene | function | no | iOS/Android | yes |
| pop | Go back to previous scene | function | no | iOS/Android | yes |
| popAndPush | Go back and push new scene | function | no | / | no |
| popTo | Go back to specified scene | function | no | iOS/Android | yes |
| push | Push new scene | function | no | iOS/Android | yes |
| refresh | Refresh current scene | function| no | iOS/Android | yes |
| replace | Replace current scene | function | no | iOS/Android | yes |
| reset | Reset navigation stack to specified scene | function | no | iOS/Android | yes |
| addRef | Add reference | function | no | iOS/Android | yes |
| drawerOpen | Open drawer menu | object | no | iOS/Android | yes |
| drawerClose | Close drawer menu | object | no | iOS/Android | yes |

### 7. ActionConstShort - navigation action

These constants are used to explicitly specify navigation behavior in route configuration and navigation operations, ensuring clarity and consistency in navigation logic.

| Name | Description | Type | Required | Platform | HarmonyOS Support |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| JUMP | Jump action type | string | no | iOS/Android | yes |
| PUSH | Push action type | string | no | iOS/Android | yes |
| PUSH_OR_POP | Push or pop action type | string | no | iOS/Android | yes |
| REPLACE | Replace action type | string | no | iOS/Android | yes |
| BACK | Back action type | string | no | iOS/Android | yes |
| BACK_ACTION | Back action | string | no | iOS/Android | yes |
| POP_TO | Pop to specified scene action type | string | no | iOS/Android | yes |
| REFRESH | Refresh action type | string | no | iOS/Android | yes |
| RESET | Reset action type | string | no | iOS/Android | yes |
| FOCUS | Focus action type | string | no | iOS/Android | yes |
| BLUR | Blur action type | string | no | iOS/Android | yes |
| ANDROID_BACK | Android back button action type | string | no | Android | no |

## 7. Known Issues

## 8. Others
Router:backAndroidHandler android only  
Scene:modal         Source library does not support.  
Actions：popAndPush  Source library does not support.  
Actions：addRef      The ref attribute is added to components for internal use only and does not expose a public interface. This definition is not present in the getRef library.  
ActionConstShort：ANDROID_BACK  android only  
## 9. License

This project is licensed under [The MIT License (MIT)](https://github.com/aksonov/react-native-router-flux/blob/master/LICENSE).

