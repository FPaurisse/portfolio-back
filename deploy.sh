cd /var/www/portfolio/portfolio-back/
git commit -m "Deployed"
git pull
npm install --only=production
pm2 start npm -- start