#!/usr/bin/env bash
echo -e '['`date +"%Y-%m-%d %H:%M:%S"`'] Start deploy.'

e=$1

# if [[ $e == "pro" ]]; then
#     host=jmart.qixin.io
# fi

host=jmart8.qixin.io

if [[ $e == "pro" ]]; then
    host=jmart8-prod.qixin.io
fi

yarn install
npm run build

# read -p "Run Build Script? (y/n): " param

# if [ $param = "y" ]; then
#     npm run build
# fi

echo -e '['`date +"%Y-%m-%d %H:%M:%S"`'] 编译完成.'
cd dist
rm -rf dist.zip
zip -r dist.zip *
scp dist.zip me@${host}:/var/www/jmart8-web/
ssh me@${host} "cd /var/www/jmart8-web && unzip -o -d dist dist.zip"
if [ $? -ne 0 ]; then
    echo -e '['`date +"%Y-%m-%d %H:%M:%S"`'] Deploy failure.'
else
    echo -e '['`date +"%Y-%m-%d %H:%M:%S"`'] Deploy success.'
fi
