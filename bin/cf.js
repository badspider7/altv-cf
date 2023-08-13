#!/usr/bin/env node

//cf-cli(create-file command line)
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const inquirer = require("inquirer");

//找到 node_modules,就能明确找到文件的所在位置
const project_basic_file = path
  .dirname("D:\\project\\node_modules\\cmd-plugin")
  .split("node_modules")[0];

// console.log(path.basename(__dirname));

//得到插件文件夹的具体路径
const plugin_dir = project_basic_file.concat("src\\core\\plugin");

//询问插件的名字
const promptList = [
  {
    type: "input", // input类型带测试
    message: "请输入plugin的名字:",
    name: "plugin_name",
    default: "test_plugin",
  },
  {
    type: "confirm",
    message: "是否需要在webviwe下创建components文件",
    name: "isCreateComponents",
    default: false,
  },
];

async function test() {
  const plugin_info = await inquirer.prompt(promptList); //参数是一个数组，数组中每个对象就是一次交互
  //创建文件夹 client server share webview webview/components,之后分别创建3个index.ts plugin_name.vue
}

// test();

//根据输入的文件名删除对应文件 cf rm xxx  异步 loading tip 删除成功

class createDir {
  constructor(dirname, plugin_dir) {
    this.dirname = plugin_dir;
    this.plugin_dir = plugin_dir;
    // this.newDirPath = ''
  }
  //根据插件名字创建总的文件夹
  async create() {
    try {
      //判断文件夹的名字是否已经存在
      if (this.isFilenameExit()) {
        console.log("文件夹已存在，请换个名字");
        return false;
      }
      const rootDir = await fs.mkdir(path.join(this.plugin_dir, this.dirname));
      console.log(rootDir);
      const newDirPath = path.join(this.plugin_dir, this.dirname);
      superMkdir(newDirPath, ["client", "server", "share", "webview"]);
      //创建webview下面的components
      if (plugin_info.isCreateComponents) {
        const webviewPath = path.join(newDirPath, "webview");
        superMkdir(webviewPath, ["components"]);
        // fs.mkdir(path.join(webviewPath, "components")(err) => {
        //   console.log(err)
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //根据插件名字判断是否存在文件
  isFilenameExit() {
    fs.access(path.join(this.plugin_dir, this.dirname), (err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
  }
}
/**
 *  cf filename
 * @param {string} path
 * @param {Array} dirname [client, server, share ,webview ]
 * @param {Array} filename 不输入默认为index.ts
 * @return {string} DirPath
 */
const superMkdir = (path, dirname, filename) => {
  const exampleFileType = ["client", "server", "share", "webview"];
  let exampleCode = "";
  if (path == "" || dirname.length == 0) {
    console.log("path and dirname can not be null");
    return false;
  }
  //判断 filename 是否存在
  // if (filename.length !== 0) {
  // } else {
  dirname.forEach((item) => {
    //创建对应的文件夹
    fs.mkdir(path.join(path, item), (err) => {
      console.log(err);
    });
    //给新的文件夹添加入口文件  example: example/client.ts
    const newDirname = path.join(path, item);
    // exampleFileType.forEach(fileType => {
    //   if (item == fileType) {
    //     examplePath = path.join(exampleDir,fileType)
    //   }
    // })
    if (item == "webview" || item == "components") {
      const examplePath = path.join(exampleDir, item) + ".vue";
    } else {
      const examplePath = path.join(exampleDir, item) + ".ts";
    }
    //读取指定路径的文件数据
    fs.readFile(examplePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      }
      exampleCode = data;
    });
    //向指定路径的文件写入数据
    fs.writeFile(
      path.join(newDirname, "index.ts"),
      exampleCode,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("数据写入成功");
      }
    );
  });
  // }

  return path;
};

/**
 *
 * @param {string} filename
 * @return {boolean} status
 */
const deleteFile = (filename) => {};

/**
 *
 * @param {string} dirname
 * @return {boolean} status
 */
const deleteDir = (dirname) => {};

/**
 * @param {string} filename
 * @return {string} filePath
 */
const findDir = (filename) => {};

/**
 * @param {string} filename
 * @param {string} path
 */
const storage = (filename, path) => {};
