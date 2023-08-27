> 利用命令行快速创建 Athena 插件文件夹,你可以在 example 文件夹里面修改生成的模板

> use command line to create Athena plugis folder,you can change example code in example folder.

## install

Using npm:

```javascript
npm i cpd
```

Using yarn:

```javascript
yarn add cpd
```

## Useage

> 最重要的是要在 package.json 里面配置一下

> The most important thing is to configuration in package.json,such as this.

```json
"script":{
    "...":"other Configuration",
    // 最重要的是要加上这个
    "cf":"cpd"
}
```

Using npm:

```javascript
npm run cf <plugin_name>
```

Using yarn:

```javascript
yarn cf <plugin_name>
```

## Example

![演示](http://s01el4yfr.bkt.clouddn.com/npm_readme/cf.png)
![demo](http://s01el4yfr.bkt.clouddn.com/npm_readme/demo.png)
