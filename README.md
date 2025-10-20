# Random Quotes API

## Instalación Local

```powershell
# Clonar o descargar el proyecto
cd random-quotes

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con auto-reload)
npm run dev

# Ejecutar en modo producción
npm start
```

### Construir la imagen

```powershell
docker build -t random-quotes:local .
```

### Ejecutar un contenedor

```powershell
docker run --rm -p 3000:3000 random-quotes:local
```

### Usar la imagen de Docker Hub

```powershell
docker run --rm -p 3000:3000 jotapedv/random-quotes:latest
```

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información de bienvenida y endpoints disponibles |
| GET | `/quotes` | Lista todas las frases con contador |
| GET | `/quotes/random` | Devuelve una frase aleatoria |
| GET | `/quotes/:id` | Busca una frase por ID (1-10) |

### Ejemplos de uso

```powershell
# Obtener información general
Invoke-WebRequest http://localhost:3000/

# Obtener todas las frases
Invoke-WebRequest http://localhost:3000/quotes

# Obtener una frase aleatoria
Invoke-WebRequest http://localhost:3000/quotes/random

# Obtener una frase específica
Invoke-WebRequest http://localhost:3000/quotes/5
```

## Docker Swarm

### Inicializar Swarm

```powershell
docker swarm init
```

### Crear red overlay

```powershell
docker network create --driver overlay random-quotes-net
```

### Desplegar el servicio

```powershell
docker service create `
  --name random-quotes-service `
  --replicas 3 `
  --publish published=3001,target=3000 `
  --network random-quotes-net `
  jotapedv/random-quotes:latest
```

### Gestionar el servicio

```powershell
# Ver estado del servicio
docker service ls

# Ver réplicas
docker service ps random-quotes-service

# Escalar
docker service scale random-quotes-service=5

# Ver logs
docker service logs -f random-quotes-service

# Actualizar imagen
docker service update --image jotapedv/random-quotes:1.0.1 random-quotes-service

# Eliminar servicio
docker service rm random-quotes-service
```

### Limpiar

```powershell
# Eliminar servicio
docker service rm random-quotes-service

# Eliminar red
docker network rm random-quotes-net

# Salir del modo Swarm
docker swarm leave --force
```

## Estructura del proyecto

```
random-quotes/
├── src/
│   ├── app.js        
│   ├── quotes.js     
│   └── server.js      
├── .dockerignore   
├── Dockerfile         
├── package.json        
├── package-lock.json   
└── README.md          
```

## Scripts

```powershell
# Desarrollo
npm run dev

# Producción
npm start
```

## Tecnologías

- **Node.js 20**
- **Express 5**
- **Docker** 
- **Docker Swarm** 

## Autor
Juan Pablo Rua - [jotapedv](https://hub.docker.com/u/jotapedv)



