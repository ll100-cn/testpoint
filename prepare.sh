#!/usr/bin/env bash

set -ex

bundle exec rake db:create
bundle exec rake db:migrate
pnpm --dir www install
pnpm --dir www run generate
rm -rf public/_nuxt public/200.html
cp -R www/.output/public/. public/
