from fastapi import APIRouter, UploadFile, File
from fastapi.responses import Response
from services.toc_extractor import TOCExtractor
import json

router = APIRouter()

@router.post("/extract-toc/")
async def extract_toc(file: UploadFile = File(...)):
    toc_extractor = TOCExtractor()
    try:
        # Read file content
        content = await file.read()
        # Extract TOC
        toc_data = toc_extractor.extract_toc(content)
        response_data = {"status": "success", "data": toc_data}
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json")
    except Exception as e:
        response_data = {"status": "error", "message": str(e)}
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json", status_code=400)

@router.post("/debug-ocr/")
async def debug_ocr(file: UploadFile = File(...)):
    """Debug endpoint to see raw OpenAI Vision API output"""
    toc_extractor = TOCExtractor()
    try:
        content = await file.read()
        # Get raw text from OpenAI Vision API
        import base64
        base64_image = base64.b64encode(content).decode('utf-8')
        raw_text = toc_extractor._extract_text_with_openai(base64_image)
        
        response_data = {
            "status": "success",
            "raw_text": raw_text,
            "text_lines": raw_text.split('\n')
        }
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json")
    except Exception as e:
        response_data = {"status": "error", "message": str(e)}
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json", status_code=400)

def setup_routes(app):
    app.include_router(router)