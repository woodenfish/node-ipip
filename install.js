// For the max compatibility, avoid using ES6 features like Promise, let or const

var http = require('http')
var fs = require('fs')
var spawn = require('child_process').spawn
var npm = require('npm')

var TMP = '17monipdb.zip',
  DB = '17monipdb.dat',
  URL = 'http://s.qdcdn.com/17mon/17monipdb.zip'


function download(callback) {
  http.get(URL, function(response) {
    response.pipe(fs.createWriteStream(TMP)).on('finish', function() {
        console.info('Database Successfully downloaded.')
        callback()
      })
      .on('error', callback)
  })
}

function unzip(callback) {
  fs.unlink(DB, function() {
    spawn('unzip', ['-j', TMP, DB, '-d', __dirname])
      .on('error', callback)
      .on('exit', function() {
        callback()
      })
  })
}

function nodeUnzip(callback) {
  var npm = require('npm');
  npm.load(function(err) {
    npm.commands.install(['unzip'], function(err, data) {
      fs.createReadStream(TMP)
        .pipe(require('unzip').Parse())
        .on('entry', function(entry) {
          if (entry.path === DB)
            entry.pipe(fs.createWriteStream(DB)).on('finish', function() {
              callback();
            })
          else
            entry.autodrain()
        })
        .on('error', callback)
    })
  })
}

function success() {
  console.info('Database successfully installed')
  fs.unlink(TMP, process.exit)
}


download(function(err) {
  if (err)
    return console.error('Unable to download database from ipip.net')

  unzip(function(err) {
    if (err) {
      console.warn('zip command not found, fallback to node-unzip')
      return nodeUnzip(function(err) {
        if (err)
          return console.error('Unexpected error occured while extracting database')
        else
          success()
      })
    }

    success()
  })

})
