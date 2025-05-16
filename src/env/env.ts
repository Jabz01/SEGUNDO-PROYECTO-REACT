const env = {
    VITE_API_URL: "http://127.0.0.1:5000",
    AZURE_OAUTH_CONFIG: {
        appId: "ae6d6cfc-4199-4ab9-acf0-e876e6d651db",
        redirectUri: "http://localhost:3000",
        scopes: [
            "user.read"
        ]
    }
}

export default env;