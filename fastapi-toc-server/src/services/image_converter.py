from PIL import Image
from io import BytesIO
import os
import tempfile

class ImageConverter:
    """Convert various image formats to PNG for processing"""
    
    @staticmethod
    def convert_heic_to_png(file_content: bytes) -> bytes:
        """
        Convert HEIC/HEIF image to PNG format
        Args:
            file_content: bytes of the image file
        Returns:
            bytes: PNG image data
        """
        temp_heic = None
        try:
            # Register HEIF opener for PIL
            try:
                import pillow_heif
                pillow_heif.register_heif_opener()
            except ImportError:
                raise Exception("pillow-heif is required for HEIC support but not installed")
            
            # Write bytes to temporary file
            with tempfile.NamedTemporaryFile(suffix='.heic', delete=False) as tmp_heic:
                tmp_heic.write(file_content)
                temp_heic = tmp_heic.name
            
            # Open from file path
            heic_image = Image.open(temp_heic)
            
            # Save as PNG
            output = BytesIO()
            heic_image.save(output, format='PNG', quality=95)
            output.seek(0)
            return output.getvalue()
                
        except Exception as e:
            raise Exception(f"Failed to convert HEIC to PNG: {str(e)}")
        finally:
            # Clean up temporary file
            if temp_heic and os.path.exists(temp_heic):
                try:
                    os.remove(temp_heic)
                except:
                    pass
    
    @staticmethod
    def is_heic_format(filename: str) -> bool:
        """Check if file is HEIC/HEIF format"""
        ext = os.path.splitext(filename)[1].lower()
        return ext in ['.heic', '.heif']
    
    @staticmethod
    def convert_if_needed(file_content: bytes, filename: str) -> bytes:
        """
        Convert image if necessary, otherwise return as-is
        Args:
            file_content: bytes of the image file
            filename: original filename
        Returns:
            bytes: image data (converted if HEIC, otherwise original)
        """
        if ImageConverter.is_heic_format(filename):
            return ImageConverter.convert_heic_to_png(file_content)
        return file_content
    
    @staticmethod
    def is_heic_format(filename: str) -> bool:
        """Check if file is HEIC/HEIF format"""
        ext = os.path.splitext(filename)[1].lower()
        return ext in ['.heic', '.heif']
    
    @staticmethod
    def convert_if_needed(file_content: bytes, filename: str) -> bytes:
        """
        Convert image if necessary, otherwise return as-is
        Args:
            file_content: bytes of the image file
            filename: original filename
        Returns:
            bytes: image data (converted if HEIC, otherwise original)
        """
        if ImageConverter.is_heic_format(filename):
            return ImageConverter.convert_heic_to_png(file_content)
        return file_content
