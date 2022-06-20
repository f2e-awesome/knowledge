const fs = require('fs');

fs.readFile('Title.md', 'utf8', (err, data) => {
    // let buf = Buffer.from('[开发工具](#开发工具)、[HTML5](#HTML5)、[CSS](#CSS)')
    // /*
    // * buf 指的是读取的buffer
    // * 0 从buffer哪个位置读取
    // * 4  读取多少个buffer往里写
    // * 0 从文件哪个位置写入
    // * bytesWritten实际写入的个数
    // * */
    // fs.write(fd, buf, 0, buf.length, 3*3, (err, bytesWritten) => {
    //     console.log('>>> 4.File merged')
    // });
    if (err) {
        console.error(err)
        return
    }
    const result = fs.readFileSync('Process.md', 'utf8').split('\n')
    result.splice(6, 0, data)
    fs.writeFileSync('README.md', result.join('\n'), 'utf8')
    console.log('>>> 4.File merged')
});