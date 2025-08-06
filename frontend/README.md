<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

# Adventure Pathway

An interactive choose-your-own-adventure story generator powered by OpenAI's GPT models. Users can request stories with custom themes, and the AI generates complete branching narratives with multiple paths and endings.

## Features

- **AI-Generated Stories**: Dynamic story creation using OpenAI's GPT-4o-mini
- **Branching Narratives**: Multiple choice options leading to different story paths
- **Multiple Endings**: Stories include both winning and losing endings
- **Session Management**: Cookie-based session tracking for user continuity
- **Asynchronous Processing**: Background story generation with job status tracking
- **Theme Customization**: Users can specify themes for personalized stories

## Architecture

### Backend Structure

```
backend/
├── core/
│   ├── config.py          # Application settings and environment configuration
│   ├── models.py          # Pydantic models for LLM responses
│   ├── prompts.py         # Story generation prompts and templates
│   └── story_generation.py # Core story generation logic
├── db/
│   └── database.py        # SQLAlchemy database configuration
├── models/
│   ├── job.py            # Story generation job model
│   └── story.py          # Story and StoryNode database models
├── routers/
│   ├── job.py            # Job status API endpoints
│   └── story.py          # Story creation and retrieval endpoints
└── schemas/
    ├── job.py            # Job response schemas
    └── story.py          # Story request/response schemas
```

### Database Models

- **Story**: Contains story metadata (title, session_id, created_at)
- **StoryNode**: Individual story nodes with content, options, and ending flags
- **StoryJob**: Tracks asynchronous story generation jobs

### API Endpoints

#### Stories
- `POST /stories/create` - Create a new story generation job
- `GET /stories/{story_id}/complete` - Retrieve complete story with all nodes

#### Jobs  
- `GET /job/{job_id}` - Check story generation job status

## Installation & Setup

### Prerequisites

- Python 3.8+
- OpenAI API key
- SQLite (default) or other SQL database

### Environment Variables

Create a `.env` file in the backend directory:

```env
# OpenAI Configuration (for Choreo deployment)
CHOREO_OPENAICONNECTION_OPENAI_API_KEY=your_openai_api_key_here
CHOREO_OPENAICONNECTION_SERVICEURL=https://api.openai.com/v1

# Alternative OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Application Settings
DEBUG=false
DATABASE_URL=sqlite:///./adventure_pathway.db
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
API_PREFIX=/api
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adventure-pathway
   ```

2. **Install dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up the database**
   ```bash
   # The database will be created automatically when the application starts
   python -c "from db.database import create_tables; create_tables()"
   ```

4. **Run the application**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## Usage

### Creating a Story

1. **Start Story Generation**
   ```bash
   curl -X POST "http://localhost:8000/stories/create" \
        -H "Content-Type: application/json" \
        -d '{"theme": "fantasy adventure"}'
   ```

2. **Check Job Status**
   ```bash
   curl "http://localhost:8000/job/{job_id}"
   ```

3. **Retrieve Complete Story**
   ```bash
   curl "http://localhost:8000/stories/{story_id}/complete"
   ```

### Story Structure

Stories are generated with the following structure:
- **Root Node**: Starting situation with 2-3 options
- **Branching Paths**: Each option leads to new nodes with their own choices
- **Multiple Endings**: Both winning and losing outcomes
- **Depth**: Stories are typically 3-4 levels deep

### Example Response

```json
{
  "id": 1,
  "title": "The Enchanted Forest Quest",
  "session_id": "uuid-string",
  "created_at": "2024-01-01T10:00:00Z",
  "root_node": {
    "id": 1,
    "content": "You stand at the edge of an ancient forest...",
    "is_ending": false,
    "options": [
      {
        "text": "Enter the forest cautiously",
        "node_id": 2
      },
      {
        "text": "Call out to announce your presence",
        "node_id": 3
      }
    ]
  },
  "all_nodes": {
    "1": { /* root node details */ },
    "2": { /* option 1 node details */ },
    "3": { /* option 2 node details */ }
  }
}
```

## Configuration

### Story Generation Settings

The story generator can be customized through the prompts in `core/prompts.py`:

- **Story depth**: Adjust the number of levels (default: 3-4)
- **Options per node**: Modify the number of choices (default: 2-3)
- **Ending distribution**: Control the ratio of winning vs. losing endings

### Database Configuration

By default, the application uses SQLite. To use a different database:

```env
DATABASE_URL=postgresql://user:password@localhost/adventure_pathway
# or
DATABASE_URL=mysql://user:password@localhost/adventure_pathway
```

## API Documentation

When running the application, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Development

### Project Structure
- **FastAPI**: Web framework for the API
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and settings management
- **LangChain**: Integration with OpenAI for story generation
- **Background Tasks**: Asynchronous job processing

### Adding New Features

1. **New endpoints**: Add to appropriate router in `routers/`
2. **Database models**: Define in `models/` and create migrations
3. **Request/Response schemas**: Add to `schemas/`
4. **Business logic**: Implement in `core/`

## Deployment

The application is designed to work with Choreo (WSO2's integration platform) but can be deployed to any Python-compatible hosting service.

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Troubleshooting

### Common Issues

1. **OpenAI API Key**: Ensure your API key is valid and has sufficient credits
2. **Database Connection**: Check DATABASE_URL format and permissions
3. **CORS Issues**: Configure ALLOWED_ORIGINS for your frontend domain
4. **Job Stuck in Processing**: Check OpenAI API connectivity and error logs

### Logs

Story generation errors are captured in the StoryJob model's `error` field and can be retrieved via the job status endpoint.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## Support

For issues and questions, please open an issue in the repository or contact the development team.