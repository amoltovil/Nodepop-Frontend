//const url='https://gist.githubusercontent.com/kasappeal/a8724e3f1c75ba515a8d9500f4b609e7/raw/4733ee642e4cf01e95ff4284d6e252d0706804b0/fweets.json';
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {
    
    getAnuncios: async function (query=null, idAnuncio=null) {
        const currentUser = await this.getUser();

        //let url =`${BASE_URL}/api/anuncios?_expand=user&_limit=10&_sort=id&_order=desc`;
        let url =`${BASE_URL}/api/anuncios?_expand=user&_sort=id&_order=desc`;
        if (query) {
            url += `&q=${query}`
        }
        if (idAnuncio) {
            url = `${BASE_URL}/api/anuncios?_expand=user&${idAnuncio}`;
        }
               
        const response = await fetch(url);
        try {
            
            if (response.ok) {
                const data = await response.json();
                
                return data.map(anuncio => {
                    const user = anuncio.user || {};
        
                    if (anuncio.desc !== null) {
                        anuncio.desc = anuncio.desc.replace(/(<([^>]+)>)/gi, "");
                    }
                    return {
                        id: anuncio.id, 
                        nombre: anuncio.nombre.replace(/(<([^>]+)>)/gi, ""), 
                        desc: anuncio.desc || null,
                        venta: anuncio.venta, 
                        precio: anuncio.precio,
                        tags: anuncio.tags, 
                        image: anuncio.foto || null, 
                        date: anuncio.createdAt || anuncio.updatedAt, 
                        author: user.username || 'Anónimo', 
                        canBeDeleted: currentUser ? currentUser.userId === anuncio.userId : false                        
                    }
                    // si currentuser es nulo, false y sino compara currentUser.userId === anuncio.userId 
                }); //  resolve(data);
            } else { // devolver un error
                throw new Error (`HTTP Error: ${response.status}`);
            }
        } catch (error) {  // devuelve un json con el error
            console.error('HA HABIDO UN ERROR AL CARGAR LOS ANUNCIOS', error);
            throw new Error(`HTTP Error: ${response.status}`);
            
        }        
    },

    post: async function(url, postData, json=true) {
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url) {
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json=true){
        return this.request('PUT', url, putData, json);
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method:method, 
            //headers: { 'Content-Type': 'application/json' }, 
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] ='application/json';
            config.body = JSON.stringify(postData) // convierte el objecto a formato JSON
        } else {
            config.body = postData;
        }

        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, config);
        const data = await response.json(); // respuesta del servidor sea ok o sea ERROR.
        if (response.ok){
            return data;
        } else {
            // TODO: MEJORAR GESTIÓN DE ERRORES
            // TODO: si la respuesta es un 401 no autorizado, debemos borrar el token(si es que lo tenemos);
            
            throw new Error(data.message || JSON.stringify(error));
        }
    }, 

    registerUser: async function (user) {
        const url =`${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function (user) {
        const url =`${BASE_URL}/auth/login`;
        return await this.post(url, user);
    }, 

    saveToken: async function(token) { // recomendable poner async (devuelve una promesa+)
        localStorage.setItem(TOKEN_KEY, token);
    }, 

    getToken: async function()  {
        return localStorage.getItem(TOKEN_KEY);
    }, 
   
    isUserLogged: async function(){
        const token = await this.getToken();
        return token !== null;
    }, 

    saveAnuncio: async function(anuncio) {
        const url = `${BASE_URL}/api/anuncios`;
        if (anuncio.foto) {
            const imageURL = await this.uploadImage(anuncio.foto);
            anuncio.foto = imageURL;
        }
        return await this.post(url, anuncio); 
    }, 

    logOutUser: async function (){
        return localStorage.removeItem(TOKEN_KEY);
    }, 

    uploadImage: async function (image){
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        return response.path || null;
    }, 

    getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !==3) {
                return null; // token inválido
            } 
            const payload = tokenParts[1]; // cogemos el payload, codificado en base64
            const jsonStr = atob(payload); // descodificamos el base64
            const {userId, username} = JSON.parse(jsonStr);  //parseamos el JSON del token descodificado
            return {userId, username};
        } catch (error) {
            return null;       
        }
    }, 

    deleteAnuncio: async function (anuncio){
        const url=`${BASE_URL}/api/anuncios/${anuncio.id}`;
        return await this.delete(url);
    }, 

    getTags: async function () {
        //const currentUser = await this.getUser();
        const url = `${BASE_URL}/api/tags?_sort=tag`;
       
        const response = await fetch(url);
        try {
            
            if (response.ok) {
                const data = await response.json();
                
                return data.map(tag => {
        
                    return {
                        id: tag.id, 
                        nombre: tag.tag.replace(/(<([^>]+)>)/gi, "")
                    }
                }); //  resolve(data);
            } else { // devolver un error
                throw new Error (`HTTP Error: ${response.status}`);
            }
        } catch (error) {  // devuelve un json con el error
            throw new Error(`HTTP Error: ${response.status}`);
        }        
    }, 

    saveTag: async function(tag) {
        const url = `${BASE_URL}/api/tags`;
        return await this.post(url, tag); 
    } 

};