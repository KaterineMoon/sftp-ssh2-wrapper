"use strict";

let Client = require('ssh2-sftp-client');

const config = {
    host: '',
    port: '',
    username: '',
    password: '',
    path: ''
};

function setConfig(host, port, username, password, path) {

    config.host = host,
    config.port = port,
    config.username = username,
    config.password = password,
    config.path = path
}

const sendFile = (config, localPath, filename) => {
    return new Promise(function (resolve, reject) {
        let sftp = new Client();
        console.log(filename);
        sftp.connect(config).then(() => {
            return sftp.put(localPath + "/" + filename, config.path + "/" + filename);
        }).then(() => {
            console.log('finish ' + filename);
            sftp.end();
            resolve(filename);
        }).catch((err) => {
            console.log(err, 'catch error');
        });
    });
};

var sendFiles = function (files) {

    for(var i=0; i<files.files.length; i++){
        sendFile(config, files.path, files.files[i])
    }
}
