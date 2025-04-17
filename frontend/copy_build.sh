# copy_build.sh
#!/bin/bash

# Remove old files
rm -rf ../backend/static/assets
rm -f ../backend/templates/index.html

# Copy new files
cp -r ./dist/assets ../backend/static/
cp ./dist/index.html ../backend/templates/
