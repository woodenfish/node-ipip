var http = require('http')
var fs = require('fs')
var spawn = require('child_process').spawn

var tmp = '17monipdb.zip',
  db = '17monipdb.dat'

function success() {
  console.info('Successfully download and extract ip database (free version)')
  fs.unlinkSync(tmp)
}

fs.unlinkSync(db)

http.get('http://s.qdcdn.com/17mon/17monipdb.zip', function(response) {
  response.pipe(fs.createWriteStream(tmp)).on('finish', function() {
    console.info('Database download finished.')
      // unzip to current directory
    spawn('unzip', ['-j', tmp, db, '-d', __dirname])
      .on('error', function() {
        console.warn('zip command not found, fallback to node-unzip')
          // for those system who doesn't have unzip util
        spawn('npm', ['install', 'unzip'])
          .on('exit', function(code, signal) {
            if (code) {
              console.error('Unabled to install unzip util, ' +
                'you have to manually download database to make the module work')
            } else {
              fs.createReadStream(tmp)
                .pipe(require('unzip').Parse())
                .on('entry', function(entry) {
                  if (entry.path === db)
                    entry.pipe(fs.createWriteStream(db)).on('finish', success)
                  else
                    entry.autodrain()
                })
            }
          })
      })
      .on('close', success)
  })
})
