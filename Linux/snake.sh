#!/bin/bash

# 定义蛇的位置
snake_x=1
snake_y=1

# 定义食物的位置
food_x=5
food_y=5

# 定义地图
map=(
	"#########"
	"#       #"
	"#       #"
	"#       #"
	"#       #"
	"#       #"
	"#       #"
	"#########"
)

# 打印地图
function print_map() {
	for line in ${map[@]}; do
		echo $line
	done
}

# 打印蛇
function print_snake() {
	map[$snake_x]=${map[$snake_x]:0:$snake_y}'@'${map[$snake_x]:$((snake_y + 1))}
	print_map
}

# 打印食物
function print_food() {
	map[$food_x]=${map[$food_x]:0:$food_y}'*'${map[$food_x]:$((food_y + 1))}
	print_map
}

# 移动蛇
function move_snake() {
	read -n1 -p "请输入方向：" direction
	case $direction in
	w)
		snake_x=$((snake_x - 1))
		;;
	s)
		snake_x=$((snake_x + 1))
		;;
	a)
		snake_y=$((snake_y - 1))
		;;
	d)
		snake_y=$((snake_y + 1))
		;;
	*)
		echo "输入错误！"
		;;
	esac
}

# 游戏开始
echo "游戏开始！"
while true; do
	print_food
	print_snake
	move_snake
	if [ $snake_x -eq $food_x ] && [ $snake_y -eq $food_y ]; then
		echo "恭喜你，你吃到了食物！"
		break
	fi
done
