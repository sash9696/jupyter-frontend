import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import CustomAuthenticator (optional, if you're using it)
# from config.custom_authenticator import CustomAuthenticator

# Use the DummyAuthenticator for simplicity (for testing)
c.JupyterHub.authenticator_class = 'jupyterhub.auth.DummyAuthenticator'

# Allow all users (in case of DummyAuthenticator)
c.Authenticator.allow_all = True

# Set the admin users
# Replace with your actual admin usernames (you can list more than one)
c.Authenticator.admin_users = {'sahil', 'sahil2', 'sahil3'}

# Use the default LocalProcessSpawner (for local deployment)
c.JupyterHub.spawner_class = 'jupyterhub.spawner.LocalProcessSpawner'

# Enable named servers (allows users to specify a server name)
c.JupyterHub.allow_named_servers = True

# Set the base URL and the port for JupyterHub
c.JupyterHub.ip = '0.0.0.0'
c.JupyterHub.port = 8000

# Set the default URL after login (you can change this to '/lab' for JupyterLab)
c.JupyterHub.default_url = '/lab'

# Enable CORS to allow React app to communicate with JupyterHub
c.ServerApp.tornado_settings = {
    'headers': {
        'Access-Control-Allow-Origin': 'http://localhost:3000',  # React app's URL
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Credentials': 'true',
    }
}

# Logging level for JupyterHub
c.JupyterHub.log_level = 'DEBUG'

# Custom server naming logic (optional)
def pre_spawn_hook(spawner):
    """Set custom server names for users based on username."""
    if spawner.user.name == 'sahil':
        spawner.server_name = 'sahil_custom_server'  # Custom name for 'sahil'
    else:
        spawner.server_name = f"{spawner.user.name}_server"  # Default server name for other users

# Attach the hook to the spawner
c.Spawner.pre_spawn_hook = pre_spawn_hook

# Disable check for cross-site request forgery (if needed for front-end communication)
c.NotebookApp.disable_check_xsrf = True

# Set up cookie options for SameSite and Secure cookies (important for cross-origin requests)
c.ServerApp.cookie_options = {
    "SameSite": "None",
    "Secure": True,
}

# Set the root directory for notebook files (optional, set to a specific directory)
content_dir = os.path.dirname(os.path.realpath(__file__)) + '/../notebooks'
c.ServerApp.root_dir = content_dir
c.ServerApp.preferred_dir = content_dir

# JupyterHub URLs
c.ServerApp.base_url = '/api/jupyter'
c.ServerApp.default_url = '/api/jupyter/lab'

# Kernel WebSocket Protocol for Jupyter
c.ZMQChannelsWebsocketConnection.kernel_ws_protocol = None  # You can leave this as None or specify a protocol if needed

# Enable collaborative features in JupyterLab
c.LabApp.collaborative = True

# Optional: Disable terminal support (set to False if you want terminals enabled)
c.ServerApp.terminals_enabled = True

# Optional: Allow launching multiple servers per user (only needed if you want users to spawn more than one server)
c.JupyterHub.allow_named_servers = True
