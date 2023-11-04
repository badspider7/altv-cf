#!/usr/bin/env node

//cpd-cli(create_plugin_dir command line)
const commander = require("commander");
const { createDir } = require("./utils");

//找到 node_modules,就能明确找到文件的所在位置
const project_basic_file = __dirname.split("node_modules")[0];

//得到Athena插件文件夹的具体路径
const plugin_dir = project_basic_file.concat("src\\core\\plugins");

commander
  .version("2.0.0", "-v", "得到插件的当前版本")
  .description("通过命令行在Athena创建插件文件夹")
  .arguments("<pluginName>")
  .option(
    "-c, --create-components",
    "创建webview下面的component文件夹,后面不需要文件名"
  )
  .action((pluginName, options) => {
    const { createComponents } = options;
    createDir(pluginName, plugin_dir, createComponents)
      .then((newDirPath) => {
        console.log("插件创建成功，路径为：", newDirPath);
      })
      .catch((error) => {
        console.error("插件创建失败：", error);
      });
  });

commander.parse(process.argv);
