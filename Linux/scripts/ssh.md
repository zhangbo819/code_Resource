## Mac 使用SSH远程登录 ssh scp
https://blog.csdn.net/jymn_chen/article/details/39931469


## 使用公钥登录

1. 生成公钥
   
    ```
    ssh-keygen -t rsa

    ```

2. 将公钥放到服务器上 (将本地生成的公钥拷贝到远程服务器的下并改名为authorized_keys)

    ```
    scp ~/.ssh/id_rsa.pub 用户名@你的服务器的ip:~/.ssh/authorized_keys
    ```