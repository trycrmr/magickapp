Foreward: At this time this program has only been used on Ubuntu 18.04.4 with Node.js 13.9.0. Open a PR to provide backwards compatible support for other set ups. 

## Instructions
- Install imagemagick 6: https://legacy.imagemagick.org/script/download.php
- Install Node 13.9.0 https://nodejs.org/download/release/v13.9.0/ . The initial build of this uses the import syntax instead of require, which is a new experimental feature introduced for modules sometime in Node 13. Don't be surprised if you try to use this with another version of Node and receive issues about using import instead of require. At this point there are no external modules to install or tests to run. 
- Git pull this repo and navigate to this repo's directory on your local machine
- You're good to follow the "Use" options on the README! 