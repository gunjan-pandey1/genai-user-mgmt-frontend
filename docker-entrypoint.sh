#!/bin/sh

# Railway provides PORT environment variable
# We need to update nginx to listen on that port
if [ -n "$PORT" ]; then
    echo "Using PORT: $PORT"
    sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/conf.d/default.conf
fi

# Execute the CMD
exec "$@"
