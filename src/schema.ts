import { makeSchema, queryType } from 'nexus'

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' })
  },
})

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
