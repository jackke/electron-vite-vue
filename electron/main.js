// electron/main.js
const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");
// 是否是生产环境
const isPackaged = app.isPackaged;

// 禁止显示默认菜单
Menu.setApplicationMenu(null);

const createWindow = () => {
  // 创建浏览器窗口
  let mainWindow = new BrowserWindow({
    // 默认窗口标题，如果由loadURL()加载的HTML文件中含有标签<title>，此属性将被忽略。
    title: "Electron + Vue3",
    width: 800,
    height: 600,
    // 设置窗口尺寸为屏幕工作区尺寸
    // 窗口图标。 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果, 默认使用可执行文件的图标.
    // 在根目录中新建 build 文件夹存放图标等文件
    icon: path.resolve(__dirname, "./image.png"),
  });

  if (isPackaged) {
    let indexPath = path.join(__dirname, "../dist/index.html");
    console.log('indexPath', indexPath);
    // 打包后加载本地文件
    mainWindow.loadURL(`file://${indexPath}`)
  } else {
    mainWindow.loadURL('http://localhost:8085/')
  }
  // 打开调试窗口 快捷键
  globalShortcut.register("CommandOrControl+Shift+i", function () {
      win.webContents.openDevTools();
  });
};

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 如果开发环境使用了 nginx 代理，禁止证书报错
if (!isPackaged) {
  // 证书的链接验证失败时，触发该事件
  app.on(
    "certificate-error",
    function (event, webContents, url, error, certificate, callback) {
      event.preventDefault();
      callback(true);
    }
  );
}
