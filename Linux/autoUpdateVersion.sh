PROJECT_ID='xxx'
PRIVATE_TOKEN="xxx"

# 更新版本号
if [ "$2" ]; then
    npm --no-git-tag-version version $2
    VERSION=$1
else
    npm --no-git-tag-version version patch
    VERSION=$(node -p "require('./package.json').version")
fi

# 手动修改
# awk -v new_version="$VERSION" '/" version"/{$2="\""new_version"\","} 1' package.json > temp_package.json && mv temp_package.json package.json && PACKAGE=$(<package.json)

# 通过 gitlab api 的方式更新至远程
# 通过 node 处理数据
DD_DATA=$(node -p "JSON.stringify({branch:\"${1}\",commit_message:\"gitlab ci version update\",content: JSON.stringify(require('./package.json'),null,4)})")
echo $DD_DATA

curl --request PUT --header "PRIVATE-TOKEN: $PRIVATE_TOKEN" --header "Content-Type: application/json" --data "${DD_DATA}" "https://gitlab.xxx.com/api/v4/projects/$PROJECT_ID/repository/files/package.json"

echo "\nVersion v$VERSION update succeeded!\n"

