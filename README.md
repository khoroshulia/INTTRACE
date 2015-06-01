# INTTRACE
advanced error logging for production

## Dependencies
```
npm install -g grunt-cli
npm install -g typescript
npm install -g tsc
npm install -g tsd
```

## Run
### Client
#### JS
To compile sources:
```
grunt sdk-js
```

### Server
To run server install typescript typings:
```
grunt server-initiate
```


## Server
### Routing

Use **routes.json** file to add your own route:

```
{
    "get /users users.getUsers": ["request-logger"]
}

```

Each item means next:

```
"{{request_type}} {{request_url}} {{controller.method}}" : [{{middleware}}]
```

* **request_type** - request type, e.g. **get**, **post**, **delete**, **put** etc.
* **request_url** - request url, e.g. **/users**
* **controller.method** - controller and controller's method, e.g. **index.getUsers**,
    controller name should be the same with name of the controller in **controllers** folder
* **middleware** - middleware, e.g. **request_logger**, middleware's name should be the same
    with name of the middleware file in **middleware** folder

### Compilation
There are two main grunt tasks to generate server sources:
Compile once
```
grunt server-compile
```

Compile once and watch
```
grunt server-watch
```

Or you can specify typescript watcher for WebStorm