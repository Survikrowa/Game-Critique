
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

**Note:** The native app uses **Expo Prebuild** workflow. Native folders (`android/`, `ios/`) are generated automatically and not tracked in git. If you need them locally, run `yarn prebuild` in `apps/native`. See `apps/native/PREBUILD_MIGRATION.md` for details.

To launch the app connect your mobile device, enable usb debugging and type in your terminal

```bash
  yarn dev:native
```

Or for web + api:

```bash
  yarn dev:web
```
## Tech Stack

**Mobile:** Expo, TypeScript, ExpoRouter, Tamagui, Apollo, GraphQLCodegen, Auth0

**Server:** Node, TypeScript, NestJS, Prisma, PostgreSQL, Apollo, Sentry, Auth0, Cloudinary


## Authors

- [@survikrowa](https://www.github.com/Survikrowa) Mobile/BE

- [@critteros](https://github.com/Critteros) - DevOps
## License

[MIT](https://choosealicense.com/licenses/mit/)

