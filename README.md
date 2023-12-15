New Instructions


To Start Frontend with Docker locally

Make sure Docker Desktop is running

docker compose  up --build 

docker build -t frontend --no-cache .

docker run -it -p 3000:3000 frontend 

Your frontend should be live. Visit http://localhost:3000 to see it.