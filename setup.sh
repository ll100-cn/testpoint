#!/usr/bin/env bash

set -ex

rm -rf public/uploads
cp config/redis.yml.example config/redis.yml
cp config/database.yml.example config/database.yml
