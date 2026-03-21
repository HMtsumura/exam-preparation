# FastAPI Table of Contents Server

This project is a FastAPI application that retrieves table of contents (TOC) information from image data and returns it in JSON format.

## Project Structure

```
fastapi-toc-server
├── src
│   ├── main.py                # Entry point of the FastAPI application
│   ├── api
│   │   ├── __init__.py        # Initializer for the API package
│   │   └── routes.py          # Defines API routes for TOC retrieval
│   ├── services
│   │   ├── __init__.py        # Initializer for the services package
│   │   └── toc_extractor.py    # Contains the TOCExtractor class for processing images
│   ├── models
│   │   ├── __init__.py        # Initializer for the models package
│   │   └── schemas.py         # Defines data models and schemas
│   └── utils
│       ├── __init__.py        # Initializer for the utils package
│       └── helpers.py         # Utility functions for image processing
├── requirements.txt            # Lists project dependencies
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd fastapi-toc-server
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the FastAPI server, execute the following command:
```
uvicorn src.main:app --reload
```

Once the server is running, you can access the API documentation at `http://127.0.0.1:8000/docs`.

## API Endpoints

- `POST /toc`: Accepts image data and returns the extracted table of contents in JSON format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.