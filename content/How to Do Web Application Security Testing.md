up:: [[Application & Software Security Labs]]
## Web Application Security Testing

In this project, you’ll use **OWASP ZAP (Zed Attack Proxy)** to find and fix a vulnerability in a sample web application. This step-by-step guide will help you set up OWASP ZAP, scan an application for vulnerabilities, identify a specific security issue, and implement a fix.

### Prerequisites

Make sure you have the following before you start:

- **Basic knowledge of web application security** (Understand basic security concepts and how web apps work).
- **Familiarity with common web vulnerabilities** like those in the [OWASP Top 10](https://owasp.org/Top10/) list.
- **Access to the application’s source code** (in this case, you’ll create it yourself).
- **A computer with internet access** to download tools and libraries.

---

### Overview

For this tutorial, you’ll use **Flask**, a Python framework, to create a simple web application with a known vulnerability. Then, you’ll use OWASP ZAP to scan the application and find the vulnerability, and finally, you’ll make changes to fix it.

---

### Step 1: Set Up the Development Environment

To get started, you’ll need to install Python and set up a virtual environment for running the Flask application.

1. **Install Python**
   - To check if Python is installed, open a terminal (or Command Prompt) and type: `python --version`.
   - If Python is not installed, download it from [python.org](https://www.python.org/downloads/) and follow the installation instructions.

2. **Set Up a Virtual Environment**
   - A virtual environment isolates your project’s dependencies, so they don’t interfere with other projects.
   - Run the following commands in your terminal to create and activate a virtual environment:

     ```bash
     python -m venv venv  # Creates a virtual environment called "venv"
     source venv/bin/activate  # Activates the environment (On Windows use `venv\Scripts\activate`)
     ```
     
3. **Install Flask**
   - Flask is the framework we’ll use to create the sample app. Install it by running:

     ```bash
     pip install Flask

	```
4. **Create the Application File (`app.py`)**
   - Inside your project folder, create a file named `app.py` and copy the code below into it. This code includes a sample Flask app with a vulnerable search feature:

     ```python
     from flask import Flask, request, render_template_string

     app = Flask(__name__)

     @app.route('/')
     def home():
         return 'Welcome to the Web App Hacking Lab – Lets Crack Some Security!'

     @app.route('/search', methods=['GET', 'POST'])
     def search():
         if request.method == 'POST':
             query = request.form['query']
             # Vulnerability: SQL Injection
             result = execute_query(f"SELECT * FROM users WHERE username = '{query}'")
             return render_template_string(f'<p>Search result: {{ result }}</p>', result=result)
         return '''
         <form method="post">
             Search: <input type="text" name="query"><br>
             <input type="submit" value="Search">
         </form>
         '''

     def execute_query(query):
         # Simulate a database query
         users = {'admin': 'password123', 'user1': 'pass1', 'user2': 'pass2'}
         if query in users:
             return f'User: {query}, Password: {users[query]}'
         return 'No results found'

     if __name__ == '__main__':
         app.run(debug=True)
     ```

   - This sample app has a search feature that is vulnerable to **SQL Injection**, a common security risk.

---

### Step 2: Download the Sample Application


2. **`requirements.txt` (Dependencies file)**

      This file lists the libraries needed to run the app. Generate this file with this command

      ```makefile
      pip freeze > requirements.txt
     ```

4. **Run the Application**
   - Start the application by running:

     ```bash
     python app.py
     ```

   - The application will be available at `http://127.0.0.1:5000/`.

---

### Step 3: Set Up OWASP ZAP

1. **Download and Install OWASP ZAP**
   - Download OWASP ZAP from [https://www.zaproxy.org/download/](https://www.zaproxy.org/download/) and follow the installation instructions for your operating system.

2. **Start OWASP ZAP**
   - Open OWASP ZAP after installation. ZAP will act as a “man-in-the-middle” proxy, capturing and scanning the traffic between your browser and the web application.

---

### Step 4: Scan the Application with OWASP ZAP

1. **Configure Your Browser to Use OWASP ZAP as a Proxy**
   - OWASP ZAP usually runs on `localhost` at port `8080`.
   - Go to your browser’s proxy settings and set the HTTP Proxy to `localhost` and the Port to `8080`.

2. **Access the Application Through ZAP**
   - Open your browser (with the ZAP proxy configured) and go to `http://127.0.0.1:5000/`.
   - ZAP will automatically capture this traffic.

3. **Perform a Scan**
   - In ZAP, right-click on the top-level URL (`http://127.0.0.1:5000/`) in the Sites tab and select **Attack** -> **Spider**. This action will crawl the application’s pages.
   - After the Spider completes, right-click on the URL again and select **Attack** -> **Active Scan**. This deeper scan will try to detect any security issues.

4. **Analyze the Results**
   - Once the scan is complete, look at the alerts in the **Alerts** tab to see any vulnerabilities ZAP has identified, such as SQL Injection.

---

### Step 5: Identify and Fix the Vulnerability

1. **Identify the SQL Injection Vulnerability**
   - ZAP should flag an SQL Injection vulnerability on the `/search` endpoint. SQL Injection happens when user input is used directly in a database query without proper handling, allowing attackers to insert or alter SQL commands.

2. **Fix the SQL Injection Vulnerability**
   - To fix SQL Injection, always avoid using raw user input in database queries. Instead, use **parameterized queries** that separate data from the SQL command.
   - Modify the `execute_query` function to avoid using raw queries. Below is an updated version that uses **escaping** to prevent SQL Injection (note that in a real app, a database library with parameterized queries would be better).

     ```python
     from flask import Flask, request, render_template_string, escape

     app = Flask(__name__)

     @app.route('/')
     def home():
         return 'Welcome to the Web App Hacking Lab – Lets Crack Some Security!'

     @app.route('/search', methods=['GET', 'POST'])
     def search():
         if request.method == 'POST':
             query = request.form['query']
             # Fix: Simulate a safer query execution with escaping
             result = execute_query(query)
             return render_template_string('<p>Search result: {{ result }}</p>', result=result)
         return '''
         <form method="post">
             Search: <input type="text" name="query"><br>
             <input type="submit" value="Search">
         </form>
         '''

     def execute_query(query):
         # Simulate a safer database query
         users = {'admin': 'password123', 'user1': 'pass1', 'user2': 'pass2'}
         safe_query = escape(query)
         if safe_query in users:
             return f'User: {safe_query}, Password: {users[safe_query]}'
         return 'No results found'

     if __name__ == '__main__':
         app.run(debug=True)
     ```

3. **Verify the Fix**
   - Restart the application and perform the scan again with OWASP ZAP to confirm that the SQL Injection vulnerability is no longer present.

---

### Step 6: Document Findings and Recommendations

1. **Create a Report**
   - Document each vulnerability you identified, along with a description, severity level, and recommended fix.

2. **Provide Before and After Code Examples**
   - Include examples showing the original, vulnerable code and the fixed code. This helps others understand both the problem and the solution.

3. **Prioritize Vulnerabilities**
   - Decide which vulnerabilities are the most critical based on their potential impact and the likelihood of exploitation. Address these first.

---

### Conclusion

In this project, you used OWASP ZAP to identify a vulnerability in a sample web application, fixed it, and verified the fix. This process is essential to creating secure applications. Keep practicing with different tools and vulnerabilities, and stay up-to-date with the latest security practices by studying resources like the [OWASP Top 10](https://owasp.org/Top10/).

---
### Where to Find Assistance

1. **OWASP ZAP Official Documentation** - Learn how to use the ZAP tool effectively with the comprehensive [official documentation](https://www.zaproxy.org/docs/).
2. **Flask Documentation** - Access the [Flask Documentation](https://flask.palletsprojects.com/) for details on setting up and using Flask.
3. **Stack Overflow** - Get help from a large community of developers on [Stack Overflow](https://stackoverflow.com/), where you can ask questions about both Flask and OWASP ZAP.
4. **OWASP Community** - Join the [OWASP Community](https://owasp.org/community/) for discussions, meetups, and networking with cybersecurity professionals.
5. **GitHub** - Explore repositories related to Flask and OWASP ZAP on [GitHub](https://github.com/) to see real-world applications and community-contributed projects.

### Learning in Public Prompts

- "Today, I used OWASP ZAP for the first time and discovered..."
- "Just identified a SQL Injection vulnerability in my project! Here’s how I did it..."
- "Fixed a critical security flaw today! Always remember to..."
- "Learning about web security with Flask—never realized how important it is to..."
- "One thing that stood out to me today in my security testing was..."

### Metrics to Track

- **Number of Vulnerabilities Identified**: Count each type of vulnerability found in the application.
- **Time Spent on Each Step**: Track how long it takes to set up the environment, scan the application, and implement fixes.
- **Resources Used**: Note down any resources (tutorials, documentation) that helped you understand and fix issues.
- **Cost of Security Tools**: If any paid tools or resources are used, keep track of the expenses.
- **People Helped**: Record instances where you assisted peers or shared your findings with the community.

### STAR Statement Examples for Resumes

1. "Implemented a secure code review using OWASP ZAP, identifying and fixing 10 vulnerabilities in a Flask web application, enhancing security measures by 90%."
2. "Led a web application security initiative that reduced potential data breaches by proactively addressing SQL Injection vulnerabilities identified during scans."
3. "Coordinated with developers to remediate cross-site scripting (XSS) issues, improving the safety of user data handling in web applications."
4. "Conducted an intensive web security testing session, resulting in a 100% clearance of previously detected security vulnerabilities through targeted remediation efforts."

### Tools & Skills to Add to Tools & Technologies Sheet

**Tools:**
- OWASP ZAP
- Flask
- Python
- Virtual Environment (venv)

**Skills:**
- Web Application Security Testing
- Vulnerability Scanning and Analysis
- SQL Injection Prevention
- Secure Code Implementation
- Cross-Site Scripting (XSS) Mitigation
- Using and Configuring Security Tools