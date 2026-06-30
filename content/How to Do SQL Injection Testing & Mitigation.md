up:: [[Application & Software Security Labs]]
🚧This lab is currently under construction 🚧
## SQL Injection Testing and Mitigation

SQL Injection is one of the most dangerous web vulnerabilities. It happens when attackers manipulate SQL queries to gain unauthorized access to the database. This project will show you how to test for SQL Injection vulnerabilities and secure a Flask web app against them.

---

### Prerequisites

Before starting, make sure you have:

- **Basic Python and web development knowledge** (you should understand Flask basics and Python functions).
- **Python installed** on your computer (check by typing `python --version` in a terminal).

---

### Step 1: Set Up the Development Environment

To start, you’ll need to set up Python, a virtual environment, and install Flask.

1. **Install Python**

   - Confirm Python is installed by running: `python --version`.
   - If not, download it from [python.org](https://www.python.org/downloads/) and follow the installation steps.

2. **Set Up a Virtual Environment**

   - Virtual environments help you manage libraries for this project without affecting other projects.
   - Create and activate a virtual environment by running:

     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
     ```

3. **Install Flask and Flask-SQLAlchemy**

   - Flask-SQLAlchemy is a library for working with databases in Flask.
   - Install both by running:

     ```bash
     pip install Flask Flask-SQLAlchemy
     ```

---

### Step 2: Create the Vulnerable Web Application

Next, you’ll create a simple Flask app with a login page. This login page will have a vulnerability that allows SQL Injection.

1. **Create the Application File (`app.py`)**

   - In your project folder, create a file called `app.py`. Copy and paste the following code into it:

     ```python
     from flask import Flask, request, render_template_string
     from flask_sqlalchemy import SQLAlchemy

     app = Flask(__name__)
     app.config['SECRET_KEY'] = 'supersecretkey'
     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
     db = SQLAlchemy(app)

     class User(db.Model):
         id = db.Column(db.Integer, primary_key=True)
         username = db.Column(db.String(150), nullable=False, unique=True)
         password = db.Column(db.String(150), nullable=False)

     @app.route('/')
     def home():
         return 'Welcome to the SQL Injection Testing and Mitigation tutorial! Exploit, patch, repeat.'

     @app.route('/login', methods=['GET', 'POST'])
     def login():
         if request.method == 'POST':
             username = request.form['username']
             password = request.form['password']
             # Vulnerable to SQL Injection
             user = User.query.filter(f"username='{username}' AND password='{password}'")
             if user:
                 return f'Welcome, {username}!'
             else:
                 return 'Invalid credentials'
         return '''
         <form method="post">
             Username: <input type="text" name="username"><br>
             Password: <input type="password" name="password"><br>
             <input type="submit" value="Login">
         </form>
         '''

     if __name__ == '__main__':
         db.create_all()
         app.run(debug=True)
     ```

   - **Explanation of Vulnerability**: In the login function, we directly insert `username` and `password` into the SQL query, which makes the app vulnerable to SQL Injection.

2. **Create the Requirements File (`requirements.txt`)**

   - This file lists the libraries your app needs. Create a `requirements.txt` file and add:

     ```makefile
     Flask==2.0.1
     Flask-SQLAlchemy==2.5.1
     ```

3. **Install Dependencies**

   - Run the following command to install the libraries listed in `requirements.txt`:

     ```bash
     pip install -r requirements.txt
     ```

4. **Run the Application**

   - Start the app by running:

     ```bash
     python app.py
     ```

   - Open `http://127.0.0.1:5000/` in your browser to see the home page.

---

### Step 3: Test for SQL Injection

**Goal**: Identify if the login form is vulnerable to SQL Injection.

1. **Access the Login Page**

   - Go to `http://127.0.0.1:5000/login`.

2. **Test the Vulnerability**

   - In the **Username** field, enter any username (e.g., `admin`).
   - In the **Password** field, enter an SQL injection payload like `'' OR '1'='1'`.
   - If the app logs you in, it indicates an SQL Injection vulnerability, as the query was manipulated by your input.

   > **Tip**: If your test is unsuccessful, check that you’re running the app correctly, and that the `login` function uses `User.query.filter` with a direct SQL query.

---

### Step 4: Mitigate SQL Injection

To fix SQL Injection, use **parameterized queries**, which separate user input from the query itself.

1. **Replace the Vulnerable Query**

   - In `app.py`, replace the `login` function with the code below to make the query safe by using SQLAlchemy’s `filter_by` method:

     ```python
     @app.route('/login', methods=['GET', 'POST'])
     def login():
         if request.method == 'POST':
             username = request.form['username']
             password = request.form['password']
             # Mitigation: Use parameterized queries
             user = User.query.filter_by(username=username, password=password).first()
             if user:
                 return f'Welcome, {user.username}!'
             else:
                 return 'Invalid credentials'
         return '''
         <form method="post">
             Username: <input type="text" name="username"><br>
             Password: <input type="password" name="password"><br>
             <input type="submit" value="Login">
         </form>
         '''
         ```

   - **Explanation of Fix**: This change prevents SQL Injection because `filter_by` safely adds parameters to the query, separating user input from the SQL command.

2. **Test the Fix**

   - Restart the app by running `python app.py` again.
   - Go to the login page (`http://127.0.0.1:5000/login`) and try the same SQL injection payload (`'' OR '1'='1`) in the password field. This time, the app should reject the attempt, proving the vulnerability has been fixed.

---

### Step 5: Implement Additional Security Measures

Consider adding these measures to further secure your app:

1. **Use ORM Methods for Queries**

   - **ORM (Object Relational Mapping)** libraries like SQLAlchemy help avoid raw SQL queries, making it easier to use secure, pre-built query methods like `filter_by`.

2. **Validate and Sanitize User Inputs**

   - Validate inputs (e.g., ensure usernames only contain valid characters) and use libraries to sanitize data if needed.

3. **Principle of Least Privilege**

   - Ensure that the database user only has the necessary permissions. For example, avoid granting permissions like `DROP` to application-level users.

4. **Error Handling**

   - Avoid showing detailed error messages to users, as these can reveal sensitive information about your app’s database or structure.

---

### Step 6: Document Your Application

Documentation helps future users or developers understand how your app works and the security measures you’ve implemented.

1. **Configuration Details**

   - Document settings like the database URI (`SQLALCHEMY_DATABASE_URI`) and `SECRET_KEY`.

2. **Security Measures**

   - List the security practices you followed, including the use of parameterized queries, input validation, and ORM methods.

3. **Usage Instructions**

   - Include instructions on setting up and running the app, initializing the database, and using secure coding practices.

---

### Conclusion

You’ve successfully created a vulnerable web application, tested it for SQL Injection, and implemented fixes to secure it. This project shows the importance of secure coding practices and the power of parameterized queries in protecting against SQL Injection. Continue to improve your skills by staying up-to-date with security best practices and regularly testing your applications.

---
### Where to Find Assistance

1. **Flask Documentation** - Learn the basics and advanced features of Flask from the [official documentation](https://flask.palletsprojects.com/).
2. **SQLAlchemy Documentation** - For detailed usage of SQLAlchemy, visit [SQLAlchemy's official docs](https://docs.sqlalchemy.org/).
3. **OWASP SQL Injection Prevention Cheat Sheet** - A comprehensive guide to preventing SQL Injection can be found on the [OWASP website](https://owasp.org/www-community/attacks/SQL_Injection).
4. **Stack Overflow** - A vast community where you can post questions about SQL Injection, Flask, and SQLAlchemy at [Stack Overflow](https://stackoverflow.com/).
5. **GitHub Repositories** - Explore open-source projects and examples on [GitHub](https://github.com/) that demonstrate secure coding practices to avoid SQL Injection.

### Learning in Public Prompts

- "Just found out how easily SQL Injection can compromise an entire database. Here’s what I learned about preventing it..."
- "Exploring parameterized queries in Flask really opened my eyes to the importance of secure coding practices. Always remember to..."
- "Was able to bypass login authentication using SQL Injection! Time to fix this vulnerability by..."
- "Learning about the risks of raw SQL queries today. Here's why using ORM methods like `filter_by` is crucial..."
- "Implemented my first SQL Injection mitigation in a Flask app. Here’s a simple change that can enhance your app’s security..."

### Metrics to Track

- **Number of SQL Injection Attempts**: Track the number of times you or others successfully inject SQL into the app before and after mitigation.
- **Setup and Debugging Time**: Monitor the time it takes to set up the environment, write the application, and debug any issues.
- **Learning Hours**: Track the hours spent learning about SQL Injection and secure coding practices.
- **Cost Metrics**: Note any costs involved in using premium tools or resources for learning or securing your app.
- **Community Interaction**: Keep track of the questions you ask and answer in forums or communities to gauge your engagement and learning progress.

### STAR Statement Examples for Resumes

1. **"Reduced SQL Injection vulnerability by 95% by implementing parameterized queries in a Flask application, significantly enhancing data security."
2. ****"Decreased system vulnerability by 80% by rectifying SQL Injection flaws using ORM techniques in a Flask web application."**
3. **"Identified and remediated 12 SQL Injection vulnerabilities, securing user data and improving system integrity through ORM solutions."**
4. **"Eliminated susceptibility to SQL Injection in a Flask app by 100% through the integration of SQLAlchemy, confirmed by penetration testing."**

### Tools & Skills to Add to Tools & Technologies Sheet

**Tools:**
- Flask
- SQLAlchemy
- Python
- Virtual environments (venv)
- Flask-SQLAlchemy

**Skills:**
- SQL Injection Testing and Mitigation
- Secure Web Application Development
- Using ORM (Object Relational Mapping) for Database Interactions
- Parameterized Queries
- Flask Application Configuration and Security Practices