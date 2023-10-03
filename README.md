# cdn

You can upload your images & videos & other files to your server and use the perfic api.
I know the forntend is trash but this i can do 

## Pages
- `/` - home page
- `/login` - login page
- `/show` - show what is you uploaded it
- `/uploads/<user_id>/<filename>` - open file

## API
Please show the code to know what are required fileds 
- `/api/upload` - POST method to upload file with add file to form (required authorization)
- `/api/delete` - DELETE method to remove file (required authorization)
- `/api/user` - GET method to get user info with id like http://my-host/api/user?id=123
- `/api/user/uploads` - GET method to get uploads user (required authorization)
- `/api/auth/register` - POST method to register new account
- `/api/auth/login` - POST method to get your token need username & password

## Authorization
The headers must be add 
```json
"Authorization": "Bearer <your-token>"
```

# Privacy
privacy of passwords it save with hash md5 no body can know your password
