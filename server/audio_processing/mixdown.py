import os
import uuid
from fastapi import HTTPException
from pydub import AudioSegment
import ffmpeg

def convert_to_mp3(input_path, output_path, params):
    try:
        # Apply DSP effects using ffmpeg
        (
            ffmpeg
            .input(input_path)
            .filter('adelay', f"{params.get('delay', 0)}|{params.get('delay', 0)}")
            .filter('aecho', 0.8, 0.9, 1000, 0.3)
            .output(output_path, acodec='libmp3lame', audio_bitrate='192k')
            .overwrite_output()
            .run(quiet=True)
        )
        return True
    except ffmpeg.Error as e:
        raise HTTPException(500, f"FFmpeg error: {e.stderr.decode()}")

async def process_mixdown(audio_file, params):
    temp_id = uuid.uuid4().hex
    input_path = f"/tmp/{temp_id}.wav"
    output_path = f"/tmp/{temp_id}.mp3"
    
    # Save uploaded file
    with open(input_path, "wb") as buffer:
        buffer.write(await audio_file.read())
    
    # Process audio
    if not convert_to_mp3(input_path, output_path, params):
        return None
    
    # Cleanup
    os.remove(input_path)
    return output_path