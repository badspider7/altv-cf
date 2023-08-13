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


//得到插件文件夹的具体路径
// const plugin_dir = project_basic_file.concat("src\\core\\plugin");

const plugin_dir = "D:\\profileProject\\cmd-plugin\\bin\\test"

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
  const cfDir = new createDir(plugin_info.plugin_name, plugin_dir);
  cfDir.create();
  
}

test();

//根据输入的文件名删除对应文件 cf rm xxx  异步 loading tip 删除成功

class createDir {
  constructor(dirname, plugin_dir) {
    this.dirname = dirname;
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
      //创建文件夹
      fs.mkdir(path.join(this.plugin_dir, this.dirname), (err) => {
        if (err) {
          console.log('创建文件夹失败', err);
        }
        console.log('文件夹创建成功,',path.join(this.plugin_dir, this.dirname))
      });
      const newDirPath = path.join(this.plugin_dir, this.dirname);
      superMkdir(newDirPath, ["client", "server", "share", "webview"]);
      创建webview下面的components
      if (plugin_info.isCreateComponents) {
        const webviewPath = path.join(newDirPath, "webview");
        superMkdir(webviewPath, ["components"]);
        // fs.mkdir(path.join(webviewPath, "components")(err) => {
        //   console.log(err)
        // });
      }
    } catch (error) {
      console.log('err12',error);
    }
  }
  //根据插件名字判断是否存在文件
  // async isFilenameExit() {
  //   try {
  //     await fs.promises.access(path.join(this.plugin_dir, this.dirname));
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }
  isFilenameExit() {
    console.log('path',path.join(this.plugin_dir, this.dirname));
    const res = fs.existsSync(path.join(this.plugin_dir, this.dirname));
    console.log('res',res);
    return res;
  }
}
/**
 *  cf filename
 * @param {string} path
 * @param {Array} dirname [client, server, share ,webview ]
 * @param {Array} filename 不输入默认为index.ts
 * @return {string} DirPath
 */
const superMkdir = (filePath, dirname, filename) => {
  const exampleFileType = ["client", "server", "share", "webview"];
  let examplePath = '';
  let exampleCode = "";
  const exampleDir = 'D:\\profileProject\\cmd-plugin\\bin\\example';
  if (filePath == "" || dirname.length == 0) {
    console.log("path and dirname can not be null");
    return false;
  }
  //判断 filename 是否存在
  // if (filename.length !== 0) {
  // } else {
  dirname.forEach((item) => {
    //创建对应的文件夹
    fs.mkdir(path.join(filePath, item), (err) => {
      console.log('err3',err);
    });
    //给新的文件夹添加入口文件  example: example/client.ts
    const newDirname = path.join(filePath, item);
    // exampleFileType.forEach(fileType => {
    //   if (item == fileType) {
    //     examplePath = path.join(exampleDir,fileType)
    //   }
    // })
    if (item == "webview" || item == "components") {
       examplePath = path.join(exampleDir, item) + ".vue";
    } else {
       examplePath = path.join(exampleDir, item) + ".ts";
    }
    //读取指定路径的文件数据
    fs.readFile(examplePath, "utf-8", (err, data) => {
      if (err) {
        console.log('err2',err);
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
          console.log('err1',err);
        }
        console.log("数据写入成功");
      }
    );
  });
  // }

  return filePath;
};

