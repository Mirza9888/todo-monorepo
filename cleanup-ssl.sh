#!/bin/bash

echo "Cleaning up SSL certificates..."

# Remove SSL certificates
sudo rm -rf certbot/conf/live/

echo "SSL certificates removed successfully!"
echo "Run ./setup-ssl.sh to regenerate certificates." 