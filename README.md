# React Native - Base App

> Base para desarrollar aplicaciones para iOS y Android con React Native + TypeScript.

## Herramientas

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [SVG to React Native Component](https://www.smooth-code.com/open-source/svgr/playground)
- [Yoga Layout](https://yogalayout.com/)
- [Squoosh - Compresor de imágenes](https://squoosh.app/)
- [Generador de icono y splash screen](https://github.com/bamlab/react-native-make)
- [Renombrar proyecto (1º Opción)](https://github.com/junedomingo/react-native-rename)
- [Renombrar proyecto (2º Opción)](https://github.com/mayconmesquita/react-native-rename-next)

## Pasos para renombrar el proyecto:

1. Ejecutar yarn install.
2. Usar una de las herramientas mencionadas arriba.
3. El nombre de la app en IOS se cambia desde xCode
4. El nombre de la app en Android se cambia en el archivo /android/app/src/main/res/values/strings.xml
5. Ejecutar yarn run clean.\*
6. Ejecutar yarn run clean-android.\*
7. Ejecutar yarn run clean-ios.\*

> Si desarrollas en MAC OS puedes ejecutar yarn clean-all y automáticamente se ejecutarán los 3 clean.

## Comandos:

> yarn run < comando >

> npm run < comando >

### Opciones:

- **rn-link:** Enlaza los assets automáticamente (fuentes de texto)
- **apk:** Genera la apk para subirla a Google Play
- **android-key:** Genera una key para debug
- **clean:** Reinstala las dependencias de node (node_modules)
- **clean-android:** Borra la caché en android
- **clean-ios:** Borra la caché en IOS y reinstala los Pod
- **clean-all:** Ejecuta todos los clean anteriores
- **android:** Abre la app en el emulador de android o en tu smartphone si lo tienes conectado
- **ios:** Abre la app en un emulador de IOS (iPhone 8)
- **ios-notch:** Abre la app en un emulador de IOS (iPhone 12)
- **ios-promax:** Abre la app en un emulador de IOS (iPhone 12 Pro Max)
- **ios-ipadpro:** Abre la app en un emulador de IOS (iPad Pro (12.9-inch) (4rd generation))
- **nox-player:** Usar Nox Player para desarrollar
- **devmenu-android:** Abrir menú de desarrollo en android
