declare module "*/swagger/swagger.json" {
  interface SwaggerInfo {
    swagger: string,
    host: string,
    info: {
      title: string | null,
      description: string | null,
      version: string
    },
    schemes: 'https'[],
  }
  export interface SwaggerPathComponent {
    'x-swagger-router-controller': string,
    description: string | null,
    operationId: string,
    responses: object,
    summary: string | null,
    tags: string[]
  }

  export interface Swagger extends SwaggerInfo {
    paths: {[p: string]: {
        [m in 'get' | 'post' | 'put' | 'delete']: SwaggerPathComponent | null
      }
    },
    definitions: object
  }

  const value: Swagger;
  export default value;
}