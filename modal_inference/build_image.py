import modal

image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("build-essential", "cmake", "pkg-config")
    .pip_install([
        "numpy==1.26.4",
        "scipy==1.11.4",
        "torch==2.1.0",
        "transformers==4.51.0",
        "accelerate==0.27.0",
        "bitsandbytes==0.41.3",
        "flash-attn==2.5.8",  # FlashAttention2 wheels for CUDA 11.8/12.x
        "sentencepiece==0.1.99",
        "protobuf==4.25.0",
        "fastapi==0.104.1",
        "uvicorn[standard]==0.24.0",
    ])
    .run_commands("python -c 'import torch; print(torch.__version__)'")
)

app = modal.App("build-image")

# Dummy function just to trigger the image build
@app.function(image=image)
def build():
    pass
