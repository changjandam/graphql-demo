import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schema.ts',
  generates: {
    'src/generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context.js#ContextValue',
        mappers: {
          User: '../models.js#UserModel',
          Vehicle: '../models.js#VehicleModel',
        },
      },
    },
  },
};

export default config;
