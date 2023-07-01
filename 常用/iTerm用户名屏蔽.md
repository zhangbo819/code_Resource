[原链接](https://blog.csdn.net/z3512498/article/details/51245853)



1. 将 ~/.oh-my-zsh/themes/agnoster.zsh-theme 复制 myagnoster.zsh-theme
    不更改其 git 中的文件，创建一份新的

```sh

cp ~/.oh-my-zsh/themes/agnoster.zsh-theme ~/.oh-my-zsh/themes/myagnoster.zsh-theme

```

2. 修改 myagnoster.zsh-theme， 隐藏用户名

```sh
vim  ~/.oh-my-zsh/themes/myagnoster.zsh-theme

```

```sh
## Main prompt
build_prompt() {
  RETVAL=$?
  prompt_status
  # prompt_context
  prompt_dir
  prompt_git
  prompt_hg
  prompt_end
}
```


3. 修改后将 ~/.zshrc 中的 使用新配置

```sh
ZSH_THEME="myagnoster"
```

4. 应用修改

```sh
source ~/.zshrc
```