up:: [[Application & Software Security Labs]]
## Secure Code Review Project

Conducting a secure code review means examining software code to find and fix security issues. This project will walk you through the key steps, focusing on some common vulnerabilities and security best practices.

### Prerequisites

Before you begin, make sure you have:

- **Basic programming skills** (You should understand how to read and write simple code).
- **Basic knowledge of common security vulnerabilities** such as those in the [OWASP Top 10](https://owasp.org/Top10/) (a well-known list of common web security vulnerabilities).
- **Access to the source code of the application** you are reviewing.

---

### Overview

For this tutorial, we’ll review a sample Python web application built with Flask, a popular web framework. This sample app has some known security issues you’ll work on identifying and understanding.

---

### Step 1: Set Up the Development Environment

To run and review the app, you’ll need to set up a development environment.

1. **Install Python**
   - Check if Python is installed by running `python --version` in your terminal. If it’s not installed, download it from [python.org](https://www.python.org/downloads/).
2. **Create a Project Folder**
   - Open your terminal, create a directory for the project, and navigate into it:

     ```bash
     mkdir secure_code_review
     cd secure_code_review
     ```

2. **Set Up a Virtual Environment**
   - A virtual environment helps you install libraries for this project without affecting other projects.
   - Run these commands to set it up:

     ```bash
     python -m venv venv  # Creates a virtual environment called "venv"
     source venv/bin/activate  # Activates the environment (On Windows use `venv\Scripts\activate`)
     ```

3. **Install Flask**
   - Flask is the framework we’ll use for this app. Install it by running:

     ```bash
     pip install Flask
     ```

---

### Step 2: Download the Sample Application

1. **Create the Application Files**
   - In this folder, create the following files.

   **a. `app.py` (Main application file)**

      Copy and paste the code below into a file named `app.py`. This code includes a sample Flask application with some vulnerabilities you’ll review:

      ```python
      from flask import Flask, request, render_template_string, redirect, url_for

      app = Flask(__name__)

      # Hardcoded username and password (insecure for demonstration)
      users = {'admin': 'password123'}

      @app.route('/')
      def home():
          return 'Welcome to Addies Lair of Secure Code Mastery!'

      @app.route('/login', methods=['GET', 'POST'])
      def login():
          if request.method == 'POST':
              username = request.form['username']
              password = request.form['password']
              if username in users and users[username] == password:
                  return redirect(url_for('admin'))
              else:
                  return 'Invalid credentials', 401
          return '''
          <form method="post">
              Username: <input type="text" name="username"><br>
              Password: <input type="password" name="password"><br>
              <input type="submit" value="Login">
          </form>
          '''

      @app.route('/admin')
      def admin():
          return 'Welcome, Admin Overlord!'

      @app.route('/xss', methods=['GET', 'POST'])
      def xss():
          if request.method == 'POST':
              user_input = request.form['user_input']
              return render_template_string(f'<p>{user_input}</p>')
          return '''
          <form method="post">
              Enter text: <input type="text" name="user_input"><br>
              <input type="submit" value="Submit">
          </form>
          '''

      if __name__ == '__main__':
          app.run(debug=True)
      ```

   **b. `requirements.txt` (Dependencies file)**

      This file lists the libraries needed to run the app. Generate this file with this command

      ```makefile
      pip freeze > requirements.txt
      ```

4. **Run the Application**
   - Start the application by running:

     ```bash
     python app.py
     ```

   - The app will be available in your browser at `http://127.0.0.1:5000/`.

---

### Step 3: Review the Code

**Goal**: Break down your review by areas of the code. Here are tips for each part of the review process:

1. **Automated Code Analysis**
   - Tools like **Bandit** can help you identify common security issues in Python code.
   - Install Bandit with:

     ```bash
     pip install bandit
     bandit -r .
     ```

2. **Manual Code Review**
   - After automated scans, manually review the code to catch issues Bandit might miss. Focus on **authentication, user input handling, and error handling**.

---

### Step 4: Identify Common Vulnerabilities

The following are common vulnerabilities to look for in the sample app:

1. **Injection Attacks**
   - **Definition**: Injection attacks happen when untrusted input is used directly in a command or query, which can allow attackers to manipulate the input to do something harmful.
   - **What to Look For**: Any user input that’s used without validation, especially in queries or commands. In this app, note any raw user input usage.

2. **Broken Authentication and Session Management**
   - **Definition**: Broken authentication happens when login or session management is poorly handled, allowing unauthorized access.
   - **What to Look For**: Hardcoded passwords (like `password123`) are a bad practice. Replace these with hashed passwords.
   - **Fix Example**:

      ```python
      from werkzeug.security import generate_password_hash, check_password_hash

      users = {'admin': generate_password_hash('password123')}

      # In the login function, replace the password check with:
      check_password_hash(users[username], password)
      ```

3. **Cross-Site Scripting (XSS)**
   - **Definition**: XSS occurs when untrusted input is inserted directly into the webpage, allowing attackers to run harmful scripts.
   - **What to Look For**: User inputs displayed on the site without encoding (like in the `/xss` route).
   - **Fix Example**:

      ```python
      from markupsafe import escape

      user_input = escape(request.form['user_input'])
      ```

4. **Security Misconfigurations**
   - **Definition**: Insecure settings can expose sensitive information or allow unauthorized access.
   - **What to Look For**: Make sure settings, like `debug=True`, are not enabled in production.

5. **Sensitive Data Exposure**
   - **Definition**: Exposing data such as passwords in plain text makes it easy for attackers to steal sensitive information.
   - **What to Look For**: Avoid hardcoded credentials and ensure data is encrypted.

6. **Cross-Site Request Forgery (CSRF)**
   - **Definition**: CSRF tricks users into submitting unwanted actions.
   - **What to Look For**: Forms should have CSRF protection to prevent attackers from submitting forms on a user’s behalf.

---

### Step 5: Document Findings and Recommendations

1. **Write a Report**
   - Document any vulnerabilities you find with descriptions, severity, and how to fix each one.

2. **Add Code Examples**
   - Include snippets showing both the original, vulnerable code and the fixed, secure code.

3. **Prioritize Issues**
   - Decide which vulnerabilities are most critical and should be fixed first.

---

### Step 6: Remediation and Verification

1. **Fix the Issues**
   - Work with the development team to implement the recommended fixes.

2. **Verify Fixes**
   - Re-review the code and run the application to make sure the vulnerabilities are fixed.

3. **Encourage Best Practices**
   - Use secure coding practices and encourage regular code reviews for ongoing security.

---

### Conclusion

By following this guide, you’ve reviewed the code, identified common vulnerabilities, and provided recommendations to improve its security. This practice is key to building secure applications. To learn more, consider studying the [OWASP Top 10](https://owasp.org/Top10/) and practicing secure coding regularly!

---
### Where to Find Assistance

1. **OWASP Top 10** - Explore the official [OWASP Top 10](https://owasp.org/Top10/) list for detailed explanations of common security vulnerabilities and how to address them.
2. **Stack Overflow** - Ask questions and receive answers from a large community of developers on [Stack Overflow](https://stackoverflow.com/).
3. **Python Official Documentation** - Utilize the [Python Documentation](https://docs.python.org/3/) for official guides and tutorials on Python programming.
4. **GitHub Repositories** - Look for open-source projects and collaborate with other developers on [GitHub](https://github.com/).
5. **Flask Documentation** - Get to know Flask better through its comprehensive [official documentation](https://flask.palletsprojects.com/en/2.0.x/).

### Learning in Public Prompts

- "Exploring how to secure Flask applications against XSS attacks. I found that..."
- "Just ran my first secure code review using Bandit! Here’s a mistake I caught..."
- "Setting up my development environment was challenging but crucial. One tip for beginners is..."
- "I learned the importance of hashing passwords today—never store them as plain text! Here’s why..."
- "Discovered a serious security misconfiguration in my code. Always check your settings by..."

### Metrics to Track

- **Number of Identified Vulnerabilities**: Track how many and what types of security issues you find.
- **Time Spent on Setup and Configuration**: Monitor how long it takes to set up your environment and start coding.
- **Cost of Tools**: Record any expenses related to acquiring tools or resources for your project.
- **Community Interactions**: Keep count of how many questions you ask and answer on forums or discussions.
- **Successful Exploits Mitigated**: Note down each security flaw you successfully secure or mitigate.

### STAR Statement Examples for Resumes

1. "Reviewed and enhanced security of a Flask-based web application, identifying and mitigating 5 critical XSS vulnerabilities, increasing application safety by 100%."
2. "Implemented password hashing using Werkzeug, replacing hardcoded passwords for 200+ users and enhancing system security by preventing unauthorized access."
3. "Led a secure code review initiative, using automated tools and manual testing to reduce potential security breaches by over 50% in a developmental Python project."
4. "Collaborated with a team of developers to rectify 10+ security misconfigurations in a sample web application, ensuring compliance with best practices and industry standards."

### Tools & Skills to Add to Tools & Technologies Sheet

**Tools:**
- Python
- Flask
- Bandit (Python security linter)
- Werkzeug (for password hashing)

**Skills:**
- Secure Code Review
- Vulnerability Identification and Mitigation
- Flask Application Development
- Automated and Manual Security Testing
- Security Best Practices Implementation (OWASP Top 10)