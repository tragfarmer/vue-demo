<template>
  <div style="padding: 20px;">
    <div class="m-course">
      <div class="m-group-title">
        <strong>github + git 开源项目管理</strong>
      </div>

      <div>
        <div class="m-step-title">
          <strong>操作流程</strong>
        </div>
        <pre>
          一：创建github账号
            https://github.com/
          二：安装git工具
            https://git-for-windows.github.io/
          三：进入Github首页，点击New repository新建一个项目
          四：填写相应信息后点击 create
            Repository name: 仓库名称
            Description(可选): 仓库描述介绍
            Public, Private : 仓库权限（公开共享，私有或指定合作者）
            Initialize this repository with a README: 添加一个README.md
            gitignore: 不需要进行版本管理的仓库类型，对应生成文件.gitignore
            license: 证书类型，对应生成文件LICENSE
          五：点击Clone or dowload会出现一个地址，copy这个地址备用。
          六：本地操作
            1，点击项目右键，选择 Git Bash Here，进入命令操作
            2，输入命令：git clone [粘贴刚才复制的地址]（例：git clone https://github.com/tragfarmer/vue-admin.git）
            3，些时本地项目下会多一个文件夹，该文件夹名即为你github上面的项目名
            4，复制项目需要上传到 github 的所有文件到这个文件夹中
            5，输入命令： cd [新生成的文件夹]（例：cd vue-admin）
            6，输入命令： git add .
            7，输入命令： git commit  -m  "提交信息"
            8，输入命令： git push -u origin master
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'note',
  props: {},
  components: { },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style>
</style>
<style scoped rel="stylesheet">
</style>
