# Welcome to react native starter kit 👋

This project is using 
- [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app)
- [React native Reusables](https://github.com/mrzachnugent/react-native-reusables) as UI library using [nativewind](https://www.nativewind.dev/)
- [https://supabase.com/](https://supabase.com/) for the database an auth

## Setting up: 

You need to have a supabase database and update the `.env` with the related links to get the project up. 

As for the database you can start with [supabase template](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native#set-up-the-database-schema), user management script, and run it to work with that. 

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Env variables](https://docs.expo.dev/guides/environment-variables/)
- [Expo + Supabase](https://docs.expo.dev/guides/using-supabase/)
- [Pages and router](https://docs.expo.dev/router/create-pages/)

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
