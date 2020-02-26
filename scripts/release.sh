TOKEN=$1

touch .npmrc
echo "//npm.pkg.github.com/:_authToken=$TOKEN" >> .npmrc
echo "registry=https://npm.pkg.github.com" >> .npmrc
npm publish
