up:: [[Offensive Security Labs]]
# **Phishing Simulation Campaign**

**Objective:**  
Phishing simulations help organizations identify employees who may be vulnerable to phishing attacks and provide training to improve awareness. This guide will walk you through setting up and executing a phishing simulation campaign using **GoPhish**, an open-source phishing simulation tool.

---

## **What You’ll Need**

**Prerequisites:**
- **Basic knowledge of email and web technologies**: Familiarity with concepts like email servers, HTML forms, and web pages.
- **A computer with internet access**
- **GoPhish**: You’ll use GoPhish to create, send, and monitor simulated phishing emails.

If you’re new to GoPhish, you can learn more at [GoPhish on GitHub](https://github.com/gophish/gophish).

---

## **Important Notes**

- **Ethical Use Only**: Use GoPhish and phishing simulations with permission and in a controlled environment within your organization. Unauthorized phishing is illegal.
- **Purpose of Phishing Simulations**: Phishing simulations are meant to educate and improve awareness, not to shame employees. Always approach with a positive, educational mindset.

---

## **Step-by-Step Guide**

### **Step 1: Set Up GoPhish**

1. **Download and Install GoPhish**:
   - Go to the [GoPhish GitHub releases page](https://github.com/gophish/gophish/releases).
   - Download the latest release for your operating system.
   - Extract the downloaded `.zip` file:
     ```bash
     tar -xvzf gophish-vX.X.X-linux-64bit.zip
     cd gophish-vX.X.X-linux-64bit
     ```

2. **Run GoPhish**:
   - Start the GoPhish server by running the following command:
     ```bash
     sudo ./gophish
     ```
   - Once GoPhish starts, it will display a login URL and credentials.

3. **Access the GoPhish Dashboard**:
   - Open a web browser and navigate to `https://localhost:3333`.
   - Log in with the default credentials: **Username**: `admin` and **Password**: `gophish`.
   - **Important**: After logging in, change the password for security.

---

### **Step 2: Configure GoPhish**

Now, you’ll set up the details for your phishing simulation, including the email sending profile, landing page, email template, and target group.

1. **Set Up the Sending Profile**:
   - In GoPhish, go to `Sending Profiles` and click **New Profile**.
   - Fill out the required details, including:
     - **SMTP Server Address**: This is the email server that will send the phishing emails.
     - **SMTP Username and Password**: Credentials for the SMTP server.
   - Click **Test Profile** to ensure it works properly. This test sends a sample email to verify the SMTP server connection.

   *Note*: If you don’t have an SMTP server, you may use a mail testing service for simulations or check with your organization’s IT team.

2. **Create a Phishing Landing Page**:
   - Go to `Landing Pages` and click **New Page**.
   - Paste the following HTML code to create a simple login form that resembles a company login page:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Company Login</title>
     </head>
     <body>
       <h2>Login to Your Account</h2>
       <form method="post" action="/login">
         <label for="email">Email:</label>
         <input type="email" id="email" name="email"><br><br>
         <label for="password">Password:</label>
         <input type="password" id="password" name="password"><br><br>
         <input type="submit" value="Login">
       </form>
     </body>
     </html>
     ```
   - Save the landing page. This page will capture any credentials submitted during the simulation (though, ethically, don’t store or use this data beyond simulation analysis).

3. **Create an Email Template**:
   - Go to `Email Templates` and click **New Template**.
   - Create an email that looks like a legitimate message but contains a link to the phishing landing page. Here’s an example:
     ```plaintext
     Subject: Important Security Update

     Dear User,

     We have detected unusual activity on your account. Please log in to verify your identity and secure your account.

     Click the link below to log in:
     http://your-gophish-server-ip/landing_page

     Regards,
     Security Team
     ```
   - **Replace `your-gophish-server-ip`** with the IP address of the GoPhish server. This URL should point to the landing page you created.

4. **Create a Target Group**:
   - Go to `Users & Groups` and click **New Group**.
   - Name the group (e.g., “Test Group”) and add users (names and email addresses) who will receive the simulated phishing email.
   - Only include users who have provided consent to participate in this simulation.

---

### **Step 3: Launch the Phishing Campaign**

1. **Create a New Campaign**:
   - Go to `Campaigns` and click **New Campaign**.
   - Fill in the campaign details:
     - **Campaign Name**: A name for tracking this campaign (e.g., “Awareness Training Campaign”).
     - **Email Template**: Select the template created in Step 2.
     - **Landing Page**: Choose the landing page created in Step 2.
     - **Sending Profile**: Select the SMTP profile set up in Step 2.
     - **Target Group**: Choose the group you created.
   - Set a start time for the campaign if you want it to run at a specific time.

2. **Launch the Campaign**:
   - Click **Launch Campaign** to start the simulation. GoPhish will send the phishing emails to your target group.

---

### **Step 4: Monitor and Analyze Results**

1. **Monitor Campaign Progress**:
   - Go to `Campaigns` in the GoPhish dashboard and select your active campaign.
   - You’ll see real-time updates on the status of the emails, including metrics like:
     - **Sent**: Number of emails successfully sent.
     - **Opened**: Number of users who opened the email.
     - **Clicked**: Number of users who clicked the phishing link.
     - **Submitted Data**: Number of users who entered credentials on the phishing page.

2. **Analyze User Responses**:
   - Look for patterns and trends in user behavior. Did most people click immediately, or was there a delay? Did certain wording in the email prompt more clicks?
   - This analysis helps identify areas where training is needed.

---

### **Step 5: Conduct Security Awareness Training**

Once the simulation is complete, conduct training sessions based on the results to improve security awareness.

1. **Educate Users**:
   - Hold training sessions to discuss phishing tactics and show examples of phishing emails and landing pages.
   - Use anonymized examples from your simulation (if applicable) to highlight common red flags, such as:
     - **Suspicious links** (URLs that look unusual or don’t match the organization’s domain)
     - **Urgent language** (phrases like “Immediate Action Required”)

2. **Provide Resources**:
   - Share helpful resources, such as checklists, guides, or links to online training on identifying phishing attempts.
   - Reinforce security practices, like never entering credentials on unfamiliar links and verifying requests directly with IT.

3. **Follow-Up Simulations**:
   - Plan follow-up simulations and training sessions to reinforce learning.
   - Run future campaigns periodically to ensure that awareness remains high.

---

### **Step 6: Document the Campaign and Findings**

1. **Document the Campaign Setup**:
   - Include details of the simulation, such as the email template, landing page, and target group setup.

2. **Results and Analysis**:
   - Summarize key statistics (e.g., open rate, click rate, submission rate).
   - Note patterns or trends in user responses.

3. **Recommendations for Improvement**:
   - Suggest actionable steps for enhancing security, such as:
     - Using stronger email filters to block phishing attempts.
     - Implementing multi-factor authentication (MFA) to protect accounts even if credentials are compromised.

---

### **Conclusion**

Congratulations! You’ve successfully set up and run a phishing simulation campaign using GoPhish. This exercise demonstrates the importance of phishing awareness and highlights how training can mitigate security risks. Continue refining your approach by running regular phishing simulations and updating your training program to address new phishing tactics.

---

## Where to Find Assistance

For those embarking on setting up a phishing simulation campaign using GoPhish, here are some resources to aid your journey:

1. **Official Documentation**:
   - [GoPhish GitHub Page](https://github.com/gophish/gophish): Official repository containing detailed documentation, installation guides, and troubleshooting.
   - [GoPhish User Guide](https://getgophish.com/documentation/): Comprehensive user guide on how to configure and use GoPhish effectively.

2. **Community Forums**:
   - [GoPhish Issues on GitHub](https://github.com/gophish/gophish/issues): A place to discuss issues and features directly with developers and other users.
   - [Reddit: r/AskNetsec](https://www.reddit.com/r/AskNetsec/): For broader security questions, including phishing simulation tactics.

3. **Online Tutorials**:
   - YouTube tutorials on GoPhish setup and campaign management, such as [this GoPhish tutorial](https://www.youtube.com/results?search_query=gophish+tutorial).
   - Blogs and articles that walk through phishing simulations step by step, available on cybersecurity educational sites like [Infosec Institute](https://resources.infosecinstitute.com/).

4. **Discussion Boards**:
   - [Cyber Security Stack Exchange](https://security.stackexchange.com/): A useful resource for getting answers to more intricate questions about phishing and security training simulations.

## Learning in Public Prompts

Share your journey and insights with these prompts:

- "Just set up my first GoPhish server—here’s what surprised me about the initial configuration..."
- "Ran a phishing simulation today. It’s interesting to see how design impacts click rates. Here's my takeaway..."
- "Struggling with crafting believable phishing content. Any tips from those who’ve been successful?"
- "Here’s a snapshot of the phishing landing page I designed. What do you think makes this look legitimate or fake?"
- "I’ve learned a lot about SMTP setups today. Sharing a few hurdles I encountered and how I solved them..."
- "Anyone else find user behavior during simulations fascinating? Here’s what I observed with different email templates..."

## Metrics to Track

To effectively measure the impact and learning from your phishing simulation, consider these metrics:

1. **Technical Metrics**:
   - Email delivery rate (how many reached the inbox vs. spam).
   - Click-through rate on phishing links.
   - Data submission rate (how many entered credentials).

2. **Learning-focused Metrics**:
   - Number of participants in the simulation.
   - Change in click-through rates between initial and follow-up simulations (learning improvement).
   - Time spent from campaign setup to execution.

3. **Additional Metrics**:
   - Overall cost of running the simulation (considering tools, time, and any external services).
   - Number of follow-up training sessions held post-simulation.
   - Improvement in user phishing identification skills as measured by pre- and post-training assessments.

## STAR Statement Examples for Resumes

1. "Led the deployment of a GoPhish simulation for 100 employees, achieving a 40% reduction in phishing susceptibility within 3 months post-training."
2. "Designed and executed a company-wide phishing training program using GoPhish, resulting in a 50% decrease in credentials submitted during subsequent tests."
3. "Conducted comprehensive analysis on phishing campaign data, identifying key risk factors that informed the development of targeted security policies reducing phishing incidents by 30%."
4. "Managed a phishing awareness initiative that improved detection of malicious emails by 45% among participants through iterative simulations and feedback-focused learning sessions."

## Tools & Skills to Add to Tools & Technologies Sheet

1. **Tools**:
   - GoPhish
   - SMTP Configuration Tools
   - HTML/CSS for landing page design
   - Email marketing tools for crafting phishing emails

2. **Skills**:
   - Phishing Simulation Setup and Management
   - Email and Web Server Administration
   - Security Awareness Training
   - Data Analysis and Reporting
   - Ethical Hacking and Social Engineering Techniques

These tools and skills will not only enhance your technical portfolio but also demonstrate your capability in managing security-awareness initiatives within an organization.