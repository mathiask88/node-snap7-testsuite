/*
 * Copyright (c) 2015, Mathias Küsel
 * MIT License <https://github.com/mathiask88/node-snap7-testsuite/blob/master/LICENSE>
 */

/**
 * Module dependencies.
 */
var m_snap7 = require('node-snap7');
var m_os = require('os');

/**
 * Routes
 */
module.exports.index = function(req, res) {
  res.render('index', {
    title: "nodeSnap7",
    'CONNTYPE_PG': m_snap7.S7Client.prototype.CONNTYPE_PG,
    'CONNTYPE_OP': m_snap7.S7Client.prototype.CONNTYPE_OP,
    'CONNTYPE_BASIC': m_snap7.S7Client.prototype.CONNTYPE_BASIC
  });
}

module.exports.systemInfo = function(req, res) {
  res.render('systemInfo');
}

module.exports.dataRW = function(req, res) {
  res.render('dataRW', {
    'S7WLBit': m_snap7.S7Client.prototype.S7WLBit,
    'S7WLByte': m_snap7.S7Client.prototype.S7WLByte,
    'S7WLWord': m_snap7.S7Client.prototype.S7WLWord,
    'S7WLDWord': m_snap7.S7Client.prototype.S7WLDWord,
    'S7WLReal': m_snap7.S7Client.prototype.S7WLReal,
    'S7WLCounter': m_snap7.S7Client.prototype.S7WLCounter,
    'S7WLTimer': m_snap7.S7Client.prototype.S7WLTimer,
    'S7AreaDB': m_snap7.S7Client.prototype.S7AreaDB,
    'S7AreaPE': m_snap7.S7Client.prototype.S7AreaPE,
    'S7AreaPA': m_snap7.S7Client.prototype.S7AreaPA,
    'S7AreaMK': m_snap7.S7Client.prototype.S7AreaMK,
    'S7AreaTM': m_snap7.S7Client.prototype.S7AreaTM,
    'S7AreaCT': m_snap7.S7Client.prototype.S7AreaCT
  });
}

module.exports.scanDevices = function(req, res) {
  var interfaces = m_os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family == 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  var startAddresses = addresses.map(function(ip) {
    ip = ip.split('.');
    ip[3] = '1';
    return ip.join('.');
  });

  var endAddresses = addresses.map(function(ip) {
    ip = ip.split('.');
    ip[3] = '255';
    return ip.join('.');
  });
  res.render('scanDevices', { startIPv4: startAddresses, endIPv4: endAddresses });
}
