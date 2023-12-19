# Tutorial
## Proyecto Integrador de Saberes
### Carrera de Computación Cuarto Ciclo
#### Clonar Repositorio

- Clonar usando `git clone git@github.com:jaimem06/app_pis.git`<br>
  Una vez clonado el repositorio, vamos a encontrar dentro del proyecto 2 carpetas principales: **dashboard** y **mobile-app**<br>

- La carpeta `dashboard` va a contener el código correspondiente al panel de administración, mientras que `mobile-app` contiene el código fuente de la aplicación móvil.

- Para poder emular la aplicación, es necesario tener instalado Node.js en su última versión y npm.
- Adicionalmente, para la aplicación móvil debe estar instalado Expo, que debería venir por defecto con Node.js al igual que NPM.
  En caso de no tener instalado Expo, revisar esta [información](https://docs.expo.dev/get-started/installation/).

## TUTORIAL:
### Para el API
#### Donde se encuentra todo el Backend
- Lo que debes hacer es entrar a la carpeta **api** en el proyecto.

- Abrir el cmd en esa dirección y ejecutar:

  - Ejecutar `nodemon index`.

  - Se deberia mostrar un mensaje diciendo `API funcionando`. en el puerto 3000
  - Luego va a intentar conectar a la base de datos pero como es primera conexion no te va a dejar por que tu IP no esta permitida, debes ir a MongoDB Atlas para agregarla.

### Para el Dashboard
#### Panel de Administración
- Lo que debes hacer es entrar a la carpeta **dashboard** en el proyecto.

- Abrir el cmd en esa dirección y ejecutar:

  - Primero `npm install`. Siempre usar este, ya que instala las librerías que se estén usando hasta ese momento.

  - Luego `npm run dev`.
  - Se debe ejecutar correctamente y te va a mostrar el puerto donde se esta ejecutando.
  - **Psdt:** Si presentas algún error, instala npm en su última versión. [Tutorial](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Para la Aplicación
#### App con React Native
- Como herramienta adicional, debes tener instalado Expo Go en tu celular, suponiendo que lo vas a emular ahí, o también puedes usar Android Studio.

- **Descargar Expo Go** [iOS](https://apps.apple.com/mx/app/expo-go/id982107779) o en [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www).

- Lo primero que debes hacer es ingresar a la carpeta **mobile_app** del proyecto.

- Abrir el cmd en esa dirección y ejecutar:

  - Primero `npm install`. Siempre usar este, ya que instala las librerías que se estén usando hasta ese momento.
  - Luego `npx expo start`.
  - Esperas a que cargue y te va a aparecer un código QR, lo debes escanear con la aplicación de EXPO GO y ya puedes ver los cambios que vas realizando.
  - También puedes usar una dirección IP que te proporciona, insertándola manualmente en la aplicación.
  - O tambien puedes usar Android Studio emulando un dispositivo.

# IMPORTANTE
Todo código que vayan haciendo lo suben a la rama `develop`. Una vez que ya tengan algo funcional, se envía a la rama de `pruebas`. Ahí se revisa y si todo está bien, se envía al `main`.
