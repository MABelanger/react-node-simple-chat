CURREND_DIR=$(pwd)

# build chat module
cd react/packages/chat
yarn build
echo 'build chat module done...'

# build main module
cd $CURREND_DIR
cd react/packages/main
yarn build
echo 'build main module done...'
