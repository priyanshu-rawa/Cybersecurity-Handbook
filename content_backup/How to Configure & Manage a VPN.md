up:: [[Network & Systems Security Labs]]
### Project: VPN Configuration and Management Using OpenVPN

A **Virtual Private Network (VPN)** creates a secure, encrypted connection between devices over the internet, providing secure remote access to a network. This guide will walk you through setting up an OpenVPN server on a Linux system, along with configuring a client to connect to it.

### Prerequisites

Before you begin, make sure you have:
- **Basic knowledge of Linux commands** – basic command-line navigation and editing files.
- **A Linux system** (preferably Ubuntu).
- **Root or sudo access** to run commands with administrative privileges.
- **A domain name or static IP address** for your server (this helps clients connect to your server).

---

### Step-by-Step Guide to Setting Up OpenVPN

---

#### Step 1: Update Your System

It’s a good idea to ensure your system is fully updated before starting.

1. Open the terminal.
2. Run these commands to update your system’s package list and install any upgrades:

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

   - **Explanation**: `apt update` updates the list of available packages, while `apt upgrade -y` installs the latest versions of these packages. The `-y` flag auto-confirms prompts.

---

#### Step 2: Install OpenVPN and Easy-RSA

**OpenVPN** is the VPN software we’ll use, and **Easy-RSA** is a toolkit that will help us create encryption certificates for our VPN.

1. Install both with the following command:

   ```bash
   sudo apt install -y openvpn easy-rsa
   ```

   - **Explanation**: `openvpn` installs the VPN software, and `easy-rsa` provides tools to create secure certificates for encrypting traffic between clients and the VPN server.

---

#### Step 3: Set Up the Certificate Authority (CA)

To secure connections, we’ll create a **Certificate Authority (CA)**, which is essentially a trusted source for issuing security certificates.

1. **Create the Easy-RSA Directory**:

   ```bash
   make-cadir ~/openvpn-ca
   cd ~/openvpn-ca
   ```

2. **Edit the `vars` File**:

   - Open the `vars` file, which holds information about your organization (like country and city):

     ```bash
     nano vars
     ```

   - Update these lines with your details (replace the placeholders):

     ```plaintext
     set_var EASYRSA_REQ_COUNTRY    "US"
     set_var EASYRSA_REQ_PROVINCE   "California"
     set_var EASYRSA_REQ_CITY       "San Francisco"
     set_var EASYRSA_REQ_ORG        "MyOrg"
     set_var EASYRSA_REQ_EMAIL      "email@example.com"
     set_var EASYRSA_REQ_OU         "MyOrgUnit"
     ```

     - **Explanation**: This information will be embedded into your certificates to identify your VPN's source.

3. **Build the Certificate Authority**:

   - Run the following commands to initialize and create the CA:

     ```bash
     Test2
     ./easyrsa build-ca
     ```

   - When prompted, set a password for the CA (keep this password safe).

---

### Step 4: Generate the Server Certificate and Key

The server certificate and key are essential for securing VPN connections. Follow these steps carefully:

1. **Create the Server Certificate and Private Key**:
   - Generate the private key (`server.key`) and the certificate signing request (CSR):
     ```bash
     ./easyrsa gen-req server nopass
     ```
   - Verify that the `server.key` file has been created:
     ```bash
     ls ~/openvpn-ca/pki/private/ | grep server.key
     ```
     If it’s missing, ensure you’re in the correct directory (`~/openvpn-ca`) and rerun the command.

2. **Sign the Server Certificate**:
   - Use the CA to sign the server's CSR and generate the `server.crt` file:
     ```bash
     ./easyrsa sign-req server server
     ```
   - Confirm the signing by typing `yes` when prompted.
   - Verify that the `server.crt` file has been created:
     ```bash
     ls ~/openvpn-ca/pki/issued/ | grep server.crt
     ```
     If it's missing, recheck the CA setup in **Step 3** and retry this step.

3. **Generate Diffie-Hellman Parameters**:
   - Create the `dh.pem` file to ensure secure key exchange:
     ```bash
     ./easyrsa gen-dh
     ```

4. **Generate an HMAC Key**:
   - Generate the `ta.key` file to prevent specific cyberattacks:
     ```bash
     openvpn --genkey secret ta.key
     ```

5. **Copy All Necessary Files to OpenVPN Directory**:
   - Copy the generated files to the `/etc/openvpn` directory:
     ```bash
     sudo cp ~/openvpn-ca/pki/ca.crt ~/openvpn-ca/pki/private/server.key ~/openvpn-ca/pki/issued/server.crt ~/openvpn-ca/pki/dh.pem ta.key /etc/openvpn/
     ```

6. **Verify the Files Are in Place**:
   - Check that all required files now exist in the `/etc/openvpn` directory:
     ```bash
     ls /etc/openvpn/
     ```
     You should see:
     - `ca.crt`
     - `server.key`
     - `server.crt`
     - `dh.pem`
     - `ta.key`

7. **Set Permissions for the Files**:
   - Ensure proper file permissions to maintain security:
     ```bash
     sudo chmod 600 /etc/openvpn/server.key
     sudo chmod 644 /etc/openvpn/{ca.crt,server.crt,dh.pem,ta.key}
     ```

---

#### Step 5: Configure the OpenVPN Server

1. **Copy the Necessary Files** to OpenVPN’s directory:

   ```bash
   sudo cp pki/ca.crt pki/private/server.key pki/issued/server.crt pki/dh.pem ta.key /etc/openvpn
   ```

2. **Create the OpenVPN Configuration File**:

   - Open a new file to configure the server:

     ```bash
     sudo nano /etc/openvpn/server.conf
     ```

   - Add the following configuration settings:

     ```plaintext
     port 1194
     proto udp
     dev tun
     ca ca.crt
     cert server.crt
     key server.key
     dh dh.pem
     tls-auth ta.key 0
     cipher AES-256-CBC
     auth SHA256
     user nobody
     group nogroup
     persist-key
     persist-tun
     status openvpn-status.log
     log-append /var/log/openvpn.log
     verb 3
     ```

   - **Explanation**: This configures OpenVPN to run on port 1194 (default) with UDP, sets up encryption, and specifies logging options.

3. **Enable IP Forwarding** (needed to allow VPN traffic to move through the server):

   - Open the `sysctl.conf` file:

     ```bash
     sudo nano /etc/sysctl.conf
     ```

   - Uncomment the following line by removing the `#`:

     ```plaintext
     net.ipv4.ip_forward=1
     ```

   - Apply this change:

     ```bash
     sudo sysctl -p
     ```

4. **Configure UFW to Allow OpenVPN Traffic**:

   - Allow traffic on OpenVPN’s default port (1194) and OpenSSH (for remote access):

     ```bash
     sudo ufw allow 1194/udp
     sudo ufw allow OpenSSH
     ```
- (if you run into an error that states "ERROR: Could not find a profile matching 'OpenSSH'" )
   ```bash
    sudo apt install -y openssh-server 
    ```

   - To enable Network Address Translation (NAT), edit UFW’s configuration:


     ```bash
     sudo nano /etc/ufw/before.rules
     ```

   - Add these lines at the top of the file:

     ```plaintext
     *nat
     :POSTROUTING ACCEPT [0:0]
     -A POSTROUTING -s 10.8.0.0/8 -o eth0 -j MASQUERADE
     COMMIT
     ```

   - Enable UFW:

     ```bash
     sudo ufw enable
     ```

---

#### Step 6: Start and Enable the OpenVPN Server

1. Run these commands to start and enable OpenVPN on boot:

   ```bash
   sudo systemctl start openvpn@server
   sudo systemctl enable openvpn@server
   ```

---

#### Step 7: Generate Client Certificates and Configuration

1. **Generate Client Certificate and Key**:

   ```bash
   cd ~/openvpn-ca
   ./easyrsa gen-req client1 nopass
   ./easyrsa sign-req client client1
   ```

2. **Create the Client Configuration Directory** and copy files:

   ```bash
   mkdir -p ~/client-configs/keys
   cp pki/ca.crt pki/private/client1.crt pki/private/client1.key ~/client-configs/keys/
   cp ta.key ~/client-configs/keys/
   ```

3. **Create the Client Configuration File**:

   - Open a new configuration file for the client:

     ```bash
     nano ~/client-configs/base.conf
     ```

   - Add this configuration:

     ```plaintext
     client
     dev tun
     proto udp
     remote YOUR_SERVER_IP 1194
     resolv-retry infinite
     nobind
     user nobody
     group nogroup
     persist-key
     persist-tun
     ca ca.crt
     cert client1.crt
     key client1.key
     tls-auth ta.key 1
     cipher AES-256-CBC
     auth SHA256
     verb 3
     ```

   - **Tip**: Replace `YOUR_SERVER_IP` with your server’s IP address or domain.

4. **Create a Script to Package the Client Configuration**:

   - Make the script executable, and run it:

     ```bash
     chmod 700 ~/client-configs/make_config.sh
     cd ~/client-configs
     ./make_config.sh client1
     ```

---

#### Step 8: Configure and Test the Client

1. **Transfer the `.ovpn` File** to the client device and install OpenVPN.
   
2. **Connect to the VPN** using the client file and verify your IP with `curl ifconfig.me`.

---

#### Step 9: Document Your Setup

Write down your configurations, IP addresses, and important details to keep a record of your setup.

---

**Conclusion**: You’ve now set up an OpenVPN server for secure remote access. This configuration ensures encrypted, private connections between clients and the network. Continue refining and testing your VPN as needed!

---

### Where to Find Assistance

For those new to setting up OpenVPN, the following resources are invaluable:

1. **Official OpenVPN Documentation**: Detailed guides and reference material for OpenVPN are available on the [OpenVPN website](https://openvpn.net/community-resources/reference-manual-for-openvpn/).
2. **Ubuntu Documentation**: Ubuntu's own [community documentation](https://help.ubuntu.com/community/OpenVPN) provides specific instructions for setting up OpenVPN on Ubuntu systems.
3. **Stack Overflow**: This site has a wealth of user-generated content on troubleshooting various OpenVPN issues. Visit [Stack Overflow](https://stackoverflow.com/questions/tagged/openvpn).
4. **OpenVPN Community Forums**: A place to discuss problems and solutions with other OpenVPN users at [OpenVPN Forums](https://forums.openvpn.net/).
5. **YouTube Tutorials**: There are many comprehensive tutorials available that can help you understand the setup process visually.

### Learning in Public Prompts

- "Navigating through OpenVPN setup on Ubuntu—just got my server up and running!"
- "Understanding certificate authority was tricky, but creating one was rewarding. Here’s what I learned..."
- "Configured my first VPN client today and successfully connected. Can't believe I secured my network traffic!"
- "Learning how to handle network routing with OpenVPN’s server configuration. Here are my notes on IP forwarding..."
- "Just streamlined secure communication between my devices with OpenVPN—exciting to see encryption in action!"

### Metrics to Track

1. **Technical Metrics**:
   - Number of devices successfully connected to the VPN.
   - Latency and speed tests before and after VPN activation.
   - Uptime and reliability of the VPN server.

2. **Learning-Focused Metrics**:
   - Time spent setting up and troubleshooting the VPN.
   - Number of configuration settings mastered.
   - Frequency of maintenance and updates to the VPN server.

3. **Monetary and Helpful Metrics**:
   - Costs associated with setting up and running the VPN server.
   - Number of individuals or groups assisted in setting up their VPN through shared knowledge.

### STAR Statement Examples for Resumes

- "Established a secure OpenVPN server on Ubuntu, enabling encrypted remote access for 10+ team members, enhancing data security and connectivity reliability by 40%."
- "Configured and managed VPN services using OpenVPN, reducing network vulnerabilities and securing user connections, resulting in a 50% decrease in unauthorized access attempts."
- "Streamlined network operations by implementing OpenVPN on Linux, achieving a 100% uptime and significantly improving remote workflow efficiency."
- "Led a project to migrate company data to a secure VPN, safeguarding sensitive information with AES-256 encryption, which prevented potential data breaches."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - OpenVPN
  - Easy-RSA
  - Linux/Ubuntu
  - Network routing and management tools

- **Skills**:
  - VPN Configuration and Management
  - Network Security
  - Encryption and Authentication Protocols
  - Linux System Administration
  - Troubleshooting and Technical Support