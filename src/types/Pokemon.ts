import { Pokemon } from 'nexus-prisma'
import { objectType } from 'nexus'

export default objectType({
  name: Pokemon.$name,
  definition(t) {
    t.field(Pokemon.id)
    t.field(Pokemon.name)
    t.field(Pokemon.hp)
    t.field(Pokemon.attack)
  },
})
