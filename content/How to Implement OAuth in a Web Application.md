up:: [[Application & Software Security Labs]]
## Implement OAuth in a Web Application

OAuth (Open Authorization) allows apps to securely access users' information without requiring them to enter a password. In this project, you’ll learn to add OAuth to a Flask web app using GitHub as the OAuth provider, meaning GitHub will handle authentication.

---

### Prerequisites

Before starting, make sure you have:

- **Basic Python and web development knowledge** (you should understand how to create basic routes and functions in Flask).
- **A GitHub account** (you’ll use GitHub as the OAuth provider).
- **Python installed** on your computer (check by typing `python --version` in a terminal).

---

### Step 1: Set Up the Development Environment

To get started, you’ll need to set up Python and a virtual environment, and then install the necessary libraries.

1. **Install Python**

   - Confirm that Python is installed by running: `python --version`.
   - If Python isn’t installed, download it from [python.org](https://www.python.org/downloads/).

2. **Set Up a Virtual Environment**

   - Virtual environments help you manage project-specific libraries, which is useful for keeping dependencies organized.
   - Create and activate a virtual environment by running:

     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
     ```

3. **Install Flask and Dependencies**

   - Install Flask and Flask-OAuthlib (a library that helps manage OAuth with Flask) by running:

     ```bash
     pip install Flask Flask-OAuthlib
     ```

---

### Step 2: Register Your Application with GitHub

To use GitHub for OAuth, you need to create an OAuth app in your GitHub account. This process will generate a **Client ID** and **Client Secret** for your app, which you’ll use to connect with GitHub.

1. **Go to GitHub Developer Settings**

   - Go to [https://github.com/settings/developers](https://github.com/settings/developers) and click on **"OAuth Apps"**.

2. **Register a New OAuth Application**

   - Click **"New OAuth App"** and fill in the application details:
     - **Application name**: Give it a name, like "My Flask OAuth App".
     - **Homepage URL**: Enter `http://127.0.0.1:5000/`.
     - **Authorization callback URL**: Enter `http://127.0.0.1:5000/login/callback`.
   - Click **Register application**.

3. **Copy the Client ID and Client Secret**

   - GitHub will give you a **Client ID** and **Client Secret**. Save these securely, as you’ll need them in your Flask app.

   > **Tip:** Keep your Client Secret private! Anyone with access to it could misuse your app’s permissions.

---

### Step 3: Create the Web Application

Now that you have your GitHub credentials, it’s time to create your Flask app and add OAuth functionality.

1. **Create the Main Application File**

   - Create a new file called `app.py` and paste in the following code:

     ```python
     from flask import Flask, redirect, url_for, session, request, jsonify
     from flask_oauthlib.client import OAuth
     import os

     app = Flask(__name__)
     app.secret_key = os.urandom(24)  # Secret key for session management

     oauth = OAuth(app)
     github = oauth.remote_app(
         'github',
         consumer_key='YOUR_CLIENT_ID',  # Replace with your Client ID
         consumer_secret='YOUR_CLIENT_SECRET',  # Replace with your Client Secret
         request_token_params={'scope': 'user:email'},
         base_url='https://api.github.com/',
         request_token_url=None,
         access_token_method='POST',
         access_token_url='https://github.com/login/oauth/access_token',
         authorize_url='https://github.com/login/oauth/authorize'
     )

     @app.route('/')
     def index():
         return 'Welcome to the Flask OAuth App Lab. Lets get secure!'

     @app.route('/login')
     def login():
         return github.authorize(callback=url_for('authorized', _external=True))

     @app.route('/logout')
     def logout():
         session.pop('github_token', None)
         return redirect(url_for('index'))

     @app.route('/login/callback')
     def authorized():
         response = github.authorized_response()
         if response is None or response.get('access_token') is None:
             return 'Access denied: reason={} error={}'.format(
                 request.args.get('error'), request.args.get('error_description')
             )
         session['github_token'] = (response['access_token'], '')
         user = github.get('user')
         return jsonify(user.data)

     @github.tokengetter
     def get_github_oauth_token():
         return session.get('github_token')

     if __name__ == '__main__':
         app.run(debug=True)
     ```

   - Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the values from GitHub.

---

### Step 4: Run the Application

1. **Start the Flask App**

   - In your terminal, run:

     ```bash
     python app.py
     ```

   - The app will start on `http://127.0.0.1:5000/`.

2. **Test the OAuth Flow**

   - Open `http://127.0.0.1:5000/` in your browser.
   - Click the login link. You’ll be redirected to GitHub, where you can authorize the app.
   - After authorizing, GitHub will send you back to the Flask app, displaying your GitHub user profile data.

   > **Tip:** If the OAuth flow doesn’t work, double-check the Client ID, Client Secret, and URLs you registered with GitHub.

---

### Step 5: Secure the Application

Storing secrets (like Client ID and Client Secret) directly in the code is risky. Let’s improve security by moving these secrets into environment variables.

1. **Store Secrets in Environment Variables**

   - Update `app.py` to load secrets from environment variables. Replace `consumer_key` and `consumer_secret` in the app configuration with:

     ```python
     consumer_key=os.getenv('GITHUB_CLIENT_ID'),
     consumer_secret=os.getenv('GITHUB_CLIENT_SECRET'),
     ```

   - Set the environment variables before running the application:

     ```bash
     export GITHUB_CLIENT_ID='your_client_id'
     export GITHUB_CLIENT_SECRET='your_client_secret'
     python app.py
     ```

   > **Tip:** Use `.env` files and a library like `python-dotenv` to load environment variables automatically in development.

2. **Use HTTPS in Production**

   - For production, always use HTTPS to keep data secure in transit.

---

### Step 6: Document Your Application

Documentation helps others understand and set up your app. Make sure to include:

1. **Configuration Details**

   - Document the environment variables, Flask configuration, and GitHub OAuth setup.

2. **Usage Instructions**

   - Include clear instructions for setting up the environment variables, running the app, and troubleshooting common issues.

---

### Troubleshooting Tips

- **Error: Missing Client ID or Client Secret**: Double-check that you’ve set the Client ID and Client Secret as environment variables or that you’ve pasted them correctly in the code.
- **Callback URL error**: Ensure the callback URL in GitHub’s settings exactly matches the URL in your app.
- **"Access Denied" error**: This usually happens if permissions aren’t granted on GitHub. Try logging in again and making sure you authorize the app.

---

### Conclusion

Congratulations! You’ve implemented OAuth in a Flask web application using GitHub. This project allows you to authenticate users without needing to store passwords. Practice with other OAuth providers, like Google or Facebook, to deepen your understanding of OAuth and improve your app’s security.

---
### Where to Find Assistance

1. **Flask Documentation** - For foundational Flask concepts and setup, visit the [Flask Documentation](https://flask.palletsprojects.com/).
2. **GitHub OAuth Documentation** - Understand the OAuth flow and specific configurations needed for GitHub by reviewing the [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps).
3. **Stack Overflow** - A vast community where you can ask specific questions about implementing OAuth or troubleshoot issues related to Python and Flask at [Stack Overflow](https://stackoverflow.com/).
4. **OAuth 2.0 Simplified** - This guide by Aaron Parecki provides a broad understanding of OAuth principles applicable across different platforms, available at [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/).
5. **Flask-OAuthlib GitHub Repository** - For more in-depth examples and community responses, check out the [Flask-OAuthlib GitHub repo](https://github.com/lepture/flask-oauthlib).

### Learning in Public Prompts

- "Implemented OAuth in a Flask app today using GitHub as the provider. Surprisingly, setting up the OAuth flow was..."
- "Struggled with the OAuth callback today. Turned out the issue was..."
- "Discovered a handy trick for handling environment variables in Flask. Here’s how I did it..."
- "Really excited to share how I managed to secure OAuth credentials using environment variables. It’s crucial to..."
- "Just learned about the importance of HTTPS in OAuth implementations. Always ensure to..."

### Metrics to Track

- **Setup Time**: Monitor how long it takes from setting up the environment to running the application.
- **OAuth Implementations**: Count the number of different OAuth providers you successfully integrate.
- **Bug Fixes**: Keep track of bugs encountered and fixed during the development and testing phases.
- **User Feedback**: Record feedback from users testing the OAuth flow, noting any recurrent issues or suggestions.
- **Resource Costs**: If applicable, note any costs incurred for hosting or additional tools required for your project.
- **Helpful Interactions**: Track the number of helpful interactions you have in forums or communities.

### STAR Statement Examples for Resumes

1. "Successfully implemented OAuth authentication in a Flask web app, enhancing user security and privacy by enabling GitHub single sign-on, resulting in a 40% decrease in login-related support queries."
2. "Integrated OAuth 2.0 with GitHub in a Flask application, securing user authentication and streamlining the login process, which increased user sign-up rate by 25%."
3. "Led the development of OAuth integration for a web application, employing best practices that safeguarded against common security pitfalls, contributing to a robust, scalable user authentication system."
4. "Engineered and deployed a secure OAuth solution using Flask and GitHub, ensuring the confidentiality and integrity of user data, thereby enhancing trust and user satisfaction."

### Tools & Skills to Add to Tools & Technologies Sheet

**Tools:**
- Flask
- Flask-OAuthlib
- Docker (for environment setup)
- GitHub (OAuth provider)
- Postman or similar API testing tools

**Skills:**
- OAuth Implementation
- Secure Web Application Development
- Environment Variable Management
- API Integration
- User Authentication and Authorization
- Security Best Practices (such as HTTPS usage and secure storage of secrets)