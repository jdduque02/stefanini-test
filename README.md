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

### Ejecutar tests con cobertura

```bash
npm run test:cov
```

Esto generará un reporte de cobertura en la carpeta `coverage/`. Puedes ver el reporte HTML en `coverage/lcov-report/index.html`.

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

## 🎯 Decisiones Técnicas y Arquitectura

### Punto de Partida: Template Consolidado

Este proyecto partió de una estructura base consolidada a través de cursos previos y experiencia práctica en desarrollo de APIs empresariales. Este template me permitió arrancar con:

- **Configuración de seguridad preestablecida**: CORS, Helmet, y protecciones base
- **Patrones de diseño probados**: Estructura modular, separación de responsabilidades
- **Herramientas de calidad**: ESLint, Prettier, Jest configurados
- **Best practices incorporadas**: Validaciones, manejo de errores, logging

Esto me permitió concentrarme en la lógica de negocio específica del dominio (empresas y transferencias) en lugar de configurar infraestructura básica desde cero.

### ¿Por qué NestJS?

Elegí NestJS como framework porque ofrece:

- **Arquitectura empresarial out-of-the-box**: Módulos, servicios, controladores bien definidos
- **TypeScript nativo**: Type-safety que previene errores en desarrollo y facilita refactoring
- **Decoradores potentes**: Simplifican validación, documentación, inyección de dependencias
- **Ecosistema maduro**: Integraciones con Swagger, testing, validación, etc.
- **Escalabilidad probada**: Usado en producción por empresas de todo tamaño

### Arquitectura Modular con Clean Code

Implementé una **arquitectura modular** siguiendo principios de **Clean Code** y **DRY** (Don't Repeat Yourself):

**Estructura de cada módulo:**

```
module/
├── controllers/     # Capa de presentación (HTTP)
├── services/        # Lógica de negocio
├── repository/      # Capa de acceso a datos
├── interfaces/      # DTOs y contratos
└── entities/        # Modelos de dominio
```

**¿Por qué modular y no hexagonal?**

Aunque la arquitectura hexagonal es poderosa, para este alcance opté por modular porque:

1. **Pragmatismo**: La complejidad de hexagonal no se justifica para un proyecto de este tamaño
2. **Claridad**: Más desarrolladores están familiarizados con módulos que con puertos/adaptadores
3. **Suficientemente desacoplado**: Los repositorios actúan como adaptadores, manteniendo la lógica separada de la persistencia
4. **Facilidad de testing**: La inyección de dependencias permite mockear fácilmente cada capa

**Aplicación de Clean Code:**

- **Nombres descriptivos**: `JsonCompanyRepository`, `CreateTransferDto`
- **Funciones pequeñas y enfocadas**: Cada método hace una cosa bien
- **Sin repetición**: Reutilización de validadores y transformadores
- **Separación de responsabilidades**: Cada clase tiene un propósito único
- **Código autodocumentado**: Los tipos y nombres explican la intención

### Seguridad en Múltiples Capas

Implementé un enfoque de **defensa en profundidad**:

#### 1. CORS Configurado

```typescript
// Previene accesos no autorizados desde dominios externos
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
});
```

#### 2. Rate Limiting (Anti-DDoS)

```typescript
// Throttler: 10 peticiones por 60 segundos por IP
// Previene ataques de denegación de servicio
```

- Protege contra bots y scrapers abusivos
- Mantiene la API disponible bajo carga

#### 3. Helmet para Headers Seguros

- **XSS Protection**: Previene inyección de scripts maliciosos
- **Content Security Policy**: Controla qué recursos puede cargar el navegador
- **HSTS**: Fuerza conexiones HTTPS
- **X-Frame-Options**: Previene clickjacking

#### 4. Prevención de Inyección SQL

Aunque uso JSON, la arquitectura está preparada para BD relacionales:

- **Uso de ORMs/Query Builders**: TypeORM, Prisma sanitizan automáticamente
- **Validación estricta de inputs**: Class-validator rechaza datos malformados
- **Separación de capas**: Los repositorios encapsulan el acceso a datos

### Validación Exhaustiva de Datos

Implementé **validación en dos niveles**:

#### Nivel 1: DTOs de Entrada

```typescript
@IsNotEmpty()
@IsString()
@MinLength(11)
@MaxLength(11)
company_cuit: string;
```

Ventajas:

- **Prevención temprana**: Falla rápido con errores descriptivos
- **Autodocumentación**: Los decoradores describen las reglas
- **Swagger automático**: La documentación se genera de las validaciones

#### Nivel 2: Validaciones de Negocio

```typescript
// En el servicio/repositorio
if (await this.existsByCuit(cuit)) {
  throw new ConflictException('Ya existe una empresa con ese CUIT');
}
```

Ventajas:

- **Integridad de datos**: Previene duplicados y estados inválidos
- **Lógica centralizada**: Las reglas viven en un solo lugar
- **Mensajes claros**: El usuario sabe exactamente qué corregir

### Documentación Interactiva Completa

Integré **Swagger/OpenAPI** con documentación exhaustiva:

**DTOs de Entrada documentados:**

```typescript
@ApiProperty({
  example: 'Empresa XYZ',
  description: 'Nombre de la empresa',
  minLength: 3,
  maxLength: 100,
})
```

**DTOs de Respuesta documentados:**

```typescript
@ApiResponse({
  status: 201,
  description: 'Empresa creada exitosamente',
  type: ResponseCompanyDto,
})
```

**Múltiples escenarios de respuesta:**

- Success (200, 201)
- Client errors (400, 404, 409)
- Server errors (500)

Esto permite:

- **Testing sin código**: Desarrolladores frontend pueden probar endpoints
- **Contrato claro**: Se documenta qué esperar en cada caso
- **Generación de clientes**: Se puede generar código cliente automáticamente

### Versionamiento de API y Documentación

Implementé versionamiento desde el inicio (`/api/v1/...`) porque:

**Ventajas inmediatas:**

- **Preparado para evolución**: Nuevas versiones no rompen clientes existentes
- **Estándar profesional**: Es una práctica esperada en APIs empresariales
- **Separación de documentación**: Cada versión tiene su propia documentación

**Cómo funciona:**

```typescript
@Version('1')
@Post()
create(@Body() dto: CreateDto) { ... }
```

Esto permite en el futuro tener `/api/v2/company` con cambios mientras `/api/v1/company` sigue funcionando.

### Persistencia en JSON: Decisión Pragmática

Usé archivos JSON en lugar de una base de datos tradicional:

**Ventajas para este proyecto:**

- ✅ **Zero setup**: No requiere instalación de PostgreSQL/MySQL
- ✅ **Portabilidad**: Funciona en cualquier entorno sin configuración
- ✅ **Debugging simple**: Los datos son legibles directamente
- ✅ **Apropiado para demos**: Suficiente para pruebas técnicas

**Preparado para migración:**

- La capa de repositorio encapsula todo el acceso a datos
- Cambiar a PostgreSQL solo requiere:
  1. Implementar nuevo repositorio con TypeORM
  2. Registrar en el módulo
  3. Cero cambios en servicios o controladores

**En producción usaría:**

- **PostgreSQL** con TypeORM o Prisma
- **Transacciones** para operaciones críticas
- **Índices** en campos de búsqueda (CUIT, nombre)
- **Migraciones** versionadas

### Nomenclatura y Buenas Prácticas en Entidades

Apliqué **convenciones de bases de datos profesionales**:

#### Nomenclatura Consistente

```typescript
// Prefijo del módulo + descripción
company_name;
company_cuit;
transfer_amount;
transfer_date;
```

Ventajas:

- **Evita colisiones**: No hay ambigüedad entre `name` de empresa vs transferencia
- **Mapeo directo a BD**: Los nombres funcionan bien en tablas SQL
- **Autocomplete útil**: IDE agrupa campos relacionados

#### Campos de Auditoría

Cada entidad incluye:

```typescript
id: string                    // UUID único
company_create_at: Date       // Timestamp de creación
company_updated_at?: Date     // Timestamp de modificación
company_is_active?: boolean   // Soft delete
```

Esto permite:

- **Trazabilidad**: Saber cuándo se creó/modificó cada registro
- **Soft deletes**: Marcar como inactivo en lugar de borrar
- **Auditoría**: Cumplir con requisitos regulatorios
- **Debugging**: Rastrear problemas temporales

### Testing Unitario Completo

Implementé tests exhaustivos para cada capa:

**Cobertura:**

- ✅ Controladores: Validación de endpoints
- ✅ Servicios: Lógica de negocio
- ✅ Repositorios: Operaciones de datos

**Estrategia de testing:**

```typescript
// Mock de dependencias
const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
};

// Test aislado
it('should create a company', async () => {
  mockRepository.create.mockResolvedValue(expected);
  const result = await service.create(dto);
  expect(result).toEqual(expected);
});
```

**Beneficios obtenidos:**

- **Confianza en refactors**: Puedo mejorar código sin miedo
- **Documentación ejecutable**: Los tests muestran casos de uso reales
- **Detección temprana**: Bugs encontrados antes de deployment
- **Desarrollo más rápido**: Test-driven development acelera iteraciones

### Separación de DTOs: Entrada vs Salida

Implementé DTOs específicos para cada flujo:

**DTOs de Entrada (`CreateCompanyDto`):**

- Solo campos que el cliente puede/debe enviar
- Validaciones estrictas
- No incluye campos autogenerados (id, timestamps)

**DTOs de Salida (`ResponseCompanyDto`):**

- Incluye campos calculados/autogenerados
- Puede omitir información sensible
- Agrega campos enriquecidos (como `transfers`)

**Ventajas:**

- **Seguridad**: El cliente no puede manipular `id` o `created_at`
- **Flexibilidad**: Puedo transformar datos sin cambiar la entidad
- **Contratos claros**: Swagger muestra exactamente qué esperar
- **Evolución independiente**: Puedo cambiar la respuesta sin afectar el input

### Conclusión

La combinación de un template probado, arquitectura modular con Clean Code, seguridad en capas, validación exhaustiva, documentación completa y testing riguroso resulta en una API:

- ✅ **Segura**: Protegida contra vulnerabilidades comunes
- ✅ **Mantenible**: Código limpio y bien organizado
- ✅ **Documentada**: Swagger interactivo y README completo
- ✅ **Confiable**: Tests garantizan funcionamiento correcto
- ✅ **Escalable**: Fácil agregar nuevos módulos
- ✅ **Profesional**: Cumple estándares de la industria

Este enfoque equilibra pragmatismo (JSON en lugar de BD completa) con profesionalismo (seguridad, testing, documentación), demostrando capacidad de tomar decisiones técnicas apropiadas al contexto.

## 📚 Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Swagger/OpenAPI](https://swagger.io/)
- [Class Validator](https://github.com/typestack/class-validator)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

