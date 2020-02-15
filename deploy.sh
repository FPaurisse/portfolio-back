cd /var/www/portfolio/portfolio-back/
git pull
git commit -a
npm install --only=production
pm2 start npm -- start