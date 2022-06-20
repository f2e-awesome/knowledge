const fs = require('fs');
const lookingForString = /### [a-zA-Z0-9\u4e00-\u9fa5]+/g;
fs.readFile('./Process.md', 'utf-8', function (err, data) {
    let exc = new RegExp(lookingForString);
    const arr = data.match(exc);
    if (err) {
        console.log(err);
    } else {
        const arr = data.match(exc);

        let resultArr = arr.map((item, index) => {
            let tmp = item.replace('### ', '');
            return `[${tmp}](#${tmp})`
        });
        let strAdd = `- 标签体系：${resultArr.join('、')}`
        // console.log(strAdd);
        fs.writeFile('Title.md', strAdd, 'utf8', function (error) {
            if (error) {
                console.log(error);
                return false;
            }
        })
        console.log('>>> 3.Title task completed');
    }
});




