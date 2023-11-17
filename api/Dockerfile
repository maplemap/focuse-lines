FROM python:3.9.10-alpine3.14

WORKDIR /usr/src/app

RUN pip install --upgrade pip
RUN pip install flask

COPY requirements.txt /usr/src/app/requirements.txt

RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY . .
