def seed_categories(apps, schema_editor):
    Category = apps.get_model('transaction_management', 'Category')

    name_index = 0
    description_index = 1
    categories = [
        ('Hypotheek', 'Vaste lasten voor je huis'),
        ('Woning',
         'Uitgaven aan uw woning, zoals de uitgaven voor onderhoud van uw woning en inboedel. De netto woonlasten van uw huur- of koopwoning zijn hierbij niet inbegrepen. Dit zijn de kosten voor huur of hypotheek.'),
        ('Huishoudelijke uitgaven', 'Uitgaven aan boodschappen, kleding en verzorging.'),
        ('Energie en vaste lasten',
         'Hieronder vallen belastingen, heffingen en uitgaven aan gas, elektra, internet, tv en telefoon.'),
        ('Vervoer', 'Uitgaven aan uw auto of andere vervoersmiddelen.'),
        ('Vrijetijdsuitgaven', 'Uitgaven aan ontspanning, recreatie, vakantie en contributies.'),
        ('Onvoorziene uitgaven', 'Hieronder vallen uitgaven, zoals verzekeringen, ziektekosten en studiekosten.')
    ]

    for category in categories:
        Category.objects.create(name=category[name_index], description=category[description_index])


