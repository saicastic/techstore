# Furno 3D Furniture AI API Documentation

## Authentication Endpoints

### `POST /CreateNewUser`

- **Method**: POST
- **Request Parameters**:
  - `email`: EmailStr (required) - User's email address
  - `password`: String (required) - User's password
- **Response**:
  ```json
  {
    "status": true,
    "user_id": "user_12345"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "message": "The email already exists in the system"
  }
  ```
- **Purpose**: Create a new user account

### `POST /LoginUser`

- **Method**: POST
- **Request Parameters**:
  - `email`: EmailStr (required) - User's email address
  - `password`: String (required) - User's password
- **Response**:
  ```json
  {
    "status": true,
    "user_id": "user_12345"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "message": "Email or Password is wrong"
  }
  ```
- **Purpose**: User login authentication

## Scene Management Endpoints

### `POST /create-scene`

- **Method**: POST
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
- **Request Body**:
  ```json
  {
    "scene_name": "Living Room",
    "scene_dim": "100x100"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "scene_code": "scene_2a5886c6",
    "message": "Scene created successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "error": "User not found"
  }
  ```
- **Purpose**: Create a new scene for a user

### `GET /get-scene/{user_id}/{scene_id}`

- **Method**: GET
- **Path Parameters**:
  - `user_id`: String (required) - User identifier
  - `scene_id`: String (required) - Scene identifier
- **Response**:
  ```json
  {
    "status": true,
    "scene_id": "scene_2a5886c6",
    "scene": {
      "info": {
        "scene_name": "Living Room",
        "scene_dim": "100x100",
        "models_created": 5,
        "created_at": "2023-06-15T10:30:00.000Z",
        "status": "in_use",
        "last_updated": "2023-06-15T11:45:00.000Z"
      },
      "models": [
        {
          "model_id": "model_12345678",
          "name": "Sofa",
          "category": "furniture",
          "model_url": "s3://bucket/user_id/scene_id/model_12345678.glb",
          "pos_ref": "A",
          "dim": { "w": 1, "l": 1, "d": 1 },
          "pos": { "x": 0, "y": 0, "z": 0 },
          "rotation": { "x": 0, "y": 0, "z": 0 }
        }
      ],
      "textures": [
        {
          "texture_id": "texture_12345678",
          "texture_name": "wall",
          "texture_url": "s3://bucket/user_id/scene_id/texture_12345678.jpg",
          "texture_ref": "A"
        }
      ]
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "Scene not found"
  }
  ```
- **Purpose**: Retrieve specific scene data

### `GET /list-scenes`

- **Method**: GET
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
- **Response**:
  ```json
  {
    "status": true,
    "scenes": [
      {
        "scene_id": "scene_2a5886c6",
        "scene_name": "Living Room",
        "scene_dim": "100x100",
        "created_at": "2023-06-15T10:30:00.000Z",
        "last_updated": "2023-06-15T11:45:00.000Z",
        "model_count": 5,
        "texture_count": 3
      }
    ],
    "total_scenes": 1
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "User not found"
  }
  ```
- **Purpose**: List all scenes for a user

### `DELETE /delete-scene/{scene_id}`

- **Method**: DELETE
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
- **Path Parameters**:
  - `scene_id`: String (required) - Scene identifier
- **Response**:
  ```json
  {
    "status": true,
    "message": "Scene deleted successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "Scene not found"
  }
  ```
- **Purpose**: Delete a specific scene and its associated data

### `PUT /save-scene/{user_id}/{scene_id}`

- **Method**: PUT
- **Path Parameters**:
  - `user_id`: String (required) - User identifier
  - `scene_id`: String (required) - Scene identifier
- **Request Body**:
  ```json
  {
    "scene_dim": "100x100",
    "models": [
      {
        "name": "Sofa",
        "pos": { "x": 10, "y": 0, "z": 20 },
        "rotation": { "x": 0, "y": 45, "z": 0 },
        "dim": { "w": 2, "l": 1, "d": 0.8 }
      }
    ],
    "textures": []
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "Scene saved successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "Failed to save scene"
  }
  ```
- **Purpose**: Save scene data with updated model positions and dimensions

## Content Generation Endpoints

### `POST /generate`

- **Method**: POST
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
- **Request Body**:
  ```json
  {
    "prompt": "Generate a wooden dining table with four chairs",
    "scene_id": "scene_2a5886c6"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "models": [
      {
        "model_id": "model_12345678",
        "name": "Dining Table",
        "category": "furniture",
        "model_url": "s3://bucket/user_id/scene_id/model_12345678.glb",
        "pos_ref": "A",
        "dim": { "w": 1, "l": 1, "d": 1 },
        "pos": { "x": 0, "y": 0, "z": 0 },
        "rotation": { "x": 0, "y": 0, "z": 0 }
      }
    ],
    "textures": [],
    "applied_model": [],
    "applied_texture": []
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "error": "Please enter at least one type from: furniture, walls, floor, roof"
  }
  ```
- **Purpose**: Generate 3D models, textures, and objects based on a text prompt

### `POST /validate-coupon`

- **Method**: POST
- **Request Body**:
  ```json
  {
    "user_id": "user_12345",
    "coupon_code": "SUMMER2023"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "Credits have been added"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "message": "No such coupon"
  }
  ```
- **Purpose**: Validate coupon codes to increase user's model generation limit

## Asset Management Endpoints

### `GET /get-texture-url`

- **Method**: GET
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
  - `scene_id`: String (required) - Scene identifier
  - `texture_name`: String (required) - Texture name to retrieve
- **Response**:
  ```json
  {
    "status": true,
    "message": "Texture URL fetched successfully",
    "url": "s3://bucket/user_id/scene_id/texture_12345678.jpg"
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "Texture 'wall' not found in scene 'scene_2a5886c6' for user 'user_12345'"
  }
  ```
- **Purpose**: Get the URL for a specific texture in a scene

### `POST /download_model`

- **Method**: POST
- **Request Body**:
  ```json
  {
    "user_id": "user_12345",
    "scene_id": "scene_2a5886c6",
    "model_name": "Sofa"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "Model URL fetched successfully",
    "url": "s3://bucket/user_id/scene_id/model_12345678.glb"
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "Model 'Sofa' not found in scene 'scene_2a5886c6' for user 'user_12345'"
  }
  ```
- **Purpose**: Get the URL for a specific 3D model in a scene

### `DELETE /delete/{filename:path}`

- **Method**: DELETE
- **Path Parameters**:
  - `filename`: String (required) - File path to delete
- **Query Parameters**:
  - `base_path`: String (required) - Base path for the file
  - `user_id`: String (required) - User identifier
  - `scene_id`: String (required) - Scene identifier
- **Response**:
  ```json
  {
    "status": true,
    "message": "File deleted successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": false,
    "detail": "File not found or permission denied"
  }
  ```
- **Purpose**: Delete files from storage

## System Endpoints

### `GET /get-rate-limits`

- **Method**: GET
- **Query Parameters**:
  - `user_id`: String (required) - User identifier
- **Response**:
  ```json
  {
    "status": true,
    "info": {
      "models_created": 15,
      "scene_created": 3
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "detail": "User not found"
  }
  ```
- **Purpose**: Get user's rate limit information

### `GET /health`

- **Method**: GET
- **Response**:
  ```json
  {
    "status": "healthy",
    "database": "connected"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": "unhealthy",
    "database": "disconnected",
    "error": "Connection refused"
  }
  ```
- **Purpose**: Health check endpoint to verify system and database status
