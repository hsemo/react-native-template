/**
 * @module constants/index
 *
 * This module exports constants used in the React Native template project.
 * It includes optional plugins that users can choose to include,
 * their corresponding third-party dependencies, destination paths for the plugins,
 * and patterns to be included in the .gitignore file.
 */

const path = require('path');

/**
 * Optional Functions and Components, that users
 * can choose to include in template
 * @type {Array<string>}
 */
const PLUGINS = ['withFileUpload', 'withDatePicker', 'withRedux'];

/**
 * 3rd party dependencies based on feature
 * @type {Object<string, Array<string>>}
 */
const dependencies = {
  withFileUpload: [
    'react-native-document-picker',
    'react-native-toast-message',
    'react-native-fs',
    'react-native-file-viewer',
  ],
  withDatePicker: [
    'react-native-modal',
    'react-native-modern-datepicker',
    'moment',
  ],
  withRedux: [
    '@reduxjs/toolkit',
    'react-redux'
  ],
};

/**
 * Destination directory paths of the plugins
 * @type {Object<string, string>}
 */
const pluginPaths = {
  withFileUpload: path.join('.', 'src', 'HOCs'),
  withDatePicker: path.join('.', 'src', 'HOCs'),
};

const gitignoreContent = `
# Node modules
node_modules
# OSX
#
.DS_Store

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
ios/.xcode.env.local

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/
*.keystore
!debug.keystore

android/app/build/
android/build/
android/src/main/res/drawable-hdpi
android/src/main/res/drawable-mdpi
android/src/main/res/drawable-xhdpi
android/src/main/res/drawable-xxhdpi
android/src/main/res/drawable-xxxhdpi

# node.js
#
node_modules/
npm-debug.log
yarn-error.log
package-lock.json
yarn.lock

# fastlane
#
# It is recommended to not store the screenshots in the git repo. Instead, use fastlane to re-generate the
# screenshots whenever they are needed.
# For more information about the recommended setup visit:
# https://docs.fastlane.tools/best-practices/source-control/

**/fastlane/report.xml
**/fastlane/Preview.html
**/fastlane/screenshots
**/fastlane/test_output

# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
/ios/Pods/
/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*
.env
android/app/google-services.json
ios/GoogleService-Info.plist

# testing
/coverage
# Ignore Yarn cache files
.yarn/cache/
.yarn/build-state/
.yarn/unplugged/
.yarn/install-state.gz

# Do not ignore Yarn releases, plugins, and versions
!.yarn/releases/
!.yarn/plugins/
!.yarn/versions/
`;

module.exports = {
  PLUGINS,
  dependencies,
  pluginPaths,
  gitignoreContent,
};
