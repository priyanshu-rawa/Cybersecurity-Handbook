up:: [[Generating a Wordlist & Cracking the Password]]
## Quick Guide for Hacking WPA/WPA2

### Phase 1: Setting Up the Environment
1. **Open Two Terminal Windows**
   - Open two separate terminal windows.
2. **Set Wireless Adapter to [[Change MAC from Managed to Monitor Mode|Monitor Mode]]**
   - Enable [[Change MAC from Managed to Monitor Mode|monitor mode]] on your wireless adapter.

### Phase 2: Scanning for Vulnerable Networks (without Wordlist)
3. **Find Devices with WPS Enabled**
   - Scan for devices with WPS enabled using `wash`.

### Phase 3: Preparing and Executing Attacks
4. **Prepare [[Fake Authentication Attack|Fake Authentication]] Attack**
   - Set up the [[Fake Authentication Attack|fake authentication]] attack in the first terminal window.
5. **Prepare and Execute Reaver Attack**
   - Set up the `reaver` command in the second terminal window.
   - Start the [[Fake Authentication Attack|fake authentication]] attack in the first terminal.
   - Execute the `reaver` attack in the second terminal.

### Phase 4: Capturing the Handshake
6. **Monitor the Network**
   - Use `airodump-ng` to scan for and focus on the target network.
7. **Wait for or Force a Client Reconnection**
   - Wait for a client to connect to capture the [[WPA handshake|handshake]] or use deauthentication to force reconnection.
8. **Verify [[WPA handshake|Handshake]] Capture**
   - Check for [[WPA handshake|handshake]] capture in `airodump-ng`.

### Phase 5: Generating Wordlists and Cracking the Password
9. **Generate a [[wordlists for password cracking|Wordlist]] Using [[Crunch]]**
   - Create a custom [[wordlists for password cracking|wordlist]] with desired parameters using `crunch`.
10. **Crack the Password Using Aircrack-ng**
   - Use `aircrack-ng` with your [[wordlists for password cracking|wordlist]] to crack the [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] password.

### Summary

These phases guide you through setting up your environment, scanning for vulnerable networks, preparing and executing attacks, [[capturing the handshake]], and finally generating [[wordlists for password cracking|wordlists]] and cracking the password. Ensure ethical and legal use of these tools.