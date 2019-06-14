# !/bin/bash
# 批量删除空文件目录
# 使用方法：(1)进入要操作的目录：cd 目录名；（2）运行脚本：sh 脚本名.sh
deleteEmpty() 
{
  find ${1:-.} -mindepth 1 -maxdepth 1 -type d | while read -r dir

  do
    if [[ -z "$(find "$dir" -mindepth 1 -type f)" ]] >/dev/null
    then
      echo "$dir"
      # to do 只删除一层
      rm -rf ${dir} 2>&- && echo "Empty, Deleted!" || echo "Delete error"
    fi
    if [ -d ${dir} ]
    then
      deleteEmpty "$dir"
    fi
  done
}
deleteEmpty