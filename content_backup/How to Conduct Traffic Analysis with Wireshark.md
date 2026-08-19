up:: [[Network & Systems Security Labs]], [[Threat Detection & Response Labs]]
### Project: Network Traffic Analysis with Wireshark

**Wireshark** is a powerful tool for capturing and analyzing network traffic. It helps cybersecurity professionals monitor and understand data flowing across a network, identify potential security issues, and gain insights into network behavior.

---

### Prerequisites

Before you begin, make sure you have:
- **Basic knowledge of computer networking** to understand terms like IP addresses, protocols, and ports.
- **A computer with internet access** to capture real-time traffic.
- **Root or sudo access** to install Wireshark on your system if needed.

---

### Step-by-Step Guide to Using Wireshark

---

#### Step 1: Install Wireshark

1. **Download Wireshark**:
   - Go to the Wireshark download page at [https://www.wireshark.org/download.html](https://www.wireshark.org/download.html).
   - Choose the installer for your operating system (Windows, macOS, or Linux).

2. **Install Wireshark**:
   - **Windows**: Double-click the `.exe` file you downloaded and follow the installation prompts.
   - **macOS**: Open the `.dmg` file, drag the Wireshark icon to the Applications folder, and follow any instructions.
   - **Linux**: Open a terminal and use the following commands for Ubuntu:

     ```bash
     sudo apt update
     sudo apt install wireshark
     sudo usermod -aG wireshark $USER
     newgrp wireshark
     ```

   - **Explanation**: `usermod -aG wireshark $USER` adds you to the Wireshark group, allowing you to capture packets without root permissions.

   - **Tip**: Restart your computer if you have trouble launching Wireshark after installation.

---

#### Step 2: Launch Wireshark

1. **Open Wireshark**:
   - Start Wireshark from your application menu, or type `wireshark` in your terminal/command prompt.

2. **Select a Network Interface**:
   - On the Wireshark main screen, you’ll see a list of available network interfaces (like `eth0` for Ethernet or `wlan0` for Wi-Fi). Click on the interface you want to capture traffic on.

   - **Tip**: If you’re on Wi-Fi, choose the interface labeled with `wlan` to capture wireless traffic.

---

#### Step 3: Capture Network Traffic

1. **Start Capturing**:
   - Click on the selected network interface to begin capturing. You’ll start seeing packets appear in real-time.

2. **Generate Network Traffic**:
   - Open a web browser and visit a few websites to generate HTTP/HTTPS traffic, which Wireshark will capture and display.

3. **Stop Capturing**:
   - When you’ve captured enough data, click the red square button to stop the capture.

   - **Tip**: Capture only what you need to avoid creating large files with excessive data.

---

#### Step 4: Analyze Network Traffic

1. **View Packet Details**:
   - Click on any packet in the list to see its details below. The details pane shows information about each part of the packet, like Ethernet, IP, and TCP headers.

2. **Filter Traffic**:
   - Use filters to focus on specific types of traffic. Enter a filter expression in the filter bar and press Enter. Here are some common filters:

     - **HTTP Traffic**: 

       ```plaintext
       http
       ```

     - **TCP Traffic**: 

       ```plaintext
       tcp
       ```

     - **Traffic from a Specific IP**:

       ```plaintext
       ip.addr == 192.168.1.1
       ```

     - **Packets to a Specific Port**:

       ```plaintext
       tcp.port == 80
       ```

   - **Tip**: Wireshark has many built-in filters; you can find them by clicking on the filter bar.

3. **Follow TCP/UDP Streams**:
   - Right-click on a packet, go to `Follow`, and select `TCP Stream` or `UDP Stream` to see the full conversation (e.g., a browser request and server response).

4. **Inspect Packet Contents**:
   - Expand each part of the packet in the details pane to see more information about each layer (Ethernet, IP, TCP, HTTP, etc.).

   - **Tip**: This breakdown shows you how data moves through network layers.

---

#### Step 5: Save and Export Captures

1. **Save the Entire Capture**:
   - To save the capture, go to `File` -> `Save As`, choose a location, and save the file with a `.pcap` or `.pcapng` extension for later analysis.

2. **Export Specific Packets**:
   - If you only need certain packets, apply the necessary filter, then go to `File` -> `Export Specified Packets` to save just those filtered packets.

   - **Tip**: This is useful for isolating specific data without saving the entire capture file.

---

#### Step 6: Advanced Analysis (Optional)

Wireshark includes several tools for deeper analysis, which can be helpful as you become more comfortable with the software.

1. **Use Built-in Analysis Tools**:
   - Explore the **Statistics** menu, where you’ll find tools to analyze traffic patterns:
     - **Protocol Hierarchy**: See which protocols are most common in your capture.
     - **Conversations**: View communication pairs and statistics about their exchanges.
     - **Endpoints**: See statistics for individual IP addresses communicating in the capture.

2. **Create Custom Filters**:
   - Combine different filter expressions to create custom filters for specific traffic you’re interested in.

   - **Tip**: Learning Wireshark’s filtering language can help you find exactly the traffic you need, even in large captures.

---

#### Step 7: Document Your Analysis

Proper documentation is helpful for sharing findings or reviewing traffic patterns in the future.

1. **Capture Summary**:
   - Document the date, time, duration, and network interface used for the capture.

2. **Key Findings**:
   - Note significant findings, such as unusual traffic patterns, suspicious IP addresses, or unexpected protocol use.

3. **Screenshots**:
   - Take screenshots of key parts of your analysis, such as filtered traffic or specific packet details.

---

### Conclusion

You have successfully installed Wireshark, captured network traffic, and performed basic analysis. This setup gives you a powerful tool for network monitoring and analysis, which is a valuable skill in cybersecurity. To deepen your understanding, continue capturing and analyzing different types of traffic and exploring Wireshark’s advanced features. Happy analyzing!

---

### Where to Find Assistance

For beginners using Wireshark, several resources are invaluable for guidance and problem-solving:

1. **Official Documentation**: Wireshark provides a comprehensive user guide that is an excellent starting point. Access it [here](https://www.wireshark.org/docs/).
2. **Wireshark Q&A Forum**: Pose questions and get answers from the community on the [Wireshark Q&A site](https://ask.wireshark.org/).
3. **YouTube Tutorials**: Channels like NetworkChuck and David Bombal offer beginner-friendly video tutorials on how to use Wireshark.
4. **Reddit Communities**: Subreddits like r/Wireshark and r/netsecstudents are good places to ask questions and share information with peers.
5. **Stack Overflow**: Often has threads related to specific issues you might encounter using Wireshark. Visit [Stack Overflow](https://stackoverflow.com/questions/tagged/wireshark).

### Learning in Public Prompts

- "Just started using Wireshark to monitor network traffic, and I’m amazed at how much data travels in a second!"
- "Today’s challenge: Filtering HTTP traffic in Wireshark. Any tips on how to streamline this process?"
- "Found an interesting packet with unexpected data while analyzing traffic today. Has anyone else encountered this?"
- "Successfully followed a TCP stream today and decoded a website session. The flow of data is fascinating!"
- "Trying to understand TCP vs. UDP from real captures. Here's what I’ve learned so far..."

### Metrics to Track

1. **Technical Metrics**:
   - Number of packets captured per session.
   - Types of protocols most frequently observed.
   - Successful identification of anomalous packets.

2. **Learning-Focused Metrics**:
   - Time spent on setup and troubleshooting installation issues.
   - Number of new filters and commands learned each week.

3. **Monetary and Helpful Metrics**:
   - Cost of additional resources or tools required for advanced analysis.
   - Instances where analysis helped identify and mitigate a network issue.

### STAR Statement Examples for Resumes

- "Analyzed over 5,000 network packets using Wireshark to identify and address 3 major security vulnerabilities, improving network safety by 30%."
- "Led a project to monitor and optimize network performance, reducing packet loss by 25% through targeted traffic analysis."
- "Implemented custom Wireshark filters to isolate and resolve recurring network interruptions, enhancing uptime by 40%."
- "Conducted a detailed traffic analysis with Wireshark that identified unauthorized access attempts, resulting in a security protocol overhaul that decreased breaches by 50%."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - Wireshark
  - Network analyzers
  - Packet crafting tools

- **Skills**:
  - Network traffic analysis
  - Packet filtering and interpretation
  - Understanding of TCP/IP protocols
  - Anomaly detection in network traffic
  - Creating and using custom Wireshark filters