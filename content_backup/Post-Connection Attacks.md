up:: [[Network Hacking]]

these work against WiFi & Ethernet
Gather more info
Intercept data (usernames, passwords, etc.)
Modify data on the fly

Needs VM to run against this


So this week I will show installing a windows VM
Done! 
Install VMware tools 
Go to settings, click reinstall VMware tools 
Run the setup installer once you reinstall the virtual DVD 

Information Gathering
netdiscover 
nmap to gather detailed information about all the lcients connected to the 

Step 1: Discovering Devices connected to the same network
ifconfig
get ip address at inet 
ifconfig again 
connect adaptor to wifi network
ifconfig
give instructions for how to choose the range for your ipaddresses 
netdiscover -r ifconfig 192.168.100.1/24
Realize that this tool does not show you very much


Step 2: Gathering Sensitive Info about Connected Devices
Zenmap 
put in a range to discover all the connected clients 
Then select which profile you want to use
Run ping scan quickly 
Gives you much more information than using quickscan
Now run a quick scan

Gathering more sensitive information and hacking an iphone on that network
Now run quick scan plus (it takes the scan one step further)
Start scrolling through the information
If you see an iphone that has port 22 ssh open, you know that the phone is jailbroken and the password is Alpine unless the user changed it. Most users dont know about this and the ones who do are too lazy to change it. 
So try to break into it
ssh root @192.168.100.14 (IP of the phone)
y
when the phone is jailbroken, the password is alpine, so you can type that in now.














