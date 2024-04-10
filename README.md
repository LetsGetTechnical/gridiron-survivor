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
pnpm i
```

Run Storybook in the project root

```
npm run storybook
```

## Prettier

Install dependencies if you have not done so already.

```
pnpm i
```

Search for and open `settings.json` by pressing `cmd+shift+p` on MacOS or `ctrl+shift+p` on Windows.

> [!IMPORTANT]
> There may be multiple options, ensure you select the option that says "Open User Settings (JSON)

![Screenshot of VS Code search results for "settings.json" with the User Settings JSON option highlighted.](https://media.cleanshot.cloud/media/29651/cu0AZRDB79fDcMFTlwKi2oflb6xJsE6bz6DDJkV0.png?Expires=1712733698&Signature=K2w6UFCuT4~IgJehpdMyyR~CXwIAG4HzXeNRT1eRVbmpaciBN3vCLG474LyW3o9lheLPVIUW7RhBcMxpXPJr7-uzr6j-~e4E6EGQ4TLyWGwJ2JBoNCf6kdNGF3Oul-YwtE73BO2jFnq3XX3kV9a88vK0FMel4WPVXrP9TjLLPE8VRuloNgxHP1vbFZe6-pi7Wn7t0x7je2hnjIef4FikKoKzJm5aC1JySAH-gnTqD9JrN-R01p3rBN6w92Tb~fQyopC0dqdxSagh88mPIZP9i~SDZD-aNnwSd~Yt85VuB0XbrCJWY6m20MXupLg-fAoeO9sDQ8Eb4ZZHzcv8V4WSVQ__&Key-Pair-Id=K269JMAT9ZF4GZ)

Add the following lines to your `settings.json`

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

Open a file and save it, you should see formatting changes made as soon as you save it!
