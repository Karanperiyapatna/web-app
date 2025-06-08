#!/bin/bash

# Define your custom log folder
LOG_FOLDER="/home/ubuntu/web-app/logs"

# Create the folder if it doesn't exist
mkdir -p $LOG_FOLDER

# Install pm2-logrotate if not already installed
pm2 install pm2-logrotate

# Set daily log rotation
pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

# Keep logs for 30 days
pm2 set pm2-logrotate:retain 30

# Set max log size before rotating
pm2 set pm2-logrotate:max_size 10M

# Enable compression (optional)
pm2 set pm2-logrotate:compress true

# Restart your app to apply log path (ONLY IF YOU WANT — otherwise ignore below)
# pm2 restart my-react-app

echo "PM2 Logrotate configured. Make sure your app is logging to: $LOG_FOLDER"

