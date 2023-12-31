FROM python:3.9-slim-buster

COPY . .
WORKDIR .
RUN python3 -m pip install -r requirements.txt
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0"]


