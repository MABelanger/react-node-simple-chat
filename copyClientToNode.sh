CURREND_DIR=$(pwd)

# delete public folder
cd $CURREND_DIR
rm -rf node/public/
echo 'delete public folder done...'

# copy the main/build into public folder
cd $CURREND_DIR
cp -R react/packages/main/build node/public
echo 'update public folder done...'
