<br />

![GitHub repo size](https://img.shields.io/github/repo-size/wiaandev/SerenGuard?color=orange)
![GitHub watchers](https://img.shields.io/github/watchers/wiaandev/SerenGuard?color=orange)
![GitHub language count](https://img.shields.io/github/languages/count/wiaandev/SerenGuard?color=orange)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wiaandev/SerenGuard?color=orange)
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Instagram][instagram-shield]][instagram-url]

<h5 align="center" style="padding:0;margin:0;">Wiaan Duvenhage</h5>
<h5 align="center" style="padding:0;margin:0;">200307</h5>
<h6 align="center">DV300 | Term 4</h6>
</br>
<p align="center">

  <a href="https://github.com/wiaandev/SerenGuard">
    <img src="src/assets/rounded-icon.png" width="100px">
  </a>

<h3 align="center">SerenGuard</h3>

  <p align="center">
    A mobile application that helps officers better label their crime reports with AI, whilst informing the public<br>

   <br />
   <br />
    ·
    <a href="https://github.com/wiaandev/SerenGuard/issues">Report Bug</a>
    ·
    <a href="https://github.com/wiaandev/SerenGuard/issues">Request Feature</a>
</p>
<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Project Description](#project-description)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How to install](#how-to-install)
- [Features and Functionality](#features-and-functionality)
- [Concept Process](#concept-process)
  - [Wireframes](#wireframes)
- [Development Process](#development-process)
  - [Implementation Process](#implementation-process)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#peer-reviews)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
- [Conclusion](#conclusion)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->

## About the Project

<!-- header image of project -->

![image1][image1]

### Project Description

SerenGuard is the perfect app for officers to create a close connection with their community with keeping their community up to date with reports in the area. That can range anything from smash and grabs to arson. Officers would be able to submit reports and AI would assist in labelling the images from the reports, civilians would be able to view these reports be informed to stay away from these marked locations on the map. 

## DISCLAIMER
```diff
- The SerenGuard application is designed to enhance personal safety and security by providing users with tools and
- information for their safety. While we encourage the community to utilize this platform for sharing information
- related to their safety concerns, we want to make it clear that the SerenGuard application is not a reliable source
- for accurate crime reporting in your area.
```

### Built With

[<img src="https://seekicon.com/free-icon-download/expo_2.svg" width="4%" height="4%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;](https://expo.dev/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="4%" height="4%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;](https://reactnative.dev/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" width="4%" height="4%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;](https://firebase.google.com/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" width="4%" height="4%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;](https://cloud.google.com/)

<!-- GETTING STARTED -->
<!-- Make sure to add appropriate information about what prerequesite technologies the user would need and also the steps to install your project on their own mashines -->

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development, the latest version of Android Studio is required. The latest version can be downloaded from [Android Studio](https://developer.android.com/studio?gclid=CjwKCAjwuYWSBhByEiwAKd_n_q4WXi5vcCji08peoWOEsv-KHFT7QWNZNmozB_CIiiSNl_HOUL-1JBoCGx8QAvD_BwE&gclsrc=aw.ds)

### Installation

1. Clone the repo

```sh
git clone https://github.com/wiaandev/SerenGuard.git
```

2. Open the project

Locate and drag file into Visual studio code.

3. Install Node on machine
   Visit https://nodejs.org/en/download and install the latest version of node for your system

4. Install Yarn
   ```sh
   npm install --global yarn
   ```
   or
   ```sh
   sudo npm install --global yarn
   ```

3. Install Packages
```sh
yarn install
```

4. Run Project
```sh
yarn ios
```

5. Download Expo Go on Android or iOS
- [iOS](https://apps.apple.com/us/app/expo-go/id982107779)
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)

5.1 You can also run the iOS simulator or Android emulator. NOTE: Android studio is required for the Android emulator
- For Android Emulator

```sh
expo run:android 
```

- For iOS simulator

```sh
expo run:ios 
```

<!-- FEATURES AND FUNCTIONALITY-->
<!-- You can add the links to all of your imagery at the bottom of the file as references -->

## Features and Functionality

<!-- note how you can use your gitHub link. Just make a path to your assets folder -->

### Register & Login Account

![image3][image3]
Users can create their account and sign up as either officers or civilians. When you register as an officer you need to have a valid Officer ID and you need to select your rank as an officer. All users would be authenticated and registered on Firestore with a default blue profile image.

### Onboarding

![image4][image4]
When users load onto SerenGuard for the very first time. They would need to go through an onboarding process that explains to them what SerenGuard is all about and some key features about the application

### Viewing Reports

![image2][image2]
Users would be able to view reports made by other officers that would be pinned on the map. Users would be able to tap on a pin so they can read more information about the reports

### Searching for neighbourhoods

![image6][image6]
If a user wants more information about what's going on in their neightbourhood. They can search for their neighbourhood which would take them to a seperate screen where they can view an overview of their neighbourhood and see statistics like the most reported crime and the total amount of reports in their area.

### Adding Reports

![image8][image8]
As an officer, you have the ability to add reports. Which will add a report based on your phone's current location and pin it to the map. The AI will analyse your uploaded image of your report and append labels to it.

<!-- CONCEPT PROCESS -->
<!-- Briefly explain your concept ideation process -->
<!-- here you will add things like wireframing, data structure planning, anything that shows your process. You need to include images-->

## Concept Process

I've put a lot of thought into the look feel and aesthetic of SerenGuard. I felt like a dark-mode application would be the best choice considering I am developing a crime-reporting application. I also wanted to pick a color to go with my dark-mode application and I first decided on red but a peer pointed it out that it may have been too aggressive, so they suggested orange and I thought that it was an amazing choice because it's not too difficult on the eyes and still maintains that strong accent that is easy to catch in a dark-mode application.

### Wireframes

![image13][image13]

### Firestore Database Structure

![image9][image9]

### User Flow

![image10][image10]

## Development Process

The `Development Process` is the technical implementations and functionality done for the app.

### Implementation Process

For the entirety of the project, I have used <b>Expo CLI</b> and the entire project was built in JSX. For my front-end I have utilised React Native Elements, UI Toolkit for cross-platform development. All the UI elements seen on my application was built and implemented using React Native Paper.

#### Front-End

- I used `react-native-maps` package and its `<MapView/>`, `<Callout/>` and `<Marker/>` API's to show the map, markers and callouts of each report.

- Using a `<FlatList/>` I was able to map my data from my Cloud Firestore database to my front-end.

- I used a `<SafeAreaView>` to prevent my front-end from going above the screen and into the status bar.

##### Navigation
- I have made use of a Stack and Tab Navigation during the development of my application.
- In my `App.tsx` I created my stack navigation with the `createNativeStackNavigator()` method.
#### Firebase

- I created a `firebaseAuth.js`, `firebaseDb.js` & `firebaseStorage.js` which held all the back-end functionality and API calls I made with my application.
- In my `firebaseAuth.js` I handled all my data in regards with signing up and logging in a user and getting the currently logged in user.
- In my `firebaseDb.js` I handled all my data in regards with the CRUD functionality of the application
- In my `firebaseStorage.js` I handled my image uploading functionality
- Using `createContext()` and `useContext()` hooks in conjunction with wrapping my `App` with a `<Provider>` element  from React I was able to pass state down to any component and then just calling the firestore functions inside of the context files.

#### Highlights

<!-- stipulated the highlight you experienced with the project -->

- Implementing google maps into my project
- Working with Google Cloud!
- Showcasing my pins based on my reports
- Creating a regex that checks for a certain officer ID pattern, otherwise it would not register the officer to the database.
- Creating a cool application that solves a certain aspect of a social problem in South Africa!

#### Challenges

<!-- stipulated the challenges you faced with the project and why you think you faced it or how you think you'll solve it (if not solved) -->

- Signing in with Google was a big pain-point. It would sometimes sign me in and other times not. In the future I could maybe add it in a context.
- I struggled a lot with the onboarding because my AsyncStorage get() method kept returning undefined, which resulted in the user having to go through the onboarding process every time. To address this issue, I will explore an alternative async storage package that could help save the user's state and determine if they had launched the application before.

### Future Implementation


<!-- stipulate functionality and improvements that can be implemented in the future. -->

- Adding Sign in with google
- Removing Reports
- Adding heatmaps to my application
- Creating my own custom AI model that will help with labelling crime scenes
- Adding a admin role that will approve reports
- Adding notifications when new reports have been added
- Adding AI generated content for each neighbourhood based on report type and total amount of reports

<!-- MOCKUPS -->

## Final Outcome

### Mockups

<!-- TODO Change this -->

![image2][image2]
![image3][image3]
![image4][image4]
![image5][image5]
<br>


<!-- AUTHORS -->

## Authors

- **Wiaan Duvenhage** - [Github](https://github.com/wiaandev)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.\

<!-- LICENSE -->

## Contact

- **Wiaan Duvenhage** - [wiaanduvenhage.dev@gmail.com](mailto:wiaanduvenhage.dev@gmail.com) - [@wiaan.dev](https://www.instagram.com/wiaan.dev/)
- **Project Link** - https://github.com/wiaandev/SerenGuard

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

<!-- all resources that you used and Acknowledgements here -->
<!-- TODO Change this -->

- [Stack Overflow](https://stackoverflow.com/)
- [Expo Location](https://www.youtube.com/watch?v=d7G0E_9FwyE&t=396s)
- [Figma](https://www.figma.com/)
- [Lecturer](https://github.com/armandpret)
- [Anthony Boyd Mockups](https://www.anthonyboyd.graphics/mockups-collection/)
- [unDraw](https://undraw.co/)
- [Uploading Media to Firebase Storage](https://www.youtube.com/watch?v=syK7ZSnmRUk&ab_channel=BugNinza)
- [React Native Onboarding](https://www.youtube.com/watch?v=r2NJJye0XnM&t=257s&ab_channel=DesignIntoCode)
- [React Native Maps & Custom Markers](https://www.youtube.com/watch?v=4N-8RTeQ1fA&t=1123s&ab_channel=PradipDebnath)
- [Wepik & Storyset Illustrations](https://storyset.com/)
- [Google Sign in](https://www.youtube.com/watch?v=XB_gNDoOhjY&t=1232s&ab_channel=CodewithBeto)

[image1]: src/assets/readme-assets/about-project.png
[image2]: src/assets/readme-assets/home.png
[image3]: src/assets/readme-assets/login-signup.png
[image4]: src/assets/readme-assets/onboarding.png
[image5]: src/assets/readme-assets/profile.png
[image6]: src/assets/readme-assets/neighbourhood.png
[image8]: src/assets/readme-assets/add-report.png
[image9]: src/assets/readme-assets/database.png
[image10]: src/assets/readme-assets/user-flow.png
[image11]: src/assets/readme-assets/database.png
[image12]: src/assets/readme-assets/designs.png
[image13]: src/assets/readme-assets/wireframes.png
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/wiaan-duvenhage-95118823a/
[instagram-shield]: https://img.shields.io/badge/-Instagram-black.svg?style=flat-square&logo=instagram&colorB=555
[instagram-url]: https://www.instagram.com/wiaan.dev/
