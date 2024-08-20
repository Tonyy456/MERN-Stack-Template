### Create DigitalOcean Droplet and follow prompt selection below

- [ ]  choose best region & datacenter for you
- [ ]  choose Ubuntu and latest version
- [ ]  choose regular $6/mo app
- [ ]  generate ssh key or select previous ssh key
- [ ]  add monitoring and ipv6

### Setup ssh config at ~/.ssh/config

- [ ]  enter the following
    
    ```jsx
    Host website
    HostName IP
    User    root
    IdentityFile ~/.ssh/PRIVATE_KEY
    ServerAliveCountMax 3
    ServerAliveInterval 9999
    ```
    

### ssh into droplet and set up user

- [ ]  run the following commands

```bash
adduser tony
sudo usermod -aG sudo tony
su - tony
```

- [ ]  set up authorized keys

```bash
cd ~
mkdir .ssh
touch .ssh/authorized_keys
chmod 700 .ssh
chmod 644 .ssh/authorized_keys
# copy public ssh key into above file from local computer
```

- [ ]  update LOCAL computer .ssh/config. Change ‘User’ to your user name.

### install server software

- [ ]  node, npm, nginx

```bash
# installing node
sudo apt update
sudo apt install nodejs
node -v
sudo apt install npm
# install nginx
sudo apt install nginx
sudo ufw allow 'Nginx HTTP' # configure firewall privledges
systemctl status nginx
cd /var/www
sudo mkdir WEBSITE
```

### Configure Github Actions

- [ ]  Allow sudo commands for runner. open `/etc/sudoers.d/tony` with sudo

```bash
tony ALL=(ALL) NOPASSWD: /usr/sbin/service nginx start,/usr/sbin/service nginx stop,/usr/sbin/service nginx restart
```

### Install a github runner to your github repo fork

- [ ]  go to repo→settings→actions→runner→new self hosted runner
- follow instructions using the folder made in the last step as replacement to the folder they make.
- use sudo in almost all instances
- run this command after unzipping the folder so the setup works with proper permissions. `sudo chmod -R 777 /var/www/WEBSITE/`
- [ ]  run the following code

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

### Configure NGINX

- [ ]  open in a text editor: `/etc/nginx/sites-available/default` and make the contents the following instead.

```bash
# /etc/nginx/sites-available/default
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/WEBSITE/_work/MERN-Stack-Template/MERN-Stack-Template/;
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                proxy_pass https://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

- [ ]  Create a better 404 page

```bash
sudo vi /var/www/html/404.html
```

- [ ]  Dump the following code in

```bash
<!DOCTYPE html>
<html>
<head>
    <title>404 - Page Not Found</title>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
</body>
</html>
```

- [ ]  Test configuration

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Give swap space to server.

- [ ]  ^^

```bash
sudo swapon --show
free -h 
df -h
sudo fallocate -l 1G /swapfile
ls -lh /swapfule
sudo chmod 600 /swapfile
ls -lh /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
free -h
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
sudo vi /etc/sysctl.conf # insert at bottom of file vm.swappiness=10
```

### setup pm2 dependency

- [ ]  Do the following, replace REPO with the name of your repository.

```bash
sudo npm install pm2@latest -g;
cd /var/www/WEBSITE/_work/REPO/REPO/backend;
pm2 start npm --name "website" -- run start;
pm2 save;
sudo service nginx restart;
```

### Setup environment file on server
- [ ] edit .github/workflows and insert the location of your .env file on the server
```
    - name: Insert Environment Variables
      run:
        cp [[ENV FILE LOCATION]] ./backend/.env
```
- [ ] insert the following as your .env. Do this both for the above file and ./backend/.env on your local machine
```
MONGODB_URI=
DB_NAME=
ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRES_IN=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRES_IN=

AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
AWS_BUCKET_ACCESS_KEY=
AWS_BUCKET_SECRET_ACCESS_KEY=

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=

EMAIL_API=

STRIPE_PUBLIC_KEY=
STRIPE_PRIVATE_KEY=
STRIPE_WEBHOOK_SECRET_KEY=

AWS_BUCKET_NAME=
AWS_BUCKET_ACCESS_KEY=
AWS_BUCKET_SECRET_ACCESS_KEY=
AWS_BUCKET_REGION=
```

### Create MongoDB Cluser and setup environment vars

- [ ]  Create a cluster, follow prompts to get URI with username and password and set MONGODB_URI
- [ ]  copy `backend.env` to the server location at `~/backend.env`
