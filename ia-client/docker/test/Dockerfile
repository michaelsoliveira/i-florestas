# Use the official Python base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip3 install -r requirements.txt

# Copy the application code to the working directory
COPY ./app .

# Expose the port on which the application will run
EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "main.py", "--server.port=8501", "--server.address=0.0.0.0"]