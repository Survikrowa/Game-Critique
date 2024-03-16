
<img src='https://i.ibb.co/CmD8bps/app-icon.png' width='128'>

# Game Critique

This project is a mobile application designed to help users track their game collections and manage the games they've played, are currently playing, or have retired. It provides features for users to invite friends and view their collections as well.

## Installation

Install all required game-critique packages with Yarn

```bash
  yarn
```

Create .env file in /api based on the .env-example

Create .env.local file in /native based on the .env.local-example

Create eas.json file based on the eas-example.json and fill all required envs there. Its mostly used for production ready builds.

To launch the app connect your mobile device, enable usb debugging and type in your terminal

```bash
  yarn start
```
## Tech Stack

**Mobile:** Expo, TypeScript, ExpoRouter, Tamagui, Apollo

**Server:** Node, TypeScript, NestJS, Prisma, PostgreSQL, Apollo


## Authors

- [@survikrowa](https://www.github.com/Survikrowa) Mobile/BE

- [@critteros](https://github.com/Critteros) - DevOps
## License

[MIT](https://choosealicense.com/licenses/mit/)

