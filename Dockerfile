# Gunakan image Python yang ringan
FROM python:3.9-slim

# Set working directory di dalam container
WORKDIR /app

# Install g++ dan dependensi lainnya untuk build
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy file requirements dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy seluruh kode project ke dalam container
COPY . .

# Download model dari Google Drive (menggunakan script yang sudah kita buat)
# Kita jalankan saat build agar saat container nyala file sudah ada
RUN python backend/setup_models.py

# Hugging Face Spaces menggunakan port 7860 secara default
EXPOSE 7860

# Pindah ke direktori backend sebelum menyalakan server agar import python tidak error
WORKDIR /app/backend

# Jalankan aplikasi menggunakan gunicorn di port 7860
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "1", "--timeout", "0", "app:app"]
