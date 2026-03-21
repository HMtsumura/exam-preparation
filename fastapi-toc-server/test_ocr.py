#!/usr/bin/env python3
"""
OCR text extraction test script
Use this to verify that text is correctly extracted from images
"""

import sys
from pathlib import Path
import base64

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from src.services.toc_extractor import TOCExtractor

def test_extract_from_file(image_path):
    """Test extracting TOC from image file"""
    print(f"Testing OCR extraction from: {image_path}")
    print("=" * 60)
    
    toc_extractor = TOCExtractor()
    
    try:
        # Read image file
        with open(image_path, 'rb') as f:
            image_data = f.read()
        
        # Extract TOC
        result = toc_extractor.extract_toc(image_data)
        
        # Display results
        print(f"Status: {result['status']}")
        print(f"Total items found: {result['total_items']}")
        print("\nExtracted Table of Contents:")
        print("-" * 60)
        
        for i, item in enumerate(result['items'], 1):
            indent = "  " * (item['level'] - 1)
            print(f"{indent}[{item['level']}] {item['chapter']} (p. {item['page']})")
        
        print("-" * 60)
        return result
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def test_extract_from_base64(image_path):
    """Test extracting TOC from base64 encoded image"""
    print(f"\nTesting with base64 encoding from: {image_path}")
    print("=" * 60)
    
    toc_extractor = TOCExtractor()
    
    try:
        # Read and encode image
        with open(image_path, 'rb') as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')
        
        # Extract TOC
        result = toc_extractor.extract_toc(image_data)
        
        print(f"Status: {result['status']}")
        print(f"Total items found: {result['total_items']}")
        print("\nExtracted Items:")
        for item in result['items']:
            print(f"  - {item['chapter']} (p. {item['page']}, level: {item['level']})")
        
        return result
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    # Test with sample image (update path as needed)
    # Example: python test_ocr.py /path/to/image.jpg
    
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        if Path(image_path).exists():
            test_extract_from_file(image_path)
            test_extract_from_base64(image_path)
        else:
            print(f"Image file not found: {image_path}")
    else:
        print("Usage: python test_ocr.py <image_path>")
        print("\nExample:")
        print("  python test_ocr.py /path/to/toc.jpg")
