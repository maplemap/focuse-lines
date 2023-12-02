FROM python:3.11.5-alpine
WORKDIR /usr/src/app

COPY ./requirements.txt requirements.txt

RUN apk add gcc musl-dev python3-dev libffi-dev openssl-dev
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-u", "endpoints.py"]
