up:: [[WPA and WPA2 Cracking]]
## Capturing the Handshake

Capturing the [[WPA handshake|handshake]] is crucial for cracking [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]]-PSK networks, as it provides data that can be used to validate the key. Here's an improved guide for capturing the [[WPA handshake|handshake]] packets:

### Overview
- The [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] [[WPA handshake|handshake]] consists of 4 packets exchanged when a client connects to the network.
- These packets do not contain the key but include data that helps verify if a key is correct.
- Unlike [[Wired Equivalent Privacy (WEP)|WEP]], [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] is secure against several weaknesses, making the [[WPA handshake|handshake]] essential for further analysis.

### Steps to Capture the Handshake

#### Preparation
1. **Open Two Terminal Windows:**
   - You will need to run different commands simultaneously.

#### Step 1: Monitor the Network
2. **Start [[Airodump-ng]]:**
   - In the first terminal window, initiate `airodump-ng` to scan for networks.
   - Command:
     ```bash
     sudo airodump-ng wlan0
     ```
   - Identify and copy the [[MAC address (BSSID)]] of your target network.

3. **Focus on the Target Network:**
   - Use `airodump-ng` to monitor the specific network by specifying its BSSID and channel.
   - Command:
     ```bash
     sudo airodump-ng --bssid <BSSID> --channel <Channel> --write wpa_handshake mon0
     ```
   - Replace `<BSSID>` with the target network's MAC address and `<Channel>` with its channel number.
   - Example:
     ```bash
     sudo airodump-ng --bssid 00:10:18:90:2D:EE --channel 1 --write wpa_handshake mon0
     ```

4. **Wait for a Client to Connect:**
   - Sit and wait for a new client to connect to the network. This connection will generate the [[WPA handshake|handshake]] packets.
   - If there are no new connections, proceed to launch a [[deauthentication attack]] to force a client to reconnect.

#### Step 2: Deauthentication Attack
1. **Deauthenticate a Client:**
   - In the second terminal window, initiate a [[deauthentication attack]] using `aireplay-ng`.
   - This will disconnect a client, prompting it to reconnect and generate the [[WPA handshake|handshake]] packets.
   - Command:
     ```bash
     sudo aireplay-ng --deauth 4 -a <BSSID> -c <Client MAC> mon0
     ```
   - Replace `<BSSID>` with the target network's MAC address and `<Client MAC>` with the MAC address of the client.
   - If you don't have a specific client's MAC address, you can omit the `-c <Client MAC>` part to deauthenticate all clients.
   - 4 Represents the number of packets you will send 
   - Example:
     ```bash
     sudo aireplay-ng --deauth 4 -a 00:10:18:90:2D:EE -c 80:E6:50:22:A2:E8 mon0
     ```

6. **Verify Handshake Capture:**
   - Return to the first terminal window to check if the handshake has been captured.
   - Look for "[[WPA handshake]]" messages in the `airodump-ng` output.

By following these steps, you can effectively capture the handshake packets necessary for cracking [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]]-PSK networks.