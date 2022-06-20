### README.md为生成文件，具体步骤如下：
1. 在 mds 文件夹下对应的分类新增内容
2. 运行 “npm run deploy”，即可将 mds 目录下的内容进行整合，最终输出 README.md 文件

### 注意
- 文件合并异步完成，每次顺序并不相同
- 统计信息需要安装 “gem install git_stats”，运行“git_stats generate”即可