up:: [[Wifite]]
# Cracking WPA/WPA2 Wi-Fi with Wifite

**Prerequisites:**
- Ensure you have Kali Linux installed.
- You need a wireless adapter capable of monitor mode.

**Steps to Use Wifite:**

1. **Open your terminal.**
   Start by opening a terminal window in Kali Linux.

2. **Enable Monitor Mode:**
   Enter the following command to start Wifite and automatically enable monitor mode on your wireless adapter:
   ```bash
   sudo wifite
   ```

3. **Scan for Targets:**
   - Wifite will begin scanning for available networks.
   - To stop scanning and proceed to the next step, press `Ctrl + C`.

4. **Select Network to Attack:**
   - Wifite will display a list of detected networks with associated numbers.
   - If you want to attack multiple networks, specify their numbers separated by commas.
   - Example: If you want to attack the networks listed as 1, 5, and 7, you would enter: `1,5,7`

5. **Troubleshooting:**
   - If you encounter issues during the attack, you can restart Wifite with the kill option to stop conflicting processes:
     ```bash
     sudo wifite --kill
     ```

6. **Using a Wordlist:**
   - Navigate to the wordlist directory in Kali Linux:
     ```bash
     cd /usr/share/wordlists/
     ```
   - Locate the `rockyou.txt.gz` file, which contains millions of potential passwords.

7. **Decompress the Wordlist:**
   - Use the following command to unzip the `rockyou.txt.gz` file:
     ```bash
     sudo gzip -d rockyou.txt.gz
     ```
   - Note: This might take some time due to the size of the file.

8. **Run Wifite with Custom Wordlist:**
   - To use the decompressed wordlist for a WPA attack, enter:
     ```bash
     sudo wifite --wpa --dict /usr/share/wordlists/rockyou.txt --kill
     ```
   - Press `Ctrl + C` to continue through the attacks as Wifite captures handshakes and attempts to crack them.

9. **View Cracked Passwords:**
   - After the attacks are completed, you can check if any passwords were cracked by looking in the output files:
     ```bash
     ls
     cat cracked.txt
     ```

**Conclusion:**
Using Wifite is more straightforward and automated compared to other suites like Aircrack-ng. It provides a user-friendly way to perform network attacks with minimal manual intervention. Remember, using Wifite for unauthorized network attacks is illegal and unethical. Always have permission before testing networks with Wifite or any other penetration testing tools.
