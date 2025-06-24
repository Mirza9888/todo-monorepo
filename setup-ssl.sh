#!/bin/bash

echo "Setting up SSL certificates for TODO application..."

# Create directories if they don't exist
sudo mkdir -p certbot/conf/live/todo

# Generate self-signed certificates for development
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout certbot/conf/live/todo/privkey.pem \
    -out certbot/conf/live/todo/fullchain.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=todo"

# Set proper permissions
sudo chown -R $USER:$USER certbot/

echo "SSL certificates created successfully!"
echo "You can now use HTTPS at https://localhost:8443"
echo ""
echo "Note: These are self-signed certificates for development only."
echo "Your browser will show a security warning that you can safely ignore."
echo ""
echo "To start the application:"
echo "docker compose up -d" 