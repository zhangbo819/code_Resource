
cd /Users/zzb/work/xcrn/

rm -rf ./src

cp -rf /Users/zzb/work/qingke_rn/common_template/TV/src .

npm run pack

mkdir -p publish/assets/src/assets

cp -rf /Users/zzb/work/qingke_rn/common_template/TV/src/assets ./publish/assets/src

open ./publish

# createChildrenProcessBySpawn('cd', [crnPath], () => {
#     createChildrenProcessBySpawn('open', ['.'])
#     // createChildrenProcessBySpawn('crn-cli', ['pack'], () => {
#     //     createChildrenProcessBySpawn('open', [crnPath])
#     // })
# })
