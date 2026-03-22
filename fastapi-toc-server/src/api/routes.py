from fastapi import APIRouter, UploadFile, File
from fastapi.responses import Response
from services.toc_extractor import TOCExtractor
from services.image_converter import ImageConverter
import json
from typing import List

router = APIRouter()

@router.post("/extract-toc/")
async def extract_toc(files: List[UploadFile] = File(...)):
    toc_extractor = TOCExtractor()
    image_converter = ImageConverter()
    try:
        # 複数の画像ファイルから目次を抽出
        all_items = []
        
        for file in files:
            content = await file.read()
            
            # Convert HEIC to PNG if needed
            converted_content = image_converter.convert_if_needed(content, file.filename)
            
            # Extract TOC
            toc_data = toc_extractor.extract_toc(converted_content)
            
            # アイテムをマージ
            if toc_data.get("items"):
                all_items.extend(toc_data["items"])
        
        # チャプター番号を再附番
        for idx, item in enumerate(all_items, 1):
            if "chapter_number" not in item or not item["chapter_number"]:
                item["chapter_number"] = str(idx)
        
        response_data = {
            "status": "success",
            "data": {
                "status": "success",
                "title": files[0].filename if files else "Unknown",
                "items": all_items,
                "total_items": len(all_items)
            }
        }
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json")
    except Exception as e:
        response_data = {"status": "error", "message": str(e)}
        return Response(content=json.dumps(response_data, ensure_ascii=False), media_type="application/json", status_code=400)

@router.post("/debug-ocr/")
async def debug_ocr(file: UploadFile = File(...)):
    """Debug endpoint to see raw OpenAI Vision API output"""
    toc_extractor = TOCExtractor()
    image_converter = ImageConverter()
    try:
        content = await file.read()
        
        # Convert HEIC to PNG if needed
        converted_content = image_converter.convert_if_needed(content, file.filename)
        
        # Get raw text from OpenAI Vision API
        import base64
        base64_image = base64.b64encode(converted_content).decode('utf-8')
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