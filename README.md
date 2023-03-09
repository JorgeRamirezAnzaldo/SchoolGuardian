# SchoolGuardian

School Guardian es una aplicación creada para escuelas y destinada a los padres de familia, los profesores y los directores involucrados, con la finalidad de tener una mejor gestión y vigilancia de las clases y alumnos, así como de las asistencias, calificaciones y alertas de los mismos alumnos.
Esta aplicación considera tres tipos de accesos, uno para cada tipo de usuario involucrado y permite:
 
 * A los directores:
    + Crear alertas y asignarlas a todos los estudiantes de una escuela, de tal forma que el padre de familia pueda visualizar las alertas o anuncios y firmarlas si está de acuerdo o enterado.
    + Visualizar los estudiantes de una escuela y eliminar/dar de baja cualquiera de ellos si se necesita.

 * A los padres de familia:
    + Visualizar las asistencias de sus hijos a las clases en las que estén inscritos.
    + Visualizar las calificaciones de sus hijos obtenidas en las clases en las que estén inscritos.
    + Visualizar las alertas asignadas a sus hijos para firmarlas si están de acuerdo o enterados.

 * A los profesores:
    + Visualizar todas las clases que imparten.
    + Visualizar los estudiantes inscritos en cada una de las clases que imparten.


---
  ## Contenido
  1. [Enlaces](#enlaces)
  2. [Tecnologías](#tecnologías)
  3. [Uso](#uso)
  4. [Instalación](#instalación)
  5. [Contribución](#contribución)
  6. [Colaboradores](#colaboradores)
  
---
## Enlaces

**[Aplicación desplegada ]( "click")**.

**[URL de repositorio de GitHub](https://github.com/JorgeRamirezAnzaldo/SchoolGuardian "click")**.

---
## Tecnologías:

- node JS versión 16.18.0
- npm apollo-server-express 3.6.2
- npm dotenv 8.2.0
- npm dayjs 1.11.7
- npm bcrypt 4.0.1
- npm express 4.17.1
- npm graphql 16.3.0
- npm jsonwebtoken 8.5.1
- npm mongoose 5.9.10
- npm nodemon 2.0.3
- npm concurrently 5.1.0
- npm @apollo/client 3.5.8
- npm @testing-library/jest-dom 4.2.4
- npm @testing-library/react 9.3.2
- npm @testing-library/user-event 7.1.2
- npm bootstrap 4.4.1
- npm graphql 15.4.0
- npm jwt-decode 2.2.0
- npm react 16.13.1
- npm react-bootstrap 1.0.1
- npm react-dom 16.13.1
- npm react-router-dom 6.2.1
- npm react-scripts 4.0.2
- npm web-vitals 0.2.4
- npm semantic-ui-react 2.1.4
- Semantic UI
- HTML
- Heroku

---
## Uso

* Ingresar a la aplicación desplegada en **[Heroku]("click")** o acceder desde el navegador con la dirección **[http://localhost:3000](http://localhost:3000)** después de haber ejecutado el comando `npm run develop` en la terminal de node como muestra la sección de [Instalación](#instalación).
* Al ingresar a la aplicación es necesario iniciar sesión introduciendo credenciales (correo electrónico y contraseña), de acuerdo con el tipo usuario con el que desees acceder y después dar click en "Login" para ingresar a la aplicación.  

    ![Login](./images/Login.jpg)  

    * Para acceder como Director/Principal, se pueden utilizar las siguientes credenciales:
        - Correo electrónico: `jhon.smith@oxford.com`
        - Contraseña: `12345678`
    * Para acceder como Maestro/Professor, se pueden utilizar las siguientes credenciales:
        - Correo electrónico: `alex.johnson@oxford.com`
        - Contraseña: `12345678`
    * Para acceder como Padre de Familia/Tutor, se pueden utilizar las siguientes credenciales:
        - Correo electrónico: `c.horner@redbullracing.com`
        - Contraseña: `12345678`

* Si las credenciales ingresadas son incorrectas, aparecerá una ventana con un mensaje de error. Al presionar el botón de `Try again`, la ventana se cerrará y podrá repetirse el proceso de inicio de sesión.  
    ![Error Login](./images/ErrorLogin.jpg)  
* Dependiendo del tipo de usuario con el que se inicie sesión, se tendrá acceso a diferentes secciones/páginas. A continuación, se describen las páginas que puede visualizar cada tipo de usuario y las acciones que puede llevar a cabo cada uno de ellos.

### Páginas/Acciones para Director/Principal

* Al acceder con las credenciales de Director/Principal, se presentará la siguiente página inicial.  
    ![Home Principal](./images/HomePrincipal.jpg)  

#### Creación de Alertas/Anuncios

* Si se presiona la opción de `Create Alert`:  
    ![Press Create Alert](./images/PressCreateAlert.jpg)  
* Entonces se abrirá una página donde se muestra un formulario para crear una nueva Alerta/Anuncio.    
    ![Create Alert Page](./images/CreateAlertPage.jpg)    
* En esta página se puede crear alguna Alerta/Anuncio que se enviará/asignará a todos los alumnos de la escuela a la que pertenece el Director/Principal.  
* Para crear la nueva Alerta/Anuncio es necesario introducir Subject/Asunto y Message/Mensaje y presionar el botón de `Submit`, tal como se aprecia en la siguiente imagen.    
    ![Alert Form](./images/AlertForm.jpg)  
* Cuando se terminen de crear y asignar las Alertas/Anuncios, se podrá visualizar un mensaje de éxito indicando que el proceso ha terminado.  
    ![Alert Success](./images/AlertSuccess.jpg)  
* Si faltó introducir un dato en el formulario, la aplicación mostrará una ventana con el mensaje de error, indicando al usuario que debe introducir todos los datos.  
    ![Alert Error Modal](./images/AlertErrorModal.jpg)  

#### Eliminación de Alumnos/Estudiantes

* Si se presiona la opción de `Delete Student`:  
    ![Press Delete Student](./images/PressDeleteStudent.jpg)  
* Entonces se abrirá una página donde se muestra una tabla con todos los estudiantes que pertenecen a la escuela del Principal/Director.      
    ![Delete Student Page](./images/DeleteStudentPage.jpg)    
* La tabla muestra una serie de filas, cada una con el nombre del estudiante, su matrícula y un botón para borrar cada uno de los estudiantes.  
* Por lo tanto, desde esta página se pueden eliminar o dar de baja estudiantes de la escuela a la que pertenece el Director/Principal.  
* Para borrar el estudiante deseado, es necesario presionar el botón `Delete` en la fila del estudiante correspondiente.  
    ![Delete Student](./images/DeleteStudent.jpg) 
* Al presionar sobre cualquier botón `Delete`, aparecerá una ventana donde el usuario tendrá que confirmar que desea borrar el estudiante.  
    ![Delete Student Confirmation](./images/DeleteConfirmation.jpg)   
* Al confirmar la eliminación del estudiante, este desaparecerá de la tabla de forma inmediata.

### Páginas/Acciones para Maestro/Professor

* Al acceder con las credenciales de Maestro/Professor, se presentará la siguiente página inicial.  
    ![Home Professor](./images/HomeProfessor.jpg)  

#### Visualizar Clases y Estudiantes por clase
* Si se presiona la opción de `Classes`:  
    ![Press Classes](./images/PressClasses.jpg)      
* Entonces se abrirá una página donde se pueden visualizar todas las clases que imparte el Maestro/Professor.  
    ![Classes Page](./images/ClassesPage.jpg)  
* Si se presiona sobre cualquiera de las clases impartidas por el Maestro/Professor:  
    ![Press Class](./images/PressClass.jpg)   
* Entonces se abrirá una página donde se puede visualizar una tabla con los alumnos/estudiantes inscritos en esa clase. Cada fila incluye el nombre y la matrícula del estudiante.  
    ![Class Students Table](./images/ClassStudents.jpg)   

### Páginas/Acciones para Padre de Familia/Tutor

* Al acceder con las credenciales de Padre de Familia/Tutor, se presentará la siguiente página inicial.    
    ![Home Tutor](./images/HomeTutor.jpg)  
* Esta página inicial despliega los estudiantes asociados al Padre de Familia/Tutor.
* Para visualizar las asistencias, evaluaciones y alertas de cada estudiante, es necesario presionar el estudiante deseado:  
    ![Press Student](./images/PressStudent.jpg)  
* Al presionar el estudiante deseado, se mostrará una página con tres opciones: `Grades`, `Attendance` y `Alerts`.  
    ![Student Options](./images/StudentOptions.jpg) 

### Visualizar Asistencias a clases de un Estudiante

* Si se presiona la opción de `Attendance`:  
    ![Press Attendance](./images/PressAttendance.jpg)  
* Entonces se abrirá una página donde se muestra el nombre del estudiante y una tabla con todas las clases en las que se encuentra inscrito, así como sus asistencias a lo largo de 5 días. Además, la tabla incluye una columna donde se contabilizan el número de inasistencias por clase.  
    ![Student Attendances](./images/StudentAttendances.jpg) 
* Asimismo, cada vez que se posiciona el cursor sobre el ícono de asistencia o inasistencia en una de las celdas de la tabla, se muestra la fecha del día en el que se tomó la inasistencia.  
    ![Attendance Date](./images/AttendanceDate.jpg)   

### Visualizar Evaluaciones de clases de un Estudiante

* Si se presiona la opción de `Grades`:  
    ![Press Grades](./images/PressGrades.jpg)   
* Entonces se abrirá una página donde se muestra el nombre del estudiante y una tabla con todas las clases en las que se encuentra inscrito, así como las calificaciones para cinco evaluaciones. Además, la tabla incluye una columna donde se muestra el promedio de las calificaciones.  
    ![Student Grades](./images/StudentGrades.jpg) 
* Asimismo, cada vez que se posiciona el cursor sobre la calificación en una de las celdas de la tabla, se muestra la fecha del día en el que se llevó a cabo la evaluación.  
    ![Evaluation Date](./images/EvaluationDate.jpg)  

### Firmar Alertas/Anuncios de un Estudiante

* Si se presiona la opción de `Alerts`:  
    ![Press Alerts](./images/PressAlerts.jpg)   
* Entonces se abrirá una página donde se muestra una tabla con las alertas/anuncios asignadas al estudiante. Cada una de las filas contiene el asunto, quién envía la alerta/anuncio, el mensahe de la alerta/anuncio y un ícono.    
    ![Student Alerts](./images/StudentAlerts.jpg)    
* Si el ícono es el siguiente:  
        ![Sign Alert Icon](./images/SignAlertIcon.jpg)   
    * Entonces la alerta puede ser firmada por el Padre de Familia/Tutor.  
* Cuando se presiona el ícono anterior, se mostrará una ventana donde se pedirá confirmación por parte del usuario:  
        ![Confirm Sign](./images/ConfirmSign.jpg)  
    * Al confirmar la firma de la alerta, esta quedará firmada y el ícono cambiará al siguiente:  
        ![Alert Signed Icon](./images/AlertSignedIcon.jpg)  
    * Si no se confirma la decisión, entonces la alerta quedará sin ser firmada.  
* Una vez que la alerta/anuncio ha sido firmada ya no puede regresar a su estado anterior.  

* Para regresar a la página inicial de cada tipo de usuario, se puede presionar el ícono de `Home` ubicado en la esquina superior derecha de la aplicación.  
    ![Go Home](./images/GoHome.jpg)  
* Para cerrar sesión, se puede presionar el ícono de la siguiente imagen, ubicado en la esquina superior derecha de la aplicación.   
    ![Logout](./images/Logout.jpg)  
    * Esta acción hará que se muestre la página de Inicio de sesión.  

---
 ## Instalación
- Clonar repositorio
    - Abrir el siguiente link **[URL de repositorio de GitHub](https://github.com/JorgeRamirezAnzaldo/SchoolGuardian "click")**.
    - Hacer click en "<> Code".

        ![Captura de pantalla para clonar repositorio](./images/CloneRepo.jpg)
    - Copiar la direccion del repositorio bajo la opción "SSH".

        ![Captura de pantalla para copiar direccion URL del repositorio](./images/CopyURL.jpg)
    - Abrir GitBash.
    - Ir a la ubicacion en donde quieres clonar el repositorio.
    - Escribir **`git clone`** y pegar la url antes copiada.
    - Presionar enter para clonar.

- Instalar node desde la página oficial **[NodeJS web Oficial](https://nodejs.org/es/ "click")**.
- Instalar MongoDB desde la página oficial **[Página MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/ "click")** y realizar la configuración necesaria usando la siguiente guía **[Guía configuración MongoDB](https://coding-boot-camp.github.io/full-stack/es/mongodb/how-to-install-mongodb "click")**
- Abrir GitBash.
- Ir a la ubicacion en donde se clonó el repositorio.
- Escribir **`npm install`** para instalar todas las dependencias del proyecto.
- Con esto instalaremos todas las dependecias que tengamos en el package.json general, en el package.json del lado del servidor y en el package.json del lado del cliente y nos creará una carpeta llamada **node_modules** para cada package.json con las dependencias listas para utilizarse.
- Dirigirse al archivo **`.env.example`** en la carpeta del servidor:
    - Cambiar el nombre del archivo a **`.env`** y agregar la siguiente variable para proteger el secret del token.
     
            SECRET_TOKEN='secret para la generación del token'

- Escribir  en la terminal GitBash **`npm run seed`** para agregar datos a la base de datos y poder probar la aplicación adecuadamente. Si no agregas datos a la base de datos no podrás iniciar sesión en la aplicación y por lo tanto, no podrás acceder a la funcionalidad de la misma.
- Escribir **`npm run develop`** para iniciar el servidor y la aplicación.
- A partir de este punto, puedes ir a tu navegador e introducir la dirección **http://localhost:3000/** para comenzar a probar la aplicación.

---
## Contribución
    
  Para contribuir con este proyecto:
- Fork del repositorio.
- Clonar el  repositorio.
- Actualizar la rama main.

        $git pull -r upstream main
- Crear rama.

        $ git checkout -b feature-nombre-rama
- Realizar cambios, agregarlos, hacer commit y despues hacer push hacia nuestro repositorio indicando la rama que hemos creado.

        $ git push origin feature-nombre-rama
- Hacer un Pull Request.
- Esperar que el codigo se acepte y se haga merge.

---
## Colaboradores
    
- **[Jorge Ramirez Anzaldo](https://github.com/JorgeRamirezAnzaldo "click")**.
- **[Jaime Alberto Esquivel Acosta](https://github.com/jaime-a-esquivel-a "click")**.
- **[Diana Carolina Cruz Velázquez](https://github.com/Caro2102 "click")**.