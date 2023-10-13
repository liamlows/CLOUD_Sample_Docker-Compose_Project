#!/usr/bin/env bash

# install new dependencies if any
npm install

# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt

echo "Starting API server"

npm start