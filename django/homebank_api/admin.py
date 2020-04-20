from django.contrib.admin import AdminSite

class HomebankAdminSite(AdminSite):
    site_tite = 'Homebank Administration'

admin_site = HomebankAdminSite()