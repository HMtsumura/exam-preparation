from PIL import Image
import re
from io import BytesIO
import base64
import os
from openai import OpenAI

class TOCExtractor:
    def __init__(self):
        """Initialize OpenAI client"""
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        self.client = OpenAI(api_key=api_key)

    def extract_toc(self, image_data):
        """
        Extract table of contents from image data using OpenAI Vision API
        Args:
            image_data: base64 encoded image string or file bytes
        Returns:
            dict: Structured TOC data in JSON format
        """
        try:
            import json
            
            # Convert image data to base64
            if isinstance(image_data, str):
                base64_image = image_data
            else:
                base64_image = base64.b64encode(image_data).decode('utf-8')
            
            # Call OpenAI Vision API
            raw_text = self._extract_text_with_openai(base64_image)
            
            # Parse JSON directly without additional formatting
            cleaned_text = raw_text.strip()
            if cleaned_text.startswith('```json'):
                cleaned_text = cleaned_text[7:]
            if cleaned_text.startswith('```'):
                cleaned_text = cleaned_text[3:]
            if cleaned_text.endswith('```'):
                cleaned_text = cleaned_text[:-3]
            
            toc_items = json.loads(cleaned_text.strip())
            
            return {
                "status": "success",
                "title": "Table of Contents",
                "items": toc_items,
                "total_items": len(toc_items)
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
                "items": []
            }
    
    def _extract_text_with_openai(self, base64_image):
        """Extract text from image using OpenAI Vision API"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{base64_image}"
                                }
                            },
                            {
                                "type": "text",
                                "text": """Extract the table of contents from this image and return as JSON format.

For each table of contents entry, identify the hierarchy level and extract:
- chapter_number: The chapter/section number (e.g., "1.1", "第1章", "1-1", etc.)
- title: The title/name of the chapter/section
- page_number: The page number where it starts
- level: The hierarchy level (1 for main chapters, 2+ for subsections)
- parent_title: (Optional) The parent section title if this is a subsection

Do NOT include dots, ellipses (...), or decorative elements in the title.

Detect hierarchy by:
- Indentation/formatting in the TOC
- Number patterns (e.g., "1", "1.1", "1.1.1")
- Text size/styling differences

Return ONLY a valid JSON array with the following structure:
[
  {
    "chapter_number": "...",
    "title": "...",
    "page_number": number,
    "level": 1,
    "parent_title": null
  },
  {
    "chapter_number": "...",
    "title": "...",
    "page_number": number,
    "level": 2,
    "parent_title": "Parent Title"
  },
  ...
]"""
                            }
                        ]
                    }
                ],
                max_tokens=2000
            )
            
            return response.choices[0].message.content
        except Exception as e:
            raise ValueError(f"OpenAI API error: {str(e)}")