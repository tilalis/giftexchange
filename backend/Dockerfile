FROM python:3.6

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

ENTRYPOINT ["gunicorn", "-c", "python:config", "app:app"]