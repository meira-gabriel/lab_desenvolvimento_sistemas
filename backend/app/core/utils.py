from django.db import connections


class Utils:
    def runQuery(self, query, rows=True):
        with connections['default'].cursor() as cursor:
            cursor.execute(query)
            if rows:
                rows = cursor.fetchall()
                return rows
            else:
                return True