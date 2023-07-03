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

```
volumes:
    - myapp:/home/data
```

使用 docker volume
> 通过 docker-compose 中配置路径，在容器中指定目录保存时，可以同步到外部
> 当容器销毁重建时，会从指定路径中恢复，从而达到恢复数据的目的
> 外部路径可以通过 volume inspect 查看，可以修改或者转移

- 查询列表

```sh
docker volume ls
```

- 查看具体 volume 信息

```sh
docker volume inspect VOLUME_ID
```

- 删除

```sh
docker volume rm VOLUME_ID
```