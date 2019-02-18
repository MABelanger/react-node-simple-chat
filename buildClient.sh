CURREND_DIR=$(pwd)

# build audio-recorder  module
cd $CURREND_DIR
cd react/packages/audio-recorder 
yarn build
echo 'build audio-recorder module done...'

# build chat module
cd $CURREND_DIR
cd react/packages/chat
yarn build
echo 'build chat module done...'

# build main module
cd $CURREND_DIR
cd react/packages/main
yarn build
echo 'build main module done...'
