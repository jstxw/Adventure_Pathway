from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title='FastAPI',
    description='Adventure_Story',
    version= '0.1.0',
    docs_url='/docs',
    redoc_url='/redoc',
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True, # allow api endpoints to be set
    allow_methods=["*"], #allow post, get, put
    allow_headers=["*"],
)

if __name__ == "__main__": #only run the following if ran only in this file
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True)

