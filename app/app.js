const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow(winObj) {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("closed", () => {
    app.quit();
  });

  winObj.win = win;
}

const eWindow = {};
const windowCreator = win => {
  return () => { 
    createWindow(win);
  }
}

app.on("ready", () => {
  createWindow(eWindow);
});
