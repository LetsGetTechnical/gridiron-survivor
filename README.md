# LGT GridIron Project

## Table of contents

- [Setup](#setup)
  - [Installing Docker](#make-sure-docker-compose-is-installed)
  - [Test Docker](#command-to-test-docker-in-your-terminal)
  - [Login to Docker Hub](#login-to-docker-hub)
  - [Start/Stop Project](#commands-to-start-the-project)
  - [Useful Commands](#useful-docker-commands)

## Setup

### Make sure Docker Compose is installed

For Linux, Mac, and Windows: [Docker Desktop ](https://docs.docker.com/desktop/install/linux-install/)

### Command to test Docker in your terminal

Use this command to run Docker hello-world image

```
docker run hello-world
```

### Login to github

generate a token from github container registry:

`github:`

- go to settings
- Click on developer settings at the bottom
- Click on personal access tokens tab
- Click on Tokens (classic)
- Click on generate new Token (classic)
- Enable the settings: write:packages and delete:packages
- Give it a name then generate the token

Enter your username and token (as a password) using the following flags, either for GitHub Container Registry or Docker
Hub.

```
echo "YOUR_PERSONAL_ACCESS_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

## Commands to start the project

All the commands you need to start and stop the project are here in this section.

Start the project by using this command to pull the built image and run it in a container:

```
docker compose up app-dev
```

Stop the project and remove the container created:

```
docker compose down app-dev
```

`Note: After running docker compose down the image you pulled will still exist on your local computer`

`Note: For production you just replace app-dev with app-prod`

## Useful Docker commands

See all docker images

```
docker image ls
```

See all docker containers

```
docker ps -a
```

Remove an image

```
docker rmi image_name_or_ID
```

Remove a container

```
docker rm container_name_or_ID
```

## Storybook

Install dependencies

```
pmpm i
```

Run Storybook in the project root

```
npm run storybook
```
