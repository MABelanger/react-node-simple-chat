# react-node-simple-chat

### clone repo
```
$ git clone https://github.com/MABelanger/react-node-simple-chat
```

### Install dependency
```
$ cd node && yarn
$ cd ../react && yarn
```

### Build client react /public folder
```
$ ./buildClient.sh
$ ./copyClientToNode.sh
```

### run server
```
$ cd node
$ yarn server
```

### connect to browser1
for user1 : http://localhost:5000/ -> user/password : user1/user1

### connect to browser2 (inconito)
for user2 : http://localhost:5000/ -> user/password : user2/user2

### Overwrite with .env (dotenv) of the node/
You can overwrite the port and user/password credential list.
create file ./node/.env and add `PORT` and `USERS` variable to the env.

Example of .env :
```
NODE_ENV=production
PORT=5001
USERS=[{"id":"0","username":"bob","password":"bob"},{"id":"1","username":"alice","password":"alice"}]
```

### Todo
add into .env HTTPS=true, PROXY=true
