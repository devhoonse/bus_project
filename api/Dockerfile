FROM continuumio/miniconda3

#ADD static/data_collection /home/gomata/src/api/static
ADD . /home/gomata/src/api
WORKDIR /home/gomata/src/api

COPY environment.yaml .
RUN conda env create -f environment.yaml
RUN /opt/conda/envs/gomata_api/bin/pip install gunicorn
RUN /opt/conda/envs/gomata_api/bin/pip install flask
RUN /opt/conda/envs/gomata_api/bin/pip install flask_restx
RUN /opt/conda/envs/gomata_api/bin/pip install pandas

RUN chmod -R 755 /home/gomata/src/api

CMD /opt/conda/envs/gomata_api/bin/gunicorn --bind 0:7070 --workers 1 --threads 2 "factory:create_app()"