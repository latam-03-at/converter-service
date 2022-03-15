#! /bin/bash

#variables
#1= container name
#2= current build number

containerName=$1
previousBuildNumber=$(($2-1))

if [ "$(docker ps -aq -f name=$containerName)" ] ; then
    if [ "$(docker ps -aq -f status=exited -f name=$containerName)" ] ; then
        echo "--> remove the converter container"
        docker rm $containerName
    fi
    if [ "$(docker ps -aq -f status=running -f name=$containerName)" ] ; then
        echo "--> stop and remove the converter container"
        docker stop $containerName
        docker rm $containerName
    fi

    docker rmi -f $(docker images -a | grep "converter")
    
    docker run --restart=always -d --name converter \
    -p 9094:9094 \
    -e PORT=9094 \
    -e MONGO_URI=mongodb://mongo/ \
    -e MONGO_DB=upload \
    -e URL=/api/v1/ \
    -e URLBASE=http://20.25.119.241: \
    -e FORMATS_SUPPORTED_VIDEO="['mov', 'm4a', '3gp', '3g2', 'mj2', 'mp4']" \
    -e FORMATS_SUPPORTED_IMAGE="['jpeg', 'png', 'jpg']" \
    -e FORMATS_SUPPORTED_DOC="['docx']" \
    --network mongodbdev_infranet \
    dilanof/converter-service:$2
    
else
echo "--> create the first converter container"
    docker run --restart=always -d --name converter \
    -p 9094:9094 \
    -e PORT=9094 \
    -e MONGO_URI=mongodb://mongo/ \
    -e MONGO_DB=upload \
    -e URL=/api/v1/ \
    -e URLBASE=http://20.25.119.241: \
    -e FORMATS_SUPPORTED_VIDEO="['mov', 'm4a', '3gp', '3g2', 'mj2', 'mp4']" \
    -e FORMATS_SUPPORTED_IMAGE="['jpeg', 'png', 'jpg']" \
    -e FORMATS_SUPPORTED_DOC="['docx']" \
    --network mongodbdev_infranet \
    dilanof/converter-service:$2
fi
