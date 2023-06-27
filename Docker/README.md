# Docker

## 常用

- 查看进程


```sh
docker ps 

```

- 打包

> chatfrontend: 名称
> 0.0.1: tag
> . 目录

```sh
docker build -t chatfrontend:0.0.1 .

```

- 将镜像储存为压缩包，供服务器使用

```sh
docker save chatfrontend:0.0.1 > ../release/chatfrontend.tar"
```

- 将下载的镜像包保存为本地镜像，并启动

> 要指定端口号

```sh
docker load < chatfrontend.tar
docker run -d -p 80:80 --name chatfrontend chatfrontend:0.0.1
```

## 容器

- 查看容器列表

```sh
docker container ls

```

- 停止某个容器

```sh
docker container stop CONTAINER_ID
```

- 删除某个容器

```sh
docker container rm CONTAINER_ID
```

## 镜像

- 查看镜像列表

```sh
docker images

```

- 删除某个容器

```sh
docker image rm IMAGE_ID
```

## 日志

- 查看日志

```sh

docker logs CONTAINER_ID

```

- 实施查看信息

> -f 实时信息
> -t 显示时间戳

```sh 
docker logs CONTAINER_ID -f -t

```

(外链 - docker logs－查看docker容器日志)[https://www.jianshu.com/p/1eb1d1d3f25e]

## docker compose

- 构建

```sh
docker-compose build 
```

- 启动

```sh
docker-compose up -d
```

- 停止并删除容器

```sh
docker compose down
```

## 持久化

