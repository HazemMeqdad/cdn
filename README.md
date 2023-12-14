# cdn

You can upload your images & videos & other files to your server and use the interface & api.
I know the forntend is trash but this i can do 

## Pages
- `/` - home page
- `/logout` - logout page
- `/auth` - redirect to github auth page
- `/github/callback` - redirect from github to website and it call github api to fetch user
- `/upload` - has two methods. GET the interface of upload page. POST is api to upload files
- `/files` - open your files
- `/files/:file` - has two methods. GET method open file. DELETE method to delete file using api
- `/f/:file` - open file
- `/d/:file` - download file
- `/files/:file/public` - PATCH method to change visible of file

## Installation
### Running on localhost (Testing mode)
make sure you are create `.env` file and config the porject
```
npm i
node .
```
### Running using docker (recommended)
make sure you are create `.env` file and config the porject and setup mongodb configration
```
docker compose build
docker compose up -d
```

## Images
notice: If this images doesn't open maybe the host was broken
<img src="https://cdn.hazemmeqdad.com/f/Screenshot from 2023-12-15 02-07-11.png">
<img src="https://cdn.hazemmeqdad.com/f/Screenshot from 2023-12-15 02-08-23.png">
<img src="https://cdn.hazemmeqdad.com/f/Screenshot from 2023-12-15 02-09-03.png">
