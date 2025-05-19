const env = {
    VITE_API_URL: "http://127.0.0.1:5000",
    AZURE_OAUTH_CONFIG: {
        appId: "ae6d6cfc-4199-4ab9-acf0-e876e6d651db",
        redirectUri: "http://localhost:3000",
        scopes: [
            "user.read"
        ]
    },
    GOOGLE_OAUTH_CONFIG:{
        clientId: "1014147833890-0428rcbr9oq26tbugk7tufu2brhnrlbe.apps.googleusercontent.com"
    }, 
    BASE_URL: "http://localhost:5000",
    MOCK_SERVER: "https://ebfa2ade-2745-43a6-bb1f-37ead7207a95.mock.pstmn.io"
}

export default env;