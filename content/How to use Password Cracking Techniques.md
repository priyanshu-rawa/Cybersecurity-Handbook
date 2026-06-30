up:: [[Offensive Security Labs]]
# **Password Cracking Techniques**

**Objective:**  
This project will introduce you to password cracking, a common technique in penetration testing used to evaluate the strength of passwords. You’ll explore how to crack sample passwords using two popular tools: **John the Ripper** and **Hashcat**. By the end, you’ll understand the basics of these tools and the importance of strong passwords.

---

## **What You’ll Need**

**Prerequisites:**
- **Basic knowledge of Linux commands**: Familiarity with creating files, editing text, and running simple commands.
- **A computer with internet access**
- **Kali Linux**: We’ll use Kali Linux because it has both Hashcat and John the Ripper pre-installed.

If you’re new to Kali Linux or virtual machines, try setting up Kali in VirtualBox. You can [download Kali Linux here](https://www.kali.org/downloads/) and [VirtualBox here](https://www.virtualbox.org/wiki/Downloads).

---

## **Important Notes**

- **Ethics and Safety**: Only perform password cracking exercises in a controlled environment and with permission. Do not attempt this on any unauthorized systems, as password cracking without permission is illegal.
- **Understanding Password Cracking**: Cracking is typically used to test the security of systems by identifying weak passwords. **The goal is to raise awareness and improve password policies, not to break into systems unlawfully.**

---

## **Step-by-Step Guide**

### **Step 1: Set Up the Environment**

1. **Install or Launch Kali Linux**:
   - If you’re using a virtual machine, download the Kali Linux `.ova` file and import it into VirtualBox. Start Kali Linux once it’s set up.

2. **Verify Tool Installation**:
   - Both **Hashcat** and **John the Ripper** should come pre-installed in Kali. Confirm by typing the following commands:
     ```bash
     hashcat --version
     john --version
     ```
   - These commands should show version information if the tools are correctly installed.

---

### **Step 2: Create Sample Password Hashes**

For this project, we’ll create a list of sample passwords, hash them, and then try to crack these hashes.

1. **Generate Sample Passwords**:
   - In your terminal, create a file called `passwords.txt` to store sample passwords.
     ```bash
     nano passwords.txt
     ```
   - Add the following sample passwords, each on a new line:
     ```
     password123
     admin
     letmein
     123456
     password1
     qwerty
     ```
   - Save and close the file by pressing `CTRL + X`, then `Y` to confirm, and `Enter` to exit.

2. **Hash the Passwords Using MD5**:
   - To make it more realistic, we’ll convert these plain-text passwords into **MD5 hashes** (a commonly used hash format).
   - Run the following command to hash each password in `passwords.txt` and store the results in `hashed_passwords.txt`:
     ```bash
     while read -r password; do echo -n "$password" | openssl dgst -md5; done < passwords.txt > hashed_passwords.txt
     ```
   - Open `hashed_passwords.txt` to see the hashed version of each password:
     ```bash
     cat hashed_passwords.txt
     ```
   - **Explanation**: This command takes each password, hashes it in MD5 format, and outputs it to `hashed_passwords.txt`. Each hash represents an encrypted form of the original password.

---

### **Step 3: Crack Passwords with John the Ripper**

1. **Prepare the Hashes for John the Ripper**:
   - John requires a specific format to work with hashed passwords. Create a file named `hashes_john.txt` and manually enter the MD5 hashes in a way John can process.
     ```bash
     nano hashes_john.txt
     ```
   - Enter the following in `hashes_john.txt`, replacing each line with a unique user identifier:
     ```plaintext
     user1:$dynamic_0$6cb75f652a9b52798eb6cf2201057c73
     user2:$dynamic_0$21232f297a57a5a743894a0e4a801fc3
     user3:$dynamic_0$d0763edaa9d9bd2a9516280e9044d885
     user4:$dynamic_0$e10adc3949ba59abbe56e057f20f883e
     user5:$dynamic_0$7c6a180b36896a0a8c02787eeafb0e4c
     user6:$dynamic_0$d8578edf8458ce06fbc5bb76a58c5ca4
     ```
   - **Explanation**: Each entry has a username (`user1`, etc.) and the hash (`$dynamic_0$` format tells John it’s an MD5 hash).

2. **Run John the Ripper**:
   - Run John with a **dictionary attack** (using your list of sample passwords):
     ```bash
     john --wordlist=passwords.txt hashes_john.txt
     ```
   - John will attempt to match each hash in `hashes_john.txt` to a password in `passwords.txt`.

3. **View Cracked Passwords**:
   - Once the process completes, view the cracked passwords:
     ```bash
     john --show hashes_john.txt
     ```
   - John will display any passwords it successfully matched with the hashes.

---

### **Step 4: Crack Passwords with Hashcat**

Hashcat is another powerful password-cracking tool, which uses the GPU (graphics processing unit) if available for faster cracking.

1. **Prepare the Hashes for Hashcat**:
   - Hashcat doesn’t need usernames; it only requires a list of raw hashes. Create a new file named `hashes_hashcat.txt` and add each MD5 hash on a separate line:
     ```bash
     nano hashes_hashcat.txt
     ```
   - Paste the following hashes:
     ```
     6cb75f652a9b52798eb6cf2201057c73
     21232f297a57a5a743894a0e4a801fc3
     d0763edaa9d9bd2a9516280e9044d885
     e10adc3949ba59abbe56e057f20f883e
     7c6a180b36896a0a8c02787eeafb0e4c
     d8578edf8458ce06fbc5bb76a58c5ca4
     ```

2. **Run Hashcat**:
   - Use Hashcat with a dictionary attack to crack the hashes. Run the following command:
     ```bash
     hashcat -m 0 -a 0 -o cracked_passwords.txt hashes_hashcat.txt passwords.txt
     ```
   - **Explanation**:
     - `-m 0` specifies MD5 hashes.
     - `-a 0` specifies a dictionary attack.
     - `-o cracked_passwords.txt` saves the results to a file.

3. **View the Cracked Passwords**:
   - After Hashcat finishes, view the results in `cracked_passwords.txt`:
     ```bash
     cat cracked_passwords.txt
     ```
   - This file will show any passwords that Hashcat successfully matched to the MD5 hashes.

---

### **Step 5: Document the Process and Findings**

1. **Document the Setup**:
   - Write down the tools, environment, and setup used for this exercise.

2. **List Passwords and Hashes**:
   - Include a list of the sample passwords and their corresponding MD5 hashes.

3. **Results from Cracking**:
   - Document which passwords were successfully cracked, the time taken by each tool, and any patterns observed (like common words or weak passwords).

4. **Analysis and Recommendations**:
   - Analyze the results to understand the strengths and weaknesses of the passwords used.
   - Provide recommendations, such as:
     - Use longer, complex passwords.
     - Avoid common passwords or simple patterns.
     - Enable **account lockout policies** to limit password guessing attempts.
     - **Use multi-factor authentication (MFA)** for added security.

---

### **Conclusion**

You’ve now learned how password-cracking tools work, and you’ve used both **John the Ripper** and **Hashcat** to crack weak passwords. This exercise shows why strong password policies are crucial and demonstrates the power of modern cracking tools. To further develop your skills, experiment with different types of hashes (like SHA-256) and more complex password cracking techniques.

---

## Where to Find Assistance

For beginners starting with password cracking, here are some resources to help you understand and navigate the tools and techniques:

1. **Official Documentation**:
   - [John the Ripper Documentation](https://www.openwall.com/john/doc/): Comprehensive guide on using John the Ripper.
   - [Hashcat Documentation](https://hashcat.net/wiki/): Detailed documentation for using Hashcat effectively.

2. **Community Forums**:
   - [Hashcat Forum](https://hashcat.net/forum/): A community where you can ask questions and share knowledge about Hashcat.
   - [John-users Mailing List](https://www.openwall.com/lists/john-users/): A mailing list for users of John the Ripper to discuss issues and tips.

3. **Online Tutorials**:
   - [Cybrary Courses on Password Cracking](https://www.cybrary.it/): Offers beginner to advanced courses on password cracking techniques.
   - YouTube tutorials for visual learners, such as those from [NetworkChuck](https://www.youtube.com/c/NetworkChuck) or [HackerSploit](https://www.youtube.com/c/HackerSploit), which often include practical demonstrations of password cracking.

4. **Discussion Boards**:
   - [Reddit: r/cybersecurity](https://www.reddit.com/r/cybersecurity/): General cybersecurity discussions including threads on ethical hacking and password cracking.
   - [Stack Exchange Security](https://security.stackexchange.com/): Ask and answer questions about secure password practices and cracking techniques.

## Learning in Public Prompts

Engage with the community and share your learning using these prompts:

- "Exploring John the Ripper today—here's what I've learned about password hashing and cracking..."
- "Successfully cracked my first password with Hashcat! It’s interesting to see how different algorithms perform..."
- "Challenges I faced with setting up my Kali Linux environment for password cracking..."
- "Here’s a comparison of password strength I tested—surprising how quickly some are cracked!"
- "Anyone else working on understanding the effectiveness of different hashing algorithms? Here’s what I found..."
- "Just learned the importance of salt in passwords. Did anyone else know it adds so much security?"

## Metrics to Track

Key metrics beginners should track include:

1. **Technical Metrics**:
   - Number of passwords cracked per tool (John the Ripper vs. Hashcat).
   - Time taken to crack each password.
   - Types of hashes successfully cracked.

2. **Learning-focused Metrics**:
   - Hours spent learning each tool.
   - Number of password policies tested (e.g., length, complexity).
   - Progress in understanding different hash functions (e.g., MD5 vs. SHA-256).

3. **Additional Metrics**:
   - Cost implications if using paid versions of tools or cloud computing resources.
   - Number of people educated about password security based on your findings.

## STAR Statement Examples for Resumes

1. "Utilized John the Ripper to crack 75% of hashed passwords within a controlled lab setting, demonstrating the vulnerability of common passwords and enhancing security protocol recommendations."
2. "Conducted a comparative analysis using Hashcat, accelerating password cracking by 40% compared to traditional methods, leading to improved security practices."
3. "Developed and executed a password security workshop based on findings from password cracking experiments, increasing participant password strength awareness by 50%."
4. "Implemented and tested various cryptographic hash functions, revealing a 30% increase in crack times for SHA-256 over MD5, guiding enhanced security measures for sensitive sy stems."

## Tools & Skills to Add to Tools & Technologies Sheet

1. **Tools**:
   - John the Ripper
   - Hashcat
   - Kali Linux
   - OpenSSL (for creating hashes)
   - VirtualBox (for running Kali Linux)

2. **Skills**:
   - Password Cracking Techniques
   - Ethical Hacking Fundamentals
   - Cryptographic Hash Function Usage
   - Linux Command Line Proficiency
   - Security Testing and Vulnerability Assessment

Adding these tools and skills to your resume will showcase your capabilities in cybersecurity and ethical hacking, making you a valuable asset in security-focused roles.