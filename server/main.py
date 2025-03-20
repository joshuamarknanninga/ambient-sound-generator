from fastapi import FastAPI, File, UploadFile
from audio_processing.mixdown import process_mixdown
import os

app = FastAPI()

@app.post("/mixdown")
async def create_mixdown(
    audio: UploadFile = File(...),
    params: str = Form(...)
):
    try:
        output_path = await process_mixdown(audio, eval(params))
        return {"url": f"/download/{os.path.basename(output_path)}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/download/{filename}")
async def download_file(filename: str):
    return FileResponse(
        path=f"/tmp/{filename}",
        media_type='audio/mpeg',
        filename=f"ambient-mix.mp3"
    )