---
aliases:
  - Monitor Mode
  - monitor mode
---
up:: [[Network Hacking]]

# Change MAC from Managed to Monitor Mode (iwconfig)

Here’s a detailed step-by-step guide on how to change your wireless network interface from Managed to Monitor mode using the commands you've provided. This process will be useful for network diagnostics and security testing. Make sure you have the necessary permissions and that your wireless card supports Monitor mode.

### Instructions for Switching to Monitor Mode

1. **Check Current Network Interface Settings:**
   First, verify the current settings of your wireless interface. Open a terminal and enter:
   ```bash
   iwconfig
   ```
   This command displays the current wireless network interfaces and their configuration. Identify your wireless interface (commonly `wlan0`).

2. **Bring Down the Wireless Interface:**
   To modify the interface settings, you need to bring it down first. Execute:
   ```bash
   sudo ifconfig wlan0 down
   ```
   This command disables the `wlan0` interface, making it ready for configuration changes.

3. **Kill Conflicting Processes:**
   Before changing the mode, ensure that no processes are using the wireless card, which could interfere with the changes:
   ```bash
   sudo airmon-ng check kill
   ```
   This will stop any processes that could potentially disrupt the network configuration.

4. **Switch to Monitor Mode:**
   Now, set the wireless interface to monitor mode:
   ```bash
   sudo iwconfig wlan0 mode monitor
   ```
   This changes the mode of `wlan0` to Monitor, allowing it to monitor all traffic in the air.

5. **Reactivate the Wireless Interface:**
   After setting the mode, bring the interface back up:
   ```bash
   sudo ifconfig wlan0 up
   ```
   This command re-enables the `wlan0` interface with the new Monitor mode setting.

6. **Verify the Changes:**
   To ensure the changes were successfully applied, check the interface settings again:
   ```bash
   iwconfig
   ```
   Look for `wlan0` and confirm that its mode is now listed as "Monitor".

### Additional Notes:

- **Monitor Mode:** This mode allows the wireless interface to capture all wireless traffic it can detect, which is useful for tasks like packet sniffing or network traffic analysis.
- **Legal Considerations:** Be aware that using Monitor mode and packet sniffing might be regulated under local laws related to privacy and surveillance. Always ensure that you're authorized to perform these actions in your environment.
- **Driver Support:** Not all wireless adapters support Monitor mode. If the command fails, it may be due to hardware limitations.

## Revision History

- **06-05-2024**: Entry Added 