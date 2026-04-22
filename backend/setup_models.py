import os
import gdown

def setup():
    # Folder target
    model_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Model')
    
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        print(f"Created directory: {model_dir}")

    # Daftar file yang perlu didownload
    models = {
        'cosine_sim.pkl': '1Nj-3o3_5JHEcyDEX0K9us28I-CP8UGNC',
        'movies_data.pkl': '1tm9koLBFX5X0R2WZbrEWd2749SpWyvk8',
        'svd_model.pkl': '16DJGtmwLE_OcHVc6LaQnVm9Ol9ypTBTr'
    }
    
    for filename, gdrive_id in models.items():
        file_path = os.path.join(model_dir, filename)
        
        if not os.path.exists(file_path):
            print(f"File {filename} tidak ditemukan. Memulai download dari Google Drive...")
            url = f'https://drive.google.com/uc?id={gdrive_id}'
            
            try:
                # Download menggunakan gdown
                gdown.download(url, file_path, quiet=False)
                print(f"Download {filename} selesai!")
            except Exception as e:
                print(f"Gagal mendownload {filename}: {e}")
        else:
            print(f"File {filename} sudah ada. Skip download.")

if __name__ == "__main__":
    setup()
