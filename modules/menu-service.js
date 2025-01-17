/**
 * Module for Menu functions.
 */
const { app, Menu, MenuItem } = require('electron')
const settingsService = require(__dirname + '/../modules/settings-service')

const menuService = {}


menuService.createMenu = (window) => {
    let converse;
    const application = new Menu();
    application.append(new MenuItem({
        label: 'Converse Desktop'
        , submenu: converse = Menu.buildFromTemplate([
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    window.show()
                    window.loadFile('index.html').catch((reason) => {
                        console.log(reason);
                        app.isQuitting = true;
                        app.quit();
                    });
                }
            },
            {
                label: 'Minimize on close',
                type: 'checkbox',
                id: 'minimize-on-close',
                checked: settingsService.get('minimizeOnClose'),
                click: () => {
                    settingsService.set('minimizeOnClose', converse.getMenuItemById('minimize-on-close').checked);
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    app.isQuitting = true
                    app.quit()
                },
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Edit'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },

            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Help'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    window.webContents.openDevTools()
                }
            }
        ])
    }));

    Menu.setApplicationMenu(application);
}

module.exports = menuService
