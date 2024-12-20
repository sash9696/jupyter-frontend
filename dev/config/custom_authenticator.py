from jupyterhub.auth import Authenticator
import hashlib

class CustomAuthenticator(Authenticator):
    async def authenticate(self, handler, data):
        """
        Override this method to authenticate the user based on the token passed
        from the React app (stored in localStorage).
        """
        token = data.get('token')

        if token:
            # Generate token based on username (imitating token generation)
            username = await self.get_username_from_token(token)
            if username:
                return username  # Authenticate with the generated username

        return None  # If token is invalid or not found, return None to reject the login

    def generate_token_for_user(self, username):
        """
        Return a predefined token for each username. This allows us to test with a static token.
        """
        predefined_tokens = {
            'sahil': 'guest12345',
            'sahil2': 'user2token',
            'sahil3': 'user3token',
        }

        return predefined_tokens.get(username)

    async def get_username_from_token(self, token):
        """
        Check if the token matches one of the predefined tokens and return the associated username.
        """
        predefined_tokens = {
            'guest12345': 'sahil',
            'user2token': 'sahil2',
            'user3token': 'sahil3',
        }

        return predefined_tokens.get(token)
