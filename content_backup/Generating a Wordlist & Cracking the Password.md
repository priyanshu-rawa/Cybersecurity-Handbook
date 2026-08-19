up:: [[WPA and WPA2 Cracking]]
# Generating a Wordlist & Cracking the Password

### Prerequisites
- Ensure you have the necessary tools installed: `crunch` and `aircrack-ng`.
- These instructions assume you are running a Linux distribution such as [[Kali Linux]].

## Step 1: Generate a Wordlist Using Crunch
[[Crunch]] is a tool that allows you to generate custom [[wordlists for password cracking|wordlists]] based on specified criteria.

1. Open your terminal.
2. Run the following command to generate a [[wordlists for password cracking|wordlist]] with combinations of the characters `a`, `b`, `c`, `1`, and `2`, with a minimum length of 6 characters and a maximum length of 8 characters:

   ```bash
   sudo crunch 6 8 abc12 -o test.txt
   ```

3. To verify the contents of the generated [[wordlists for password cracking|wordlist]], open the file:

   ```bash
   sudo cat test.txt
   ```

4. You should see all the generated password combinations. Press `Ctrl+C` to exit the view.

## Step 2: Capture the 4-Way Handshake
To crack [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] passwords, you need to capture the 4-way [[WPA handshake|handshake]]. Ensure you have already captured this [[WPA handshake|handshake]] using a tool like `airodump-ng`.

## Step 3: Crack the Password Using Aircrack-ng
[[Aircrack-ng]] is a tool that can be used to crack [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]] passwords by comparing a [[wordlists for password cracking|wordlist]] against the captured [[WPA handshake|handshake]].

1. Run the following command to start the cracking process:

   ```bash
   sudo aircrack-ng wpa_handshake-01.cap -w test.txt
   ```

   Replace `wpa_handshake-01.cap` with the actual filename of your captured handshake.

2. [[Aircrack-ng]] will run through the [[wordlists for password cracking|wordlist]] and attempt to match each entry with the MIC (Message Integrity Code) in the [[WPA handshake|handshake]]. The success of this process depends on the quality and comprehensiveness of your [[wordlists for password cracking|wordlist]].

3. If the password is in your [[wordlists for password cracking|wordlist]], [[Aircrack-ng]] will display it. Otherwise, it will indicate that the password was not found.

## Summary

- [[Quick Guide for Hacking WPA & WPA2]]