## Building the image
In order to build the docker image, run the following command in the root folder of the website repository:
```bash
docker build -t development_website -f docker/development_website/Dockerfile .
```

## Running a container
### Ubuntu
In order to generate and serve the website at `http://localhost:4000`, run the following command in the root folder of the website repository:
```bash
docker run --rm --network=host -v .:/root development_website
```

### Apple (OsX)
In order to generate and serve the website at `http://localhost:4000`, run the following command in the root folder of the website repository:
```bash
docker run --rm --publish 0.0.0.0:4000:4000 -v .:/root development_website
```
