up:: [[Network & Systems Security Labs]]
### Project: Configuring WPA3 Security for Your Wi-Fi Network

**WPA3** (Wi-Fi Protected Access 3) is the latest Wi-Fi security standard that helps protect your wireless network from unauthorized access. By enabling WPA3, you ensure a higher level of security than older standards, like WPA2. This guide will take you through each step, along with some extra security measures to protect your network even further.

---

### Step-by-Step Guide to Configuring WPA3 Security

---

#### Step 1: Navigate to Wireless Settings

To get started, access the settings for your Wi-Fi network.

1. **Open your router’s settings page**:
   - Open a web browser and enter your router’s IP address (commonly something like `192.168.1.1` or `192.168.0.1`). You can find this in the router’s manual or on a sticker on the device itself.
   
   - **Tip**: If unsure of the IP address, open a terminal or command prompt and type:
     - **Windows**: `ipconfig` – look for the “Default Gateway” IP.
     - **Mac/Linux**: `route -n` or `ip route | grep default` – find the IP under “Gateway” or “Router.”

2. **Log in with your router’s username and password**.
   - This information is often on a sticker on the router. If you haven’t changed it from the default, check your router’s manual or the manufacturer's website.

3. **Find the Wireless Settings section**:
   - Look for sections labeled **Wireless**, **Wi-Fi**, or **Network**. This is where you’ll adjust your security settings.

---

#### Step 2: Select WPA3 Security Mode

1. **Set your security mode to WPA3**:
   - Go to the **Security** settings within the Wireless menu.
   - Select **WPA3-Personal** as the security mode. This is the most secure option for personal and home networks.

   - **Tip**: Some routers may offer a **WPA2/WPA3 Mixed Mode**. This allows devices that don’t support WPA3 to still connect using WPA2 security. Use this mode if you have older devices that can’t use WPA3.

---

#### Step 3: Set a Strong Password

Your password, also known as a **Wi-Fi passphrase**, is essential for securing your network.

1. **Create a strong, unique password**:
   - Use at least 12-16 characters, combining **uppercase letters, lowercase letters, numbers, and special characters** (like `@`, `#`, or `!`).
   - Avoid using easily guessable information, like names, addresses, or birthdays.

   - **Tip**: Password managers can generate and store complex passwords, making it easier to create a highly secure passphrase.

---

#### Step 4: Save Settings

1. **Apply and save** your changes.
   - After selecting WPA3 and setting your password, look for a **Save** or **Apply** button. Your router may briefly restart to apply these settings.

   **Important**: Your Wi-Fi network will now be using WPA3 encryption. You’ll need to reconnect your devices to the network using the new password if you changed it.

---

### Additional Security Measures (Optional but Recommended)

---

#### Step 5: Enhance Your Wi-Fi Security

In addition to WPA3, consider the following extra measures for better security:

1. **Change the Default SSID (Network Name)**:
   - Find the **SSID** setting in your router’s Wireless settings.
   - Use a unique name that doesn’t reveal any personal information or your router brand (e.g., avoid names like “SmithFamilyWiFi” or “Netgear123”).

   - **Tip**: A unique SSID makes it harder for hackers to identify or target your network based on the router model.

2. **Disable WPS (Wi-Fi Protected Setup)**:
   - **WPS** is a feature that allows quick Wi-Fi setup, but it can be exploited to gain access to your network.
   - Disable it in your router’s settings, typically found in the **Advanced** or **Wireless** section.

3. **Enable MAC Address Filtering**:
   - **MAC Filtering** restricts network access to specified devices by their unique MAC addresses.
   - In the **Access Control** or **MAC Filtering** section, add the MAC addresses of devices you want to allow.
   
   - **Tip**: This adds an extra layer of security, though it’s not foolproof, as advanced users can spoof MAC addresses.

4. **Reduce SSID Broadcast Range (Optional)**:
   - Some routers allow you to adjust the **transmit power**. Lowering this can reduce the Wi-Fi signal range, keeping it contained within your home.
   - This setting is typically found in the **Advanced Wireless** or **Transmit Power** options.

5. **Enable a Guest Network**:
   - Set up a **guest network** for visitors so they won’t have access to your main network’s devices and files.
   - Use a different password for the guest network and enable **Network Isolation** if your router supports it.

6. **Consider Using a VPN for Added Security**:
   - A **VPN** (Virtual Private Network) on your devices adds a layer of encryption for internet traffic, keeping it private from external networks.

---

### Step 6: Connect Devices to the WPA3 Network

---

1. **Update Device Firmware**:
   - Some devices need recent firmware to support WPA3. Check for updates on each device.
   - For most devices, go to **Settings > System > Update** or similar to look for firmware updates.

2. **Connect to the Network**:
   - On each device, go to Wi-Fi settings, find your WPA3-enabled network, and connect using the new passphrase.

3. **Verify the WPA3 Connection**:
   - After connecting, check your device’s network details to confirm it’s using WPA3.
   - On most devices, go to **Network Details** or **Security** settings under Wi-Fi for this information.

---

### Step 7: Regular Maintenance and Monitoring

---

To keep your Wi-Fi network secure, make these checks part of your routine:

1. **Monitor Connected Devices**:
   - Periodically check the list of connected devices in your router’s settings. This helps ensure no unauthorized devices are using your network.

2. **Change Passwords Periodically**:
   - Consider updating your Wi-Fi password every few months for added security.

3. **Review Security Settings Regularly**:
   - As new threats emerge, review and update your router’s security settings to stay protected.

---

### Step 8: Document Your Setup

1. **Network Configuration**:
   - Record your network configuration, including the SSID, password, and any specific settings like MAC filtering.

2. **Security Measures**:
   - Document additional security measures, such as guest networks, VPN usage, and any MAC address restrictions.

3. **Firmware and Software Versions**:
   - Keep a record of the firmware and software versions for your router and devices. This helps if you need to troubleshoot issues after updates.

---

### Conclusion

You have successfully enabled WPA3 and implemented additional security measures for your Wi-Fi network. This setup helps protect your network from unauthorized access and ensures your data stays secure. Regularly monitoring and updating your network settings will help you maintain a secure environment over time.

---

### Where to Find Assistance

For beginners setting up WPA3 on their Wi-Fi networks, several resources can be useful:

1. **Router Manufacturer’s Support**: Check the website of your router's manufacturer for specific guides on accessing settings and enabling WPA3.
2. **Official Wi-Fi Alliance Website**: Provides details on WPA3 standards and setup [Wi-Fi Alliance](https://www.wi-fi.org/).
3. **Online Forums**: Websites like [Tom’s Hardware](https://forums.tomshardware.com/) and [Reddit](https://www.reddit.com/r/HomeNetworking/) have communities that can offer advice and troubleshooting tips.

### Learning in Public Prompts

- "Just upgraded my home Wi-Fi to WPA3—feeling much more secure!"
- "Configuring WPA3 wasn’t as straightforward as I thought. Here’s what I learned about accessing router settings."
- "Exploring advanced Wi-Fi settings. Today, I set up a guest network with WPA3 to keep my main network secure."
- "Found out how reducing SSID broadcast range helps secure my Wi-Fi. Trying it out made a big difference in my network’s footprint!"
- "Set up MAC address filtering today. It adds another layer of security by ensuring only my devices can connect to the network."

### Metrics to Track

1. **Technical Metrics**:
   - Number of devices successfully connected using WPA3.
   - Signal strength and range with new settings.
   - Incidents of unauthorized access attempts before and after WPA3 implementation.

2. **Learning-Focused Metrics**:
   - Time taken to access router settings and enable WPA3.
   - Number of additional security features configured (e.g., MAC filtering, guest network).

3. **Monetary and Helpful Metrics**:
   - Costs involved in upgrading hardware to support WPA3.
   - Number of family members or friends helped to upgrade their network security.

### STAR Statement Examples for Resumes

- "Enhanced home network security by configuring WPA3 encryption, reducing susceptibility to cyber-attacks by over 70%."
- "Implemented advanced network settings, including guest networks and MAC address filtering, which increased system integrity and reduced unauthorized access risks."
- "Upgraded network encryption from WPA2 to WPA3 across multiple devices, improving network security compliance and connectivity stability."
- "Conducted a comprehensive update of home network security settings, leading to a 50% decrease in detectable vulnerabilities as assessed by network scans."

### Tools & Skills to Add to Tools & Technologies Sheet

- **Tools**:
  - Network security software (WPA3-compatible router firmware)
  - Network monitoring tools
  - Wi-Fi signal testing software

- **Skills**:
  - WPA3 Configuration
  - Network Security Enhancements
  - Wi-Fi Network Troubleshooting
  - Secure Password Management
  - Router Configuration and Management