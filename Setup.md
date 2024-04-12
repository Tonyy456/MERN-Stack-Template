# Template APP setup todo

1. Create DigitalOcean Droplet and follow prompt selection below
    - [ ]  choose best region & datacenter for you
    - [ ]  choose Ubuntu and latest version
    - [ ]  choose regular $6/mo app
    - [ ]  generate ssh key or select previous ssh key
    - [ ]  add monitoring and ipv6
2. Setup ssh config at ~/.ssh/config
    - [ ]  enter the following
        
        ```jsx
        Host website
        HostName IP
        User    root
        IdentityFile ~/.ssh/PRIVATE_KEY
        ServerAliveCountMax 3
        ServerAliveInterval 9999
        ```
        
3. ssh into droplet and set up user
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
4. install server software
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
    
5. Install a github runner to your github repo fork
    - [ ]  go to repo→settings→actions→runner→new self hosted runner
    - follow instructions using the folder made in the last step as replacement to the folder they make.
    - use sudo in almost all instances
    - [ ]  run the following code
    
    ```bash
    chmod -R 777 /var/www/WEBSITE/
    sudo ./svc.sh install
    sudo ./svc.sh start
    ```
    
6. Configure NGINX
    - [ ]  open in a text editor: `/etc/nginx/sites-available/default`
    - [ ]  add `root /var/www/WEBSITE/_work/REPO/REPO/;` under ‘server’ object
    - [ ]  add the following code under server.location
    
    ```bash
    proxy_pass https://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    ```
    
7. Configure Github Actions
    - [ ]  Allow sudo commands for runner. open `/etc/sudoers.d/tony` with sudo
    
    ```bash
    tony ALL=(ALL) NOPASSWD: /usr/sbin/service nginx start,/usr/sbin/service nginx stop,/usr/sbin/service neginx restart
    ```
    
8. Give swap space to server.
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
    
9. setup pm2 dependency
    - [ ]  ^^
    
    ```bash
    sudo npm install pm2@latest -g;
    cd /var/www/WEBSITE/_work/REPO/REPO/backend;
    pm2 start npm --name "website" -- run start;
    pm2 save;
    sudo service nginx restart;
    ```