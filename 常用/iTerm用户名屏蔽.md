[原链接](https://blog.csdn.net/z3512498/article/details/51245853)



1. 将 ~/.oh-my-zsh/themes/agnoster.zsh-theme 复制 myagnoster.zsh-theme
    不更改其git中的文件，创建一份新的

2. 修改 myagnoster.zsh-theme， 隐藏用户名
```sh
## Main prompt
build_prompt() {
  RETVAL=$?
  prompt_status
 #prompt_context
  prompt_dir
  prompt_git
  prompt_hg
  prompt_end
}
```


2. 修改后将~/.zshrc中的 使用新配置

```sh
ZSH_THEME="myagnoster"
```
