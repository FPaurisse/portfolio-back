cd /var/www/portfolio/portfolio-back/
git reset --hard
git pull
npm install --only=production
pm2 start npm -- start