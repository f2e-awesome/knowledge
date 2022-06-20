const fs = require('fs');
const path = require('path');
const os = require('os');
let distPath = 'Process.md';

// 清空文件
fs.truncate(distPath, 0, function () { console.log('>>> 1.Clean up files') })

fs.appendFile(distPath, `> 更新时间：${format('YYYY-MM-DD hh:mm:ss')}（脚本自动生成，勿手动修改，详见：info.md)${os.EOL}`, function (err) {
   if (err) throw err;
   console.log('>>> 2.Date updated');
});

function walkSync(currentDirPath, callback) {
   fs.readdirSync(currentDirPath).forEach(function (name) {
      let filePath = path.join(currentDirPath, name);
      let stat = fs.statSync(filePath);
      if (stat.isFile()) {
         callback(filePath, stat);
      } else if (stat.isDirectory()) {
         walkSync(filePath, callback);
      }
   });
}
walkSync('mds', function (filePath, stat) {
   console.log(filePath)
   let buf = new Buffer.alloc(1024 * 1024);
   fs.open(filePath, 'r+', function (err, fd) {
      if (err) {
         return console.error(err);
      }

      fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
         if (err) {
            console.log(err);
         }
         if (bytes > 0) {
            // console.log(bytes);
            let currentBuf = buf.slice(0, bytes) + os.EOL;
            fs.appendFileSync(distPath, currentBuf, function (err) {
               if (err) throw err;
            });
         }
      });
   });
   console.log('Success!')
});

function format(fmt) {
   const date = new Date()
   const o = {
       "Y+": date.getFullYear(),
       "M+": date.getMonth() + 1,    
       "D+": date.getDate(),          
       "h+": date.getHours(),        
       "m+": date.getMinutes(),       
       "s+": date.getSeconds(),      
       "W": date.getDay()            
   }
   for (var k in o) {
      if (new RegExp("("+ k +")").test(fmt)) {
           fmt = fmt.replace(RegExp.$1, () => {
               if (k === 'W') {         
                   const week = ['日', '一', '二', '三', '四', '五', '六']
                   return week[o[k]]
               } else if (k === 'Y+' || RegExp.$1.length == 1) { 
                   return o[k]
               } else {
                   return ("00"+ o[k]).substr(("" + o[k]).length)
               }
           })
       }
   }
   return fmt
}
