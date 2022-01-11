
docker rm `docker ps -aq`

docker build -t reactapp .

docker run -it --rm  -p 3000:3000 -v $PWD:/user/src/app reactapp