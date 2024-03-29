const fs = require("fs");
const path = require("path");

//将文件名转换为大驼峰
function convertToCamelCase(filename) {
  let fileArr = filename.split("-");
  let tempArr = [];
  fileArr.forEach((item) => {
    let tempStr = "";
    tempStr = item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
    tempArr.push(tempStr);
  });
  return tempArr.join("");
}

function createDir(dirname, plugin_dir, isCreateComponents) {
  return new Promise((resolve, reject) => {
    // 判断文件夹的名字是否已经存在
    if (isFilenameExist(path.join(plugin_dir, dirname))) {
      reject(new Error("文件夹已存在，请换个名字"));
      return;
    }

    // 创建文件夹
    fs.mkdir(path.join(plugin_dir, dirname), (err) => {
      if (err) {
        reject(err);
        return;
      }

      const newDirPath = path.join(plugin_dir, dirname);

      //判断文件名是否有-，如果有则文件夹名称不变,文件名字大写
      let tempFilename = dirname;
      if (dirname.includes("-")) {
        tempFilename = convertToCamelCase(dirname);
      }
      superMkdir(
        newDirPath,
        ["client", "server", "shared", "webview"],
        tempFilename
      );

      // 创建 webview 下面的 components
      if (isCreateComponents) {
        const webviewPath = path.join(newDirPath, "webview");
        superMkdir(webviewPath, ["components"]);
      }

      resolve(newDirPath);
    });
  });
}

function isFilenameExist(dirPath) {
  return fs.existsSync(dirPath);
}

/**
 *  cf filename
 * @param {string} path
 * @param {Array} dirname [client, server, shared ,webview ]
 * @param {Array} filename 不输入默认为index.ts
 * @return {string} DirPath
 */
function superMkdir(filePath, dirnameC, filename) {
  return new Promise((resolve, reject) => {
    if (!filePath || dirnameC.length === 0) {
      reject(new Error("路径和文件夹名称不能为空"));
      return;
    }

    dirnameC.forEach((item) => {
      fs.mkdir(path.join(filePath, item), (err) => {
        if (err) {
          reject(err);
          return;
        }

        let exampleCode = "";

        if (item === "webview" || item === "components") {
          exampleCode = fs.readFileSync(
            path.join(__dirname, "example", `${item}.vue`),
            "utf-8"
          );
        } else {
          const examplePath = path.join(__dirname, "example", `${item}.ts`);
          exampleCode = fs.readFileSync(examplePath, "utf-8");
        }

        const indexFileName =
          item === "webview" || item === "components"
            ? filename + ".vue"
            : "index.ts";
        fs.writeFileSync(
          path.join(filePath, item, indexFileName),
          exampleCode,
          "utf-8"
        );
      });
    });

    resolve(filePath);
  });
}

module.exports = {
  createDir,
};
