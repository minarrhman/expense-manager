from datetime import datetime, timedelta
from django.utils.timezone import now 


def get_date_range(request):

    today = now().date()

    days = request.query_params.get('days')
    start_date = request.query_params.get('start')
    end_date = request.query_params.get('end')

    if days:
        days = int(days)
        start = today - timedelta(days=days)
        end = today
        return start, end
    
    elif start_date or end_date:
        start = datetime.strptime(start_date,"%Y-%m-%d").date()
        end = datetime.strptime(end_date,"%Y-%m-%d").date()
        return start, end
    else:
        start = today.replace(day=1)
        end = today
        return start, end