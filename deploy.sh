#!/bin/bash
# Deploy to GitHub Pages

echo "Building project..."
npm run build

echo "Deploying to gh-pages..."
cd dist
git init
git add -A
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git branch -M gh-pages
git remote add origin https://github.com/edmundbogen/comet-browser-mastery.git
git push -f origin gh-pages

echo "Deployment complete!"
echo "Visit: https://edmundbogen.github.io/comet-browser-mastery/"
