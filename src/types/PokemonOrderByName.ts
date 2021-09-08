import { enumType, inputObjectType } from 'nexus'

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

export default inputObjectType({
  name: 'PokemonOrderByName',
  definition(t) {
    t.nonNull.field('name', { type: SortOrder })
  },
})
