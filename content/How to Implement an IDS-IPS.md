up:: [[Network & Systems Security Labs]], [[Threat Detection & Response Labs]]
### Project: Implementing an IDS/IPS with Snort

**Snort** is an open-source tool used to detect and prevent potential security threats by monitoring network traffic. An **IDS** (Intrusion Detection System) watches for suspicious activity and alerts you, while an **IPS** (Intrusion Prevention System) can actively block such threats.

---

### Prerequisites

Before you begin, make sure you have:
- **Basic knowledge of Linux commands** for navigating and editing files.
- **A Linux system** (Ubuntu is preferred for this guide).
- **Root or sudo access** to run administrative commands.

---

### Step-by-Step Guide to Setting Up Snort

---

#### Step 1: Update Your System

It’s always best to start with an up-to-date system to ensure compatibility.

1. Open the terminal.
2. Run these commands to update your package list and install any upgrades:

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

   - **Explanation**: `apt update` refreshes the list of available packages, and `apt upgrade -y` installs the latest versions. The `-y` flag auto-confirms prompts.

---

#### Step 2: Install Required Dependencies

Snort requires several additional packages for proper operation.

1. Install the necessary dependencies with this command:

   ```bash
sudo apt install -y build-essential libpcap-dev libpcre3-dev libdumbnet-dev bison flex zlib1g-dev libssl-dev libluajit-5.1-dev libtirpc-dev pkg-config
   ```

   - **Explanation**: These packages help with compiling Snort and include important libraries, like `libpcap` (for packet capturing) and `libpcre` (for regular expression support).

2. Download and Install DAQ (Data Acquisition Library)**
Snort requires the DAQ library. Download, compile, and install it before Snort.

1. **Download DAQ**:
   ```bash
   wget https://www.snort.org/downloads/snort/daq-2.0.7.tar.gz
   ```

2. **Extract DAQ**:
   ```bash
   tar -xvzf daq-2.0.7.tar.gz
   cd daq-2.0.7
   ```

3. **Build and Install DAQ**:
   ```bash
   ./configure
   make
   sudo make install
   ```

4. **Verify Installation**:
   Run the following command to check if DAQ is installed:
   ```bash
   ldconfig -p | grep daq
   ```

---

#### Step 3: Download and Install Snort

1. **Download the Snort Source Code**:
   - Visit [Snort’s downloads page](https://www.snort.org/downloads) and get the latest version of Snort.
   - Alternatively, you can use the following command (replace `2.9.20` with the latest version):

     ```bash
     wget https://www.snort.org/downloads/snort/snort-2.9.20.tar.gz
     ```

2. **Extract the Downloaded File**:

   ```bash
   tar -xvzf snort-2.9.20.tar.gz
   cd snort-2.9.20
   ```

3. **Compile and Install Snort**:

   ```bash
   ./configure --enable-sourcefire
   make
   sudo make install
   sudo ldconfig
   sudo ln -s /usr/local/bin/snort /usr/sbin/snort
   ```

   - **Explanation**: These commands compile Snort from source and add a symbolic link to make it accessible system-wide.

---

#### Step 4: Verify Installation

To confirm that Snort is installed correctly, check its version:

```bash
snort -V
```

You should see the version number and other details, which means Snort is ready.

---

#### Step 5: Create Configuration Directories

Snort requires specific directories for configuration files and logs.

1. Set up the necessary directories:

   ```bash
   sudo mkdir /etc/snort
   sudo mkdir /etc/snort/rules
   sudo mkdir /var/log/snort
   sudo mkdir /usr/local/lib/snort_dynamicrules
   ```

   - **Explanation**: These directories will store Snort’s configuration, rules, and log files.

---

#### Step 6: Download and Configure Snort Rules

Rules are essential for Snort to recognize threats by defining patterns to watch for in network traffic.

1. **Download Snort Rules**:
   - Register on [Snort’s website](https://www.snort.org/) to access the latest rules.
   - Download the **Community Rules** (free option) and extract them:

     ```bash
     wget https://www.snort.org/downloads/community/community-rules.tar.gz
     tar -xvzf community-rules.tar.gz
     sudo cp community-rules/* /etc/snort/rules
     ```

2. **Get Default Configuration Files**:
   - Copy default configuration files to the `/etc/snort` directory:

     ```bash
     sudo cp etc/*.conf /etc/snort
     sudo cp etc/*.map /etc/snort
     ```

3. **Edit the Snort Configuration File**:
   - Open the main Snort configuration file:

     ```bash
     sudo nano /etc/snort/snort.conf
     ```

   - **Set Network Variables**:
     - Find the `HOME_NET` variable and set it to your network’s IP range, such as:

       ```plaintext
       var HOME_NET 192.168.1.0/24
       ```

   - **Rule Path**:
     - Ensure the rule path is set correctly in the configuration:

       ```plaintext
       var RULE_PATH /etc/snort/rules
       ```

   - **Include Rule Files**:
     - At the end of the file, include the community rules by adding:

       ```plaintext
       include $RULE_PATH/community.rules
       ```

   **Tip**: Make sure to save and close the file after editing.

---

#### Step 7: Test Snort Configuration

To check if Snort is configured correctly, run this test command:

```bash
sudo snort -T -c /etc/snort/snort.conf
```

- **Explanation**: The `-T` option tests the configuration without starting Snort.
- If everything is configured correctly, you should see a success message.

---

#### Step 8: Run Snort in IDS Mode

In IDS mode, Snort monitors network traffic and logs suspicious activities without blocking them.

1. Start Snort in IDS mode with this command:

   ```bash
   sudo snort -A console -q -c /etc/snort/snort.conf -i eth0
   ```

   - **Options**:
     - `-A console`: Prints alerts to the console.
     - `-q`: Quiet mode, reducing the amount of output.
     - `-c /etc/snort/snort.conf`: Specifies the configuration file.
     - `-i eth0`: Specifies the network interface. Replace `eth0` with your interface name (use `ip a` to list interfaces).

---

#### Step 9: Run Snort in IPS Mode (Optional)

In IPS mode, Snort can block suspicious traffic, adding an extra layer of security.

1. **Enable Inline Mode**:
   - Open the configuration file and add the following line to enable inline blocking:

     ```plaintext
     config policy_mode:inline
     ```

2. **Run Snort in IPS Mode**:

   ```bash
   sudo snort -Q --daq afpacket -c /etc/snort/snort.conf -i eth0:eth1
   ```

   - **Options**:
     - `-Q`: Enables inline mode.
     - `--daq afpacket`: Specifies the DAQ (Data Acquisition) module for inline mode.
     - `-i eth0:eth1`: Specifies the interfaces Snort will bridge in IPS mode. Replace `eth0` and `eth1` with your specific interfaces.

---

#### Step 10: Monitor Logs

Snort logs activity to the `/var/log/snort` directory, where you can check for alerts.

1. To monitor the logs, use this command:

   ```bash
   sudo tail -f /var/log/snort/alert
   ```

   - **Explanation**: The `-f` option continuously updates the output with new log entries, letting you monitor activity in real-time.

---

#### Step 11: Document Your Setup

Keeping track of your configurations is essential for maintenance and troubleshooting.

1. **Create a Network Diagram**:
   - Use a tool like [draw.io](https://www.draw.io) to create a simple diagram showing your network, including Snort’s location, IP addresses, and any key devices.

2. **Document Configuration Details**:
   - Record important configurations, like the `HOME_NET` settings, rule paths, and any specific Snort commands you use.

---

### Conclusion

You have successfully set up Snort as an IDS/IPS on your Linux system. With Snort, you can monitor and protect your network from potential threats by setting up alerts or actively blocking malicious traffic. Continue exploring Snort’s extensive features to create custom rules and fine-tune your security settings to suit your network’s needs.

---

### Where to Find Assistance

For those new to setting up Snort as an IDS/IPS, the following resources will provide essential support:

1. **Snort Official Documentation**: Access detailed setup guides, configuration options, and troubleshooting tips [here](https://www.snort.org/documents).
2. **Snort Users Mailing List**: Join the mailing list for discussions, advice, and support from other Snort users [Snort Mailing List](https://lists.snort.org/mailman/listinfo/snort-users).
3. **Online Forums**: Websites like [Stack Overflow](https://stackoverflow.com/questions/tagged/snort) and [Security StackExchange](https://security.stackexchange.com/questions/tagged/snort) offer community support where you can ask specific questions.
4. **YouTube Tutorials**: Search for tutorials on setting up Snort; channels like [NetworkChuck](https://www.youtube.com/user/NetworkChuck) may have related content.
5. **GitHub Repositories**: Explore repositories that share custom Snort rules and configuration tips, such as [Snort on GitHub](https://github.com/snort3/snort3).

### Learning in Public Prompts

- "Configured my first Snort IDS rule today—amazed by what it can detect!"
- "Getting my hands dirty with Snort’s inline IPS mode. Blocking threats in real-time is quite empowering."
- "Struggled with Snort dependencies but finally got everything running. Here’s a breakdown of what I learned."
- "Exploring network packet data with Snort. It’s fascinating to see the traffic that goes through unnoticed."
- "Successfully implemented Snort in my home lab network—feels like a big step forward in my cybersecurity journey!"

### Metrics to Track

1. **Technical Metrics**:
   - Number of intrusions detected and prevented by Snort.
   - Accuracy of threat detection (true positives vs. false positives).
   - Network latency and throughput before and after Snort implementation.

2. **Learning-Focused Metrics**:
   - Number of Snort rules written and successfully implemented.
   - Hours spent learning Snort’s configuration and rule syntax.
   - Progress in understanding network traffic and threat patterns.

3. **Monetary and Helpful Metrics**:
   - Estimated cost savings from prevented security breaches.
   - Number of peers or colleagues helped in setting up their own Snort systems.

### STAR Statement Examples for Resumes

- "Implemented Snort IDS/IPS on a network, increasing threat detection by 75% and reducing unauthorized access incidents by 50%."
- "Customized and deployed Snort rules that decreased false positives by 30%, enhancing the accuracy of network security monitoring."
- "Led a project to integrate Snort with network infrastructure, which prevented significant data breaches and safeguarded critical assets."
- "Configured Snort to operate in inline IPS mode, effectively blocking 90% of potential threats and maintaining high network performance."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - Snort IDS/IPS
  - Linux operating systems (Ubuntu, CentOS)
  - Network monitoring tools (Wireshark, tcpdump)
  - Data Acquisition (DAQ) for Snort

- **Skills**:
  - Intrusion detection and prevention configuration
  - Network traffic analysis and monitoring
  - Security policy implementation
  - Regular expressions and rule-writing for IDS/IPS
  - Troubleshooting and optimizing network security settings

