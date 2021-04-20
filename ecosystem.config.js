module.exports = {
    apps: [
        {
            name: 'new-dream',
            script: 'npm',
            args: 'run start:production', // cluster mode 根据cpu个数启动最大进程数量 
            instances: 0,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_production: { NODE_ENV: 'production' }
        }
    ],
    deploy:
    {
        production:
        {
            user: 'root',//服务器用户名 
            host: '106.15.230.101',//服务器ip 
            ref: 'master',
            repo: 'git@github.com:failedUser/nd-managment.git',
            path: '/var/www/nd',//项目部署到服务器目录 
            ssh_options: ['ForwardAgent=yes'], 'post-deploy': 'git pull origin master && npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};