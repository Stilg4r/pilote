import fs from "fs";
import path from "path";

const loadRoutesWindows= async (app = null, routesPath = "routes") => {
  fs.readdirSync(path.join(__dirname, "..", routesPath)).forEach((_file) => {
    if (_file.includes(".js")) {
      const _module = routesPath.replace("routes\\", "");
      const _entity = _file.replace(".routes.js", "");
      const _endpoint = `/api/v1/${_module}/${_entity}`.replace(/\\/g, "/");
      const _routerPath = path.join(__dirname, "..", routesPath, _file);
      app.use(_endpoint, require(_routerPath));
    } else {
      const newRoutesPath = path.join(routesPath, _file);
      loadRoutes(app, newRoutesPath);
    }
  });
};

const loadRoutesLinux= async (app = null, routesPath = "routes") => {
  fs.readdirSync(path.join(__dirname, "..", routesPath)).forEach((_file) => {
    if (_file.includes(".js")) {
      const _module = routesPath.replace('routes', '');
      const _entity = _file.replace(".routes.js", "");
      const _endpoint = `/api/v1${_module}/${_entity}`.replace(/\\/g, "/");
      const _routerPath = path.join(__dirname, "..", routesPath, _file);
      app.use(_endpoint, require(_routerPath));
    } else {
      const newRoutesPath = path.join(routesPath, _file);
      loadRoutes(app, newRoutesPath);
    }
  });
};

export const loadRoutes =  ( process.platform === "win32" ) ? loadRoutesWindows: loadRoutesLinux;
