FROM python:3.11-slim

WORKDIR /app/src

# Copy requirements and install Python dependencies
COPY fastapi-toc-server/requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy application code
COPY fastapi-toc-server/src /app/src

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
