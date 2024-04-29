# This sets up the container with Python 3.10 installed.
FROM python:3.11-slim

# This copies everything in your current directory to the /app directory in the container.
COPY ./app ./app
COPY ./requirements.txt ./app
COPY config.toml ./app
COPY credentials.toml ./app
# This sets the /app directory as the working directory for any RUN, CMD, ENTRYPOINT, or COPY instructions that follow.
WORKDIR /app

# This runs pip install for all the packages listed in your requirements.txt file.
RUN pip3 install -r requirements.txt

# This tells Docker to listen on port 80 at runtime. Port 80 is the standard port for HTTP.
EXPOSE 8501

# This command creates a .streamlit directory in the home directory of the container.
RUN mkdir ~/.streamlit

# This copies your Streamlit configuration file into the .streamlit directory you just created.
RUN cp config.toml ~/.streamlit/config.toml

# Similar to the previous step, this copies your Streamlit credentials file into the .streamlit directory.
RUN cp credentials.toml ~/.streamlit/credentials.toml

# Expose the port on which the application will run
EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "main.py", "--server.port=8501", "--server.address=0.0.0.0"]