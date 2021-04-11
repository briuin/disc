FROM      python:3.9-alpine

ENV       FLASK_APP=app.py
ENV       FLASK_ENV=development

WORKDIR   /usr/src/app

EXPOSE    5000/tcp
CMD       ["flask", "run", "--host=0.0.0.0"]

COPY      requirements.txt .
RUN       pip install -r requirements.txt
COPY      . .
