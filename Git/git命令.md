# GIT

## 参数 --no-edit

在执行 合并分支 或者 拉取代码时

```git

git pull --no-edit

git merge --no-edit
```

可以跳过命令行输入提示文案，多个命令串行使用更丝滑

## 删除文件夹 dist

```git
git rm --cache -r dist
```

## 撤销 (本地仓库 和 远程仓库) 提交的commit

```git
git reset --hard <版本号>
<!-- 注意使用 --hard 参数会抛弃当前工作区的修改 -->
<!-- 使用 --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交 -->
```

如果此时使用命令：

```git
git push origin <分支名>
```

会提示本地的版本落后于远端的版本；

为了覆盖掉远端的版本信息，使远端的仓库也回退到相应的版本，需要加上参数--force

```git
git push origin <分支名> --force
```

在合并分支出现冲突不想接解决时，也可以使用此命令，来取消合并，恢复到合并前的状态


## 删除远程分支

### 查看远程分支

```git
git branch -a
```

### 删除

```git
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```

## 删掉远程仓库的命令

```git
git remote rm origin
```

## 创建一个全新的分支，不包含原分支的提交历史，Gihthub 项目主页分支用这个

```git
git checkout --orphan gh-pages
```

## 强制推送到远程分支并覆盖

```git
git push origin master --force
```
