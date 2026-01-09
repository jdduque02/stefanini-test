# API REST - Sistema de Gestión de Empresas y Transferencias

API RESTful desarrollada con NestJS para la gestión de empresas (PyME y Corporativas) y sus transferencias bancarias.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Documentación de la API](#documentación-de-la-api)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Testing](#testing)
- [Decisiones Técnicas](#decisiones-técnicas)
- [Referencias](#referencias)

## ✨ Características

- 🏢 Gestión de dos tipos de empresas: PyME y Corporativas
- 💸 Registro de transferencias bancarias (Débito/Crédito)
- 📊 Consulta de empresas con transferencias del último mes
- 🔍 Filtrado por nombre, CUIT y tipo de empresa
- 📄 Paginación y ordenamiento de resultados
- ✅ Validación exhaustiva de datos con class-validator
- 📚 Documentación interactiva con Swagger
- 🔐 Seguridad con Helmet y rate limiting
- 🧪 Cobertura de tests completa
- 📦 Persistencia en archivos JSON

## 🔧 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x

Puedes verificar tus versiones con:

```bash
node --version
npm --version
```

## 📥 Instalación

1. **Clonar el repositorio** (o descargar el código fuente)

```bash
git clone https://github.com/jdduque02/stefanini-test.git
cd stefanini-test
```

2. **Instalar dependencias**

```bash
npm install
```

Esto instalará todas las dependencias necesarias listadas en el `package.json`, incluyendo NestJS, Swagger, class-validator, y otras librerías esenciales.

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Versión de la API
VERSION=1

# Entorno
NODE_ENV=development
```

Si no creas el archivo `.env`, la aplicación usará valores por defecto (puerto 3000, versión 1).

### Estructura de Datos

El proyecto usa archivos JSON para persistencia ubicados en `src/db/`:

- **`company.json`**: Almacena las empresas registradas
- **`transfers.json`**: Almacena las transferencias realizadas

Estos archivos se crean automáticamente si no existen cuando se inicia la aplicación.

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

```bash
npm run start:dev
```

Esto iniciará el servidor con hot-reload. Cualquier cambio en el código reiniciará automáticamente el servidor.

### Modo Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar el build
npm run start:prod
```

### Modo Debug

Para ejecutar con el debugger de Node.js:

```bash
npm run start:debug
```

Luego puedes conectar tu IDE al debugger en el puerto 9229.

Una vez iniciado, el servidor estará disponible en: **http://localhost:3000**

## 📚 Documentación de la API

La documentación interactiva de Swagger está disponible en:

```
http://localhost:3000/api/docs
```

Desde ahí puedes:

- Ver todos los endpoints disponibles
- Probar las peticiones directamente
- Ver los esquemas de datos requeridos
- Revisar las respuestas esperadas

## 📖 Ejemplos de Uso

### 1. Crear una Empresa PyME

**Endpoint:** `POST /api/v1/company`

**Body:**

```json
{
  "company_name": "Distribuidora ABC S.A.",
  "company_cuit": "20123456789",
  "company_type": "PyME",
  "company_address": "Av. Siempre Viva 742",
  "company_location": "Buenos Aires",
  "company_phone_number": "+541155551234",
  "company_current_account_number": 1234567890,
  "company_require_manual_approval": false,
  "company_category_pyme": "Pequeña"
}
```

**Respuesta exitosa (201):**

```json
{
  "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  "company_name": "Distribuidora ABC S.A.",
  "company_cuit": "20123456789",
  "company_type": "PyME",
  "company_create_at": "2026-01-08T15:30:00.000Z",
  "company_address": "Av. Siempre Viva 742",
  "company_location": "Buenos Aires",
  "company_phone_number": "+541155551234",
  "company_current_account_number": 1234567890,
  "company_require_manual_approval": false,
  "company_category_pyme": "Pequeña"
}
```

### 2. Crear una Empresa Corporativa

**Endpoint:** `POST /api/v1/company`

**Body:**

```json
{
  "company_name": "Tech Corp Internacional",
  "company_cuit": "30987654321",
  "company_type": "Corporativa",
  "company_address": "Av. Libertador 5000",
  "company_location": "CABA",
  "company_phone_number": "+541143216789",
  "company_current_account_number": 9876543210,
  "company_resolution_time": "2025-12-01T10:00:00.000Z",
  "company_proxies": [
    {
      "proxy_name": "Juan Pérez",
      "proxy_lastname": "González"
    },
    {
      "proxy_name": "María",
      "proxy_lastname": "Rodríguez"
    }
  ],
  "company_shareholders": [
    {
      "shareholder_name": "Carlos",
      "shareholder_lastname": "Fernández",
      "shareholder_participation": 60
    },
    {
      "shareholder_name": "Ana",
      "shareholder_lastname": "López",
      "shareholder_participation": 40
    }
  ]
}
```

**Respuesta exitosa (201):**

```json
{
  "id": "b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7",
  "company_name": "Tech Corp Internacional",
  "company_cuit": "30987654321",
  "company_type": "Corporativa",
  "company_create_at": "2026-01-08T15:35:00.000Z",
  "company_address": "Av. Libertador 5000",
  "company_location": "CABA",
  "company_phone_number": "+541143216789",
  "company_current_account_number": 9876543210,
  "company_resolution_time": "2025-12-01T10:00:00.000Z",
  "company_proxies": [...],
  "company_shareholders": [...]
}
```

### 3. Crear una Transferencia

**Endpoint:** `POST /api/v1/transfer`

**Body:**

```json
{
  "transfer_company_id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  "transfer_amount": 150000.5,
  "transfer_type": "Débito",
  "transfer_status": "Pendiente",
  "transfer_description": "Pago a proveedor de materiales de construcción"
}
```

**Respuesta exitosa (201):**

```json
{
  "id": "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8",
  "transfer_company_id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  "transfer_amount": 150000.5,
  "transfer_date": "2026-01-08T15:40:00.000Z",
  "transfer_type": "Débito",
  "transfer_status": "Pendiente",
  "transfer_description": "Pago a proveedor de materiales de construcción"
}
```

### 4. Consultar Empresas con Transferencias del Último Mes

**Endpoint:** `GET /api/v1/company`

**Query Parameters:**

- `company_name` (opcional): Filtrar por nombre
- `company_cuit` (opcional): Filtrar por CUIT
- `company_type` (opcional): Filtrar por tipo (PyME/Corporativa)
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Cantidad por página (default: 10)
- `order` (opcional): Orden (ASC/DESC, default: DESC)

**Ejemplos:**

```bash
# Obtener todas las empresas con transferencias recientes (paginado)
GET /api/v1/company?page=1&limit=10

# Filtrar por tipo PyME
GET /api/v1/company?company_type=PyME

# Buscar por nombre
GET /api/v1/company?company_name=ABC

# Buscar por CUIT
GET /api/v1/company?company_cuit=20123456789

# Combinar filtros con orden ascendente
GET /api/v1/company?company_type=Corporativa&order=ASC&page=1&limit=5
```

**Respuesta exitosa (200):**

```json
{
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
      "company_name": "Distribuidora ABC S.A.",
      "company_cuit": "20123456789",
      "company_type": "PyME",
      "company_create_at": "2026-01-08T15:30:00.000Z",
      "transfers": [
        {
          "id": "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8",
          "transfer_amount": 150000.5,
          "transfer_date": "2026-01-08T15:40:00.000Z",
          "transfer_type": "Débito",
          "transfer_status": "Pendiente"
        }
      ]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### Usando cURL

```bash
# Crear empresa PyME
curl -X POST http://localhost:3000/api/v1/company \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Mi Empresa",
    "company_cuit": "20111222333",
    "company_type": "PyME",
    "company_address": "Calle Falsa 123",
    "company_location": "Rosario",
    "company_phone_number": "+543411234567",
    "company_current_account_number": 1122334455
  }'

# Obtener empresas
curl -X GET "http://localhost:3000/api/v1/company?page=1&limit=10"
```

### Usando Postman/Insomnia

1. Importa la colección desde Swagger en `http://localhost:3000/api/docs-json`
2. O crea manualmente las peticiones usando los ejemplos anteriores

## 🧪 Testing

El proyecto incluye tests unitarios completos.

### Ejecutar todos los tests

```bash
npm run test
```

### Ejecutar tests con cobertura

```bash
npm run test:cov
```

Esto generará un reporte de cobertura en la carpeta `coverage/`. Puedes ver el reporte HTML en `coverage/lcov-report/index.html`.

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

## 🎯 Decisiones Técnicas

### ¿Por qué NestJS?

Elegí NestJS porque es un framework moderno y robusto que:

- **Proporciona estructura clara**: La arquitectura modular de NestJS hace que el código sea fácil de organizar y mantener
- **TypeScript nativo**: Ofrece type-safety y mejor experiencia de desarrollo con autocompletado
- **Inyección de dependencias**: Facilita el testing y hace el código más testeable y desacoplado
- **Decoradores potentes**: Simplifican la validación, documentación y configuración
- **Ecosistema maduro**: Gran comunidad y excelente documentación

### Arquitectura Modular

Opté por una **arquitectura modular** en lugar de hexagonal porque:

1. **Simplicidad apropiada**: Para este proyecto, la complejidad de una arquitectura hexagonal completa sería excesiva
2. **Separación de responsabilidades clara**: Los módulos `company` y `transfer` están completamente aislados
3. **Escalabilidad**: Es fácil agregar nuevos módulos sin afectar los existentes
4. **Mantenibilidad**: La estructura es intuitiva y fácil de navegar para cualquier desarrollador

**Estructura de cada módulo:**

```
module/
├── controllers/     # Manejo de peticiones HTTP
├── services/        # Lógica de negocio
├── repository/      # Acceso a datos
├── interfaces/      # DTOs y contratos
└── entities/        # Modelos de dominio
```

### Persistencia en JSON

Usé archivos JSON en lugar de una base de datos tradicional por:

- **Simplicidad de setup**: No requiere instalación de bases de datos
- **Portabilidad**: El proyecto funciona inmediatamente en cualquier entorno
- **Suficiente para el alcance**: Para un proyecto de prueba técnica es apropiado
- **Fácil de reemplazar**: La capa de repositorio permite cambiar a una BD real sin modificar la lógica

**Nota**: En producción recomendaría usar PostgreSQL con TypeORM o Prisma.

### Validación con Class-Validator

Implementé validaciones exhaustivas porque:

- **Evita datos corruptos**: Valida antes de procesar cualquier información
- **Mejora la experiencia**: Devuelve mensajes claros sobre qué está mal
- **Reduce bugs**: Previene errores en tiempo de ejecución
- **Documentación automática**: Los decoradores también documentan en Swagger

### Versionamiento de API

Incluí versionamiento (`/api/v1/...`) aunque es la primera versión porque:

- **Preparado para el futuro**: Facilita mantener retrocompatibilidad
- **Buena práctica**: Es un estándar en APIs profesionales
- **Migración sin romper clientes**: Permite evolucionar la API sin afectar usuarios

### Rate Limiting y Seguridad

Implementé Helmet y Throttler para:

- **Prevenir ataques DDoS**: Limita peticiones por IP
- **Headers de seguridad**: Helmet configura headers HTTP seguros
- **Protección básica**: Primera línea de defensa contra vulnerabilidades comunes

### Testing Completo

Escribí tests exhaustivos porque:

- **Confianza en refactors**: Puedo modificar código sin miedo a romper funcionalidad
- **Documentación viva**: Los tests muestran cómo usar el código
- **Calidad asegurada**: Detecta bugs antes de que lleguen a producción
- **Mantenibilidad**: Facilita agregar features sabiendo que lo existente funciona

### Separación de DTOs

Creé DTOs específicos para entrada y salida porque:

- **Seguridad**: No expongo propiedades internas
- **Flexibilidad**: Puedo transformar datos sin cambiar las entidades
- **Validación específica**: Diferentes reglas para crear vs. consultar
- **Documentación clara**: Swagger muestra exactamente qué esperar

## 📚 Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Swagger/OpenAPI](https://swagger.io/)
- [Class Validator](https://github.com/typestack/class-validator)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Autor**: Desarrollado como parte de una prueba técnica para Stefanini  
**Licencia**: UNLICENSED (Privado)  
**Versión**: 0.0.1
