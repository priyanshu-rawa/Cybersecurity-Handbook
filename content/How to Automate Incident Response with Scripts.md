up:: [[Threat Detection & Response Labs]]
### **Automate Incident Response with Scripts**

Automating incident response tasks with scripts can significantly enhance the efficiency and effectiveness of your security operations. By automating common tasks, you reduce response time and eliminate human error during critical incidents. This project will guide you through creating scripts to automate tasks such as isolating compromised systems, blocking malicious IP addresses, and sending notifications to the security team.

---

#### **Prerequisites**
- **Basic knowledge of cybersecurity principles**: Understanding why isolation, blocking, and notifications are important for incident response.
- **Familiarity with scripting languages**: Some experience with Python or Bash.
- **A computer with internet access**

---

### **Step-by-Step Guide**

---

#### **Step 1: Identify Incident Response Tasks to Automate**

1. **List Common Incident Response Tasks**:
   - Identify repetitive tasks in the incident response process, such as:
     - **Isolating compromised systems**: Disconnecting a system from the network to prevent malware spread.
     - **Collecting forensic data**: Gathering information to investigate the incident.
     - **Blocking malicious IP addresses**: Preventing known malicious IPs from accessing the network.
     - **Sending alerts to the security team**: Notifying the team as soon as an incident is detected.

2. **Select Tasks for Automation**:
   - Choose tasks that are repetitive, time-consuming, and critical. Automating these tasks can save time during incidents.
   - **Example**: Automate the process of isolating compromised systems and sending a notification to the team. These tasks are essential and benefit from fast execution.

---

#### **Step 2: Set Up the Environment**

1. **Install Required Tools**:
   - For Python scripting, install `paramiko` (for SSH connections) to enable remote access and control over systems.
   - Run the following command to install `paramiko`:
     ```bash
     pip install paramiko
     ```

2. **Create a Project Directory**:
   - Organize your work by creating a dedicated directory to store your scripts.
     ```bash
     mkdir incident-response-automation
     cd incident-response-automation
     ```

---

#### **Step 3: Develop Automation Scripts**

Each script automates a specific incident response task. Below are updated code examples and explanations.

---

1. **Script to Isolate Compromised Systems**:
   - **Purpose**: This script uses SSH to connect to a remote system and disables its network interface, isolating it from the network.
   - **Updated for Security**: The script now uses SSH keys instead of plaintext passwords.

   ```python
   import paramiko
   import sys

   def isolate_system(hostname, username, key_path):
       try:
           client = paramiko.SSHClient()
           client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
           client.connect(hostname, username=username, key_filename=key_path)
           stdin, stdout, stderr = client.exec_command('sudo ifconfig eth0 down')
           print(stdout.read().decode())
           print(stderr.read().decode())
           client.close()
           print(f"System {hostname} isolated successfully.")
       except Exception as e:
           print(f"Failed to isolate system {hostname}: {e}")

   if __name__ == "__main__":
       if len(sys.argv) != 4:
           print("Usage: python isolate_system.py <hostname> <username> <key_path>")
           sys.exit(1)
       isolate_system(sys.argv[1], sys.argv[2], sys.argv[3])
   ```

   - **Explanation**: This script connects to the target system via SSH using an SSH key file (specified by `<key_path>`) and executes the `ifconfig eth0 down` command to disable the network interface.
   - **Usage**: Run this script with the hostname, username, and SSH key path to isolate the system securely.

---

2. **Script to Block Malicious IP Addresses**:
   - **Purpose**: This script updates the firewall to block a specified IP address.
   - **Compatibility Note**: This script uses `iptables`, which may need modification if your system uses `nftables`.

   ```python
   import subprocess
   import sys

   def block_ip(ip_address):
       try:
           subprocess.run(['sudo', 'iptables', '-A', 'INPUT', '-s', ip_address, '-j', 'DROP'], check=True)
           print(f"IP address {ip_address} blocked successfully.")
       except subprocess.CalledProcessError as e:
           print(f"Failed to block IP address {ip_address}: {e}")

   if __name__ == "__main__":
       if len(sys.argv) != 2:
           print("Usage: python block_ip.py <ip_address>")
           sys.exit(1)
       block_ip(sys.argv[1])
   ```

   - **Explanation**: This script adds a rule to the firewall (`iptables`) to block traffic from a specified IP address.
   - **Usage**: Run the script with the IP address you want to block.

---

3. **Script to Send Notifications**:
   - **Purpose**: This script sends an email notification when an incident is detected.
   - **Updated for Security**: It now uses environment variables to store email credentials securely.

   ```python
   import smtplib
   from email.mime.text import MIMEText
   import sys
   import os

   def send_notification(subject, body, to_email):
       from_email = os.getenv("EMAIL_USER")
       password = os.getenv("EMAIL_PASSWORD")
       msg = MIMEText(body)
       msg['Subject'] = subject
       msg['From'] = from_email
       msg['To'] = to_email
       try:
           server = smtplib.SMTP('smtp.example.com', 587)
           server.starttls()
           server.login(from_email, password)
           server.sendmail(from_email, [to_email], msg.as_string())
           server.quit()
           print(f"Notification sent to {to_email} successfully.")
       except Exception as e:
           print(f"Failed to send notification: {e}")

   if __name__ == "__main__":
       if len(sys.argv) != 4:
           print("Usage: python send_notification.py <subject> <body> <to_email>")
           sys.exit(1)
       send_notification(sys.argv[1], sys.argv[2], sys.argv[3])
   ```

   - **Explanation**: This script uses `smtplib` to send an email. The sender’s email and password are stored in environment variables for security.
   - **Usage**: Store email credentials in environment variables, then run the script with the subject, body text, and recipient email address.
     ```bash
     export EMAIL_USER="your-email@example.com"
     export EMAIL_PASSWORD="your-email-password"
     python send_notification.py "Test Subject" "Test Body" "recipient@example.com"
     ```

---

#### **Step 4: Test the Automation Scripts**

Testing each script ensures they perform as expected and highlights any errors before use in a real incident.

1. **Isolate Compromised System**:
   - Run `isolate_system.py` on a test system (where SSH key-based authentication is set up).
     ```bash
     python isolate_system.py 192.168.1.100 username /path/to/ssh_key
     ```

2. **Block Malicious IP Address**:
   - Test `block_ip.py` with a known test IP to verify the firewall block.
     ```bash
     python block_ip.py 203.0.113.1
     ```

3. **Send Notification**:
   - Test `send_notification.py` by sending a sample email.
     ```bash
     python send_notification.py "Test Subject" "Test Body" "recipient@example.com"
     ```

---

#### **Step 5: Document the Automation Implementation**

Comprehensive documentation allows others to understand, use, and maintain your scripts effectively.

1. **Create an Implementation Report**:
   - **Introduction**: Describe the project’s purpose and scope.
   - **Setup and Configuration**: Include steps for setting up the environment and installing necessary tools.
   - **Scripts**: Provide each script’s code, usage instructions, and explanation.
   - **Testing**: Document test cases, expected results, and actual outcomes.
   - **Conclusion**: Summarize how automation improved incident response and suggest additional tasks for automation.

2. **Include Screenshots and Logs**:
   - Take screenshots of script outputs and logs during testing to document successful operation.

---

### **Example Documentation Outline**

**Incident Response Automation Report**:

1. **Introduction**:
   - Purpose and scope of the automation project.

2. **Setup and Configuration**:
   - Steps for setting up the environment and installing required tools.

3. **Scripts**:
   - **Isolate Compromised System**:
     - Code and usage of `isolate_system.py`.
   - **Block Malicious IP Address**:
     - Code and usage of `block_ip.py`.
   - **Send Notification**:
     - Code and usage of `send_notification.py`.

4. **Testing**:
   - Steps and results for testing each script.

5. **Conclusion**:
   - Summary of the project’s effectiveness and recommendations for further automation.

---

### **Conclusion**

By completing this project, you have successfully automated key incident response tasks, including isolating compromised systems, blocking malicious IP addresses, and sending notifications. Further improvements can be made by expanding the automation scope or integrating the scripts with existing security tools to enhance response times and reliability.

---

### Where to Find Assistance

1. **Official Documentation**: Check the [Python Documentation](https://docs.python.org/3/) for Python-specific syntax and modules, and [Bash Reference Manual](https://www.gnu.org/software/bash/manual/) for Bash scripting.
2. **Community Forums**: Engage in cybersecurity forums such as [Stack Exchange Network Security](https://security.stackexchange.com/) and [Reddit r/netsec](https://www.reddit.com/r/netsec/).
3. **Online Tutorials**: Utilize platforms like [Codecademy](https://www.codecademy.com/) for Python and Bash tutorials, and [YouTube](https://www.youtube.com/results?search_query=incident+response+automation) for video guides on automating incident response.
4. **Discussion Boards**: Post queries or participate in discussions on [GitHub Community](https://github.community/) or the [Paramiko GitHub repository](https://github.com/paramiko/paramiko) for specific scripting issues.

### Learning in Public Prompts

- "Automated my first script to isolate compromised systems today. Here’s what I learned about using SSH with Python!"
- "Encountered challenges while setting up email notifications via scripts—turns out environment variables are crucial for security. Here's how I fixed it."
- "Successfully blocked a malicious IP with just a few lines of Python. It felt great speeding up what used to be a manual task!"
- "Testing my automation scripts taught me a lot about error handling. Anyone else have tips on ensuring scripts run smoothly under different conditions?"
- "Shared my first automated incident response script with my team today. Exciting to contribute to our security operations!"

### Metrics to Track

- **Technical Metrics**:
  - Number of successful script executions vs. failures.
  - Time reduction in incident response after automation.
  - Number of incidents successfully mitigated through automated scripts.
- **Learning-Focused Metrics**:
  - Number of new scripting functions learned and implemented.
  - Time spent developing and refining scripts.
- **Monetary Metrics**:
  - Cost savings from reduced manual intervention in incident responses.
- **Helpfulness Metrics**:
  - Number of team members or peers who adopted or benefited from the scripts.

### STAR Statement Examples for Resumes

1. "Automated system isolation and malware containment for detected threats, reducing containment time by 70% and enhancing incident response efficiency."
2. "Developed a Python script that blocks malicious IPs, effectively reducing potential network breaches by 40% and decreasing response times from hours to minutes."
3. "Implemented an automated alert system using Python and SMTP, which decreased detection-to-notification time by 50%, ensuring timely responses to security incidents."
4. "Created and deployed incident response scripts that improved team response capabilities, leading to a 60% increase in incident handling capacity without additional resources."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - Python: For scripting automation tasks.
  - Paramiko: Python library for SSH.
  - Bash: For scripting on Linux-based systems.
  - SMTP: For sending notification emails.
- **Skills**:
  - Script Writing and Automation
  - System Administration via Scripting
  - Network Security Management
- **Techniques**:
  - Using SSH for remote system management.
  - Configuring firewalls and security protocols via scripts.
  - Handling secure communication through scripts with environment variables.