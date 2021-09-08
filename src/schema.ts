import { arg, intArg, makeSchema, queryType } from 'nexus'
import { Context } from './context'
import Pokemon from './types/Pokemon'
import PokemonOrderByName from './types/PokemonOrderByName'

const Query = queryType({
  definition(t) {
    t.list.field('getAllPokemons', {
      type: Pokemon,
      args: {
        cursor: intArg(),
        take: intArg(),
        skip: intArg(),
        orderBy: arg({
          type: PokemonOrderByName,
        }),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.pokemon.findMany({
          take: args.take ?? 10,        //Returns up to 10 Pokemons in one query
          skip: args.skip ?? 0,         //Result doesn't skip any items
          cursor: {
            id: args.cursor ?? 1,       //Cursor points to pokemon with id = 1
          },
          orderBy: args.orderBy ?? {    //Default order is asc
            name: 'asc',
          },
        })
      },
    })
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
