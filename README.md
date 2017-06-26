The app is based on `create-react-app` script
[https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)


## Clone the repo

`git clone https://github.com/City-of-Turku/living-environment-ui.git`

## Configuration files

In development app is reading the settings from `/src/config/config.dev.json`. For production mode, the settings from `/src/config/config.dev.json` are used.<br>

`api/baseUrl` should point to backend API base url (for ex. http://localhost:8000/api)<br>
`api/timeout` sets the request timeout given in milliseconds<br>
`backendImages` points to the base address of the images<br>

### `npm install`

This command will install all app dependencies.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

The command creates a `build` directory with a production build of your app.<br>

### Static Server (testing the output of `build` command)

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

# nginx server

Install nginx server<br>

Copy the content of the build folder to the Nginx application folder<br>

```sh
mkdir /var/www/app
cp -a /path/to/living-environment-ui/build/. /var/www/app/
```

Setup the nginx config

```sh
root /var/www/app
location /api/ {
    proxy_pass http://django-rest:8000/api/;
}
location / {
    try_files $uri $uri/ /index.html;
}
```
