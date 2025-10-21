# <p align="center">ECHO-FIVE-MEET</p>

<p align="center">
  <strong>Customized Video Conferencing Platform for Educational Institutions</strong>
</p>

<p align="center">
  A specialized Jitsi Meet implementation designed for parent-teacher meetings and classroom sessions.
</p>

<hr />

## 📋 About ECHO-FIVE-MEET

ECHO-FIVE-MEET is a customized video conferencing solution built on Jitsi Meet, specifically tailored for educational environments. It provides a streamlined interface for teachers and parents to conduct virtual meetings with enhanced privacy and simplified workflows.

<hr />

## ✨ Key Features

### Custom Role-Based Access
* **Teacher Role**: Create and manage parent-teacher meetings or class sessions
* **Parent Role**: Join meetings via auto-generated meeting IDs
* Streamlined meeting creation workflow
* Two meeting types: Parent-Teacher Meeting and Class Meeting

### Core Video Conferencing Features
* HD audio and video quality
* Screen sharing and content presentation
* Real-time chat with private conversations
* Raise hand and emoji reactions
* Virtual backgrounds
* Polls and interactive features
* Cross-platform support (Web, Android, iOS)

### Branding & Customization
* Jitsi watermark removed
* Custom ECHO-FIVE branding
* Tailored user interface for education

## 🚀 Quick Start

### For Teachers:
1. Open the ECHO-FIVE-MEET application
2. Click **CREATE** button
3. Select your role: **Teacher**
4. Choose meeting type:
   - Parent-Teacher Meeting
   - Class Meeting
5. Meeting ID is auto-generated
6. Share the meeting link with parents

### For Parents:
1. Open the ECHO-FIVE-MEET application
2. Click **JOIN** button
3. Select your role: **Parent**
4. Paste the meeting link received from the teacher
5. Join the meeting

### Supported Platforms:
* **Web**: All modern browsers (Chrome, Firefox, Safari, Edge)
* **Android**: Native Android application
* **iOS**: Native iOS application
* **React Native SDK**: For mobile app integration

## 🛠️ Installation & Setup

### Prerequisites
* Node.js >= 22.0.0
* npm >= 10.0.0
* Make (for build commands)

### Clone the Repository
```bash
git clone https://github.com/tharunkamalesh/meet-echo-five.git
cd meet-echo-five
```

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
make dev
```
The development server will start at `http://localhost:8080`

### Production Build
```bash
make all
```

### Windows Users
For easier setup on Windows, use the provided batch files:
```cmd
COMPLETE-SETUP-AND-RUN.bat
```
or
```cmd
RUN-ECHO-FIVE-MEET.bat
```

## 🏗️ Project Structure

```
echo-five-meeting/
├── react/              # React components and features
├── css/                # SCSS stylesheets
├── modules/            # API, UI, and transport modules
├── lang/               # Internationalization files
├── android/            # Android mobile app
├── ios/                # iOS mobile app
├── react-native-sdk/   # React Native SDK
├── sounds/             # Audio assets
├── images/             # Image assets
├── static/             # Static HTML files
├── resources/          # Additional resources
├── patches/            # Dependency patches
├── tests/              # Test files
├── config.js           # Jitsi configuration
├── interface_config.js # UI configuration
├── webpack.config.js   # Webpack configuration
└── package.json        # Project dependencies
```

## 📚 Technology Stack

* **Frontend**: React 18, TypeScript 5.7.2
* **Mobile**: React Native 0.77.2
* **Build Tools**: Webpack 5, Babel 7
* **Styling**: SCSS, Emotion
* **State Management**: Redux
* **UI Components**: Material UI
* **Video/Audio**: WebRTC, lib-jitsi-meet
* **AI Features**: TensorFlow.js (virtual backgrounds, noise suppression)

## 📖 Documentation

For detailed Jitsi Meet documentation, visit [the Jitsi handbook](https://jitsi.github.io/handbook/).

## Security

For a comprehensive description of all Jitsi Meet's security aspects, please check [this link](https://jitsi.org/security).

For a detailed description of Jitsi Meet's End-to-End Encryption (E2EE) implementation,
please check [this link](https://jitsi.org/e2ee-whitepaper/).

For information on reporting security vulnerabilities in Jitsi Meet, see [SECURITY.md](./SECURITY.md).

## 🔐 Security

For security information and vulnerability reporting, please see [SECURITY.md](./SECURITY.md).

For End-to-End Encryption (E2EE) details, check [Jitsi's E2EE whitepaper](https://jitsi.org/e2ee-whitepaper/).

## 📝 License

This project is based on Jitsi Meet and follows the same licensing terms. See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

ECHO-FIVE-MEET is built on top of [Jitsi Meet](https://github.com/jitsi/jitsi-meet), an open-source project by the Jitsi team at [8x8](https://8x8.com).

## 📞 Support

For issues and questions:
* Create an issue on [GitHub Issues](https://github.com/tharunkamalesh/meet-echo-five/issues)
* Refer to the [Jitsi Community](https://community.jitsi.org/) for general Jitsi Meet questions

---

<p align="center">
  <strong>ECHO-FIVE-MEET</strong> - Empowering Education Through Connected Communication
</p>

<p align="center">
  Built with ❤️ for educators, parents, and students
</p>
