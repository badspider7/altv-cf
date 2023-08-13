const fs = require("fs");
const path = require("path");


function createDir() {
    console.log(isFilenameExit());
    if (isFilenameExit()) {
        console.log("文件夹已存在，请换个名字");
        return false;
    }
    fs.mkdir(path.join(__dirname, 'demo'), (err) => {
        if (err) {
            console.log('something is error',err)
        }
        console.log(path.join(__dirname, 'demo'))
    });
}

function isFilenameExit() {
  const res = fs.existsSync(path.join(__dirname, 'demo'))
  console.log(res)
  return res;
}
createDir()

