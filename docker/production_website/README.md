## Building the image
In order to build the docker image, run the following command in the root folder of the website repository:
```bash
docker build -t production_website -f docker/production_website/Dockerfile .
```

## Running a container
In order to generate the production version of the website, run the following command in the root folder of the website repository:
```bash
docker run --rm  -v .:/root production_website
```

