from pony import orm

db = orm.Database()


class Box(db.Entity):
    id = orm.PrimaryKey(int, auto=True)
    name = orm.Required(str)
    hash = orm.Required(str)
    savtas = orm.Set("Savta", reverse="box")


class Savta(db.Entity):
    box = orm.Required(Box, reverse="savtas")
    name = orm.Required(str)
    hash = orm.Required(str)

    nekhed = orm.Optional("Savta", reverse="savta")
    savta = orm.Optional("Savta", reverse="nekhed")

    letter_opened = orm.Required(bool, default=False)

