# Documentación Práctica Nodepop FrontEnd

Los objetos del db.json son:
- anuncios
- users
- tags

## Requisitos mínimos

- ### Página de listado de anuncios

Para acceder al detalle del anuncio, existe un botón de Detalle. 
He utilizado la misma vista para cargar todos los anuncios y el detalle de uno solo.
Los botones de login, registro, nuevo anuncio y logout aparecen en la barra de navegación.

La búsqueda de anuncios también aparece en la barra de navegación, así como el fitro por tags estáticos de los anuncios existentes en el db.json.

- ### Página de detalle de anuncio

En esta página, si el usuario es propietario del anuncio, le muestra por pantalla el botón de eliminar anuncio.

- ### Página de creación de anuncio

En está página, además de los campos obligatorios, he incluido una selección de tags estáticos y un input para que el usuario introdujera la/s nueva/s categorias de tags. 


### Requisitos Opcionales

- #### Gestionar la páginación de anuncios en el listado

Este punto lo he intentado implementar poniendo en el limite de la query que solo devolviera 10 anuncios, ya que por defecto me devolvia todos los anuncios del db.json.

Con el nº de anuncios totales calculaba el nº de páginas y he intentado que las incluyera en la barra de páginación mediante una vista, pero las incluia fuera de la barra de navegación como articulos nuevos.
Además no he sido capaz de capturar el nº de página para pasárselo a la query de la función getAnuncios.

Por esto he quitado el limite de 10 anuncios para que en la página principal se visualicen todos los anuncios existentes.


##### Imágenes del proyecto

Las imágenes utilizadas en el proyecto se han obtenido de las siguientes webs gratuitas:
- [Pexels.com] (https://www.pexels.com) 
- [istockphoto.com] (https://www.istockphoto.com) 
