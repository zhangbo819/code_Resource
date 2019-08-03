
## 删除文件夹dist

```
git rm --cache -r dist

```

## 撤销 (本地仓库 和 远程仓库) 提交的commit

```
git reset --hard <版本号>
// 注意使用 --hard 参数会抛弃当前工作区的修改
// 使用 --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交
```

如果此时使用命令：
```
git push origin <分支名>
```
会提示本地的版本落后于远端的版本；

为了覆盖掉远端的版本信息，使远端的仓库也回退到相应的版本，需要加上参数--force

```
git push origin <分支名> --force
```


## 删除远程分支

```
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```

## 删掉远程仓库的命令：

```
git remote rm origin
```

## 创建一个全新的分支，不包含原分支的提交历史，Gihthub项目主页分支用这个。

```
git checkout --orphan gh-pages
```