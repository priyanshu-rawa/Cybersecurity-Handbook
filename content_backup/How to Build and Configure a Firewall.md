up:: [[Network & Systems Security Labs]]

Here's a beginner-friendly guide to building and configuring a firewall on an Ubuntu system using UFW (Uncomplicated Firewall). This will provide extra tips, explanations, and troubleshooting guidance to help you confidently secure your system.

---

### Project: Building and Configuring a Firewall with UFW on Ubuntu

Setting up a firewall is a crucial step for securing your system and protecting it from unauthorized access and potential threats. A firewall controls which network traffic can enter or leave your system, allowing only the connections you permit and blocking the rest.

### Prerequisites

Before you start, make sure you have:
- **Basic knowledge of Linux commands.** (If you’re not familiar with Linux commands, consider reviewing a basic guide or tutorial on command-line navigation and sudo usage.)
- **An Ubuntu system** (this can be a physical or virtual machine).
- **Root or sudo access** to run commands with elevated privileges.

### Step-by-Step Guide to Configuring a Firewall Using UFW

---

#### Step 1: Update Your System

Keeping your system up to date is essential before making security configurations.

1. Open the terminal.
2. Run the following commands to update the system’s package lists and install any available upgrades:

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

   - **Explanation**: `sudo apt update` refreshes your package list, and `sudo apt upgrade -y` installs the latest versions of packages. `-y` automatically answers "yes" to any prompts.

   **Tip**: Regularly updating your system helps fix potential security vulnerabilities.

---

#### Step 2: Install UFW

UFW (Uncomplicated Firewall) simplifies the process of managing firewall rules.

1. Install UFW (if it’s not already installed) by running:

   ```bash
   sudo apt install ufw
   ```

   - **Explanation**: `apt install` is the command to install software, and `ufw` is the package name.

   **Tip**: UFW often comes pre-installed on Ubuntu. If you see a message saying it's already installed, you can move to the next step!

---

#### Step 3: Enable UFW

By default, UFW is disabled, meaning it doesn’t block or allow any traffic until it’s enabled.

1. Enable UFW with this command:

   ```bash
   sudo ufw enable
   ```

   - **Explanation**: Enabling UFW activates the firewall and begins enforcing any rules you set.

   2. You’ll be prompted to confirm the action. Type `y` (yes) and press `Enter`.

   **Important**: Once UFW is enabled, it will block all incoming connections by default unless you specify otherwise. Don’t worry, we’ll configure rules next to ensure you don’t lock yourself out!

---

#### Step 4: Allow SSH Connections

To avoid locking yourself out, especially if you’re using a remote connection, allow SSH (Secure Shell) access. SSH is a common protocol used for remote access.

1. Allow SSH with this command:

   ```bash
   sudo ufw allow ssh
   ```

   - **Explanation**: This allows connections over SSH, typically on port 22. If SSH runs on a different port, replace `ssh` with the port number, like this: `sudo ufw allow 2222/tcp`.

   **Tip**: Allowing SSH ensures you can still access your system remotely after enabling the firewall.

---

#### Step 5: Allow Specific Services and Ports

Here you’ll define which services (like HTTP for web traffic) and ports are allowed to connect to your system.

1. **Allow HTTP and HTTPS traffic** (for web servers):

   ```bash
   sudo ufw allow http
   sudo ufw allow https
   ```

   - **Explanation**: These commands allow web traffic on ports 80 (HTTP) and 443 (HTTPS). You can also specify the ports directly if needed:

     ```bash
     sudo ufw allow 80/tcp
     sudo ufw allow 443/tcp
     ```

2. **Allow other specific ports** (e.g., 8080):

   ```bash
   sudo ufw allow 8080/tcp
   ```

3. **Allow a range of ports** (useful for applications that use multiple ports):

   ```bash
   sudo ufw allow 1000:2000/tcp
   ```

4. **Allow connections from specific IP addresses only** (e.g., if you want only certain IPs to connect):

   ```bash
   sudo ufw allow from 192.168.1.100
   ```

5. **Allow specific subnets** (a group of IP addresses, often used within local networks):

   ```bash
   sudo ufw allow from 192.168.1.0/24
   ```

   **Tip**: Only allow ports and services that are necessary for your system to reduce your exposure to potential threats.

---

#### Step 6: Deny Specific Services and Ports (Optional)

UFW blocks incoming connections by default, but you can explicitly deny certain traffic if needed.

1. **Deny a specific port** (e.g., Telnet on port 23, which is insecure):

   ```bash
   sudo ufw deny 23/tcp
   ```

2. **Deny connections from a specific IP address** (e.g., if an IP is causing suspicious activity):

   ```bash
   sudo ufw deny from 203.0.113.0
   ```

---

#### Step 7: View UFW Status and Rules

To see which rules are active and confirm your firewall setup:

1. Check the UFW status with:

   ```bash
   sudo ufw status verbose
   ```

   - **Explanation**: This shows the current status (enabled/disabled) and lists all active rules.

   **Tip**: Regularly check the firewall status to ensure your rules are as expected.

---

#### Step 8: Delete UFW Rules

If you need to delete or change a rule, UFW makes it easy.

1. **Using rule number**:

   - First, list the rules with numbers:

     ```bash
     sudo ufw status numbered
     ```

   - Then delete a rule by specifying its number:

     ```bash
     sudo ufw delete 2
     ```

2. **Using rule specification**:

   - Delete a rule directly by specifying it, like this:

     ```bash
     sudo ufw delete allow 8080/tcp
     ```

---

#### Step 9: Advanced UFW Configuration (Optional)

1. **Enable Logging**: To monitor UFW activity, turn on logging:

   ```bash
   sudo ufw logging on
   ```

2. **Set Default Policies**: Define overall traffic rules—deny all incoming and allow all outgoing traffic:

   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   ```

3. **Application Profiles**: UFW has built-in profiles for certain applications (like Nginx). List available profiles with:

   ```bash
   sudo ufw app list
   ```

   Then allow a specific application profile:

   ```bash
   sudo ufw allow 'Nginx Full'
   ```

---

#### Step 10: Testing the Firewall

1. **Check Open Ports**: From another device, you can use `nmap` (network mapping tool) to scan open ports on your firewall-protected system:

   ```bash
   nmap -v -A 192.168.1.10  # Replace with the actual IP address
   ```

2. **Confirm Connection Rules**: Try connecting to services you allowed and those you denied to test if the firewall works as expected.

---

#### Step 11: Document Your Setup

Documenting your firewall configuration will help you or others understand and manage your settings later.

1. **Record Firewall Rules**: Create a simple text file listing each rule:

   ```plaintext
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw deny 23/tcp
   ```

2. **Document Configuration Details**: Include information on default policies, logging, and any application profiles used.

---

### Conclusion

You’ve successfully set up and configured a firewall on your Ubuntu system using UFW! This setup will help protect your system from unauthorized access and potential threats. Remember to monitor logs and adjust rules as needed to keep your system secure. 

**Extra Resources**: For more practice, try online tutorials or videos on UFW and general Linux security basics.

---

### Where to Find Assistance

For beginners configuring UFW on Ubuntu, the following resources can be very helpful:

1. **Official Ubuntu Documentation**: [UFW - Uncomplicated Firewall](https://help.ubuntu.com/community/UFW) on the Ubuntu community help pages offers a detailed guide.
2. **DigitalOcean Community Tutorials**: Provides a [comprehensive tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04) on setting up UFW.
3. **Ask Ubuntu**: A community-driven question and answer site for Ubuntu users and developers. Great for troubleshooting and advice. Visit [Ask Ubuntu](https://askubuntu.com/).
4. **Stack Overflow**: Find answers or ask new questions about specific issues related to UFW and firewall configuration [here](https://stackoverflow.com/questions/tagged/ufw).
5. **Ubuntu Forums**: A place to connect with other Ubuntu users and get questions answered about UFW and other related topics at [Ubuntu Forums](https://ubuntuforums.org/).

### Learning in Public Prompts

- "Configured my first Ubuntu firewall using UFW—learning the basics of network security!"
- "Just figured out how to allow SSH while keeping my system secure. Here's what I learned about UFW rules."
- "Successfully blocked and unblocked specific ports today. The power of proper firewall settings is immense!"
- "Experimenting with UFW to understand the difference between default deny and allow rules. Gaining control over what traffic my machine sees."
- "Managed to secure my home server by setting up a firewall. Starting to feel like a real sysadmin!"

### Metrics to Track

1. **Technical Metrics**:
   - Number of successfully blocked unauthorized access attempts.
   - Time taken to apply firewall rules effectively.

2. **Learning-Focused Metrics**:
   - Number of commands learned and used in UFW.
   - Time spent researching and understanding firewall concepts.

3. **Monetary and Helpful Metrics**:
   - Costs saved by preventing potential security breaches.
   - Number of peers or community members helped through shared knowledge of UFW configurations.

### STAR Statement Examples for Resumes

- "Configured a secure firewall using UFW on an Ubuntu server, successfully blocking all unauthorized access attempts and reducing potential security threats by 100%."
- "Implemented specific firewall rules that allowed secure SSH access, enhancing remote management capabilities without compromising system security."
- "Optimized network security by enforcing strict firewall policies with UFW, resulting in a 75% reduction in unwanted network traffic."
- "Conducted comprehensive network tests and adjustments to firewall settings, achieving a fully secure system environment, and maintaining 99.9% uptime."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - UFW (Uncomplicated Firewall)
  - Ubuntu Linux
  - Nmap (for testing firewall rules)

- **Skills**:
  - Firewall configuration and management
  - Network security monitoring
  - Secure system setup
  - Troubleshooting and optimizing network traffic rules
  - Documentation and rule management using UFW