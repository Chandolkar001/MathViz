
docker rm `docker ps -aq`

docker build -t pythonapp .

docker run -it --rm  -p 5001:5001 -v $PWD:/app pythonapp