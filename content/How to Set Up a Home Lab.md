### Guide: Installing VirtualBox and Setting Up Ubuntu

In this guide, you'll learn how to install VirtualBox on your computer, create a virtual machine (VM) for Ubuntu, and set it up. **VirtualBox** is a free tool that allows you to create virtual machines, which are like running a separate computer within your existing one. **Ubuntu** is a popular version of the Linux operating system that’s great for learning about Linux and cybersecurity.

### Prerequisites

- **Computer requirements**: Make sure you have enough storage (at least 20GB free), a reasonable amount of memory (4GB+), and an internet connection.
- **Operating system**: This guide works for both Windows and Mac, but the steps might look slightly different.

---

### Part 1: Installing VirtualBox

1. **Download VirtualBox**:
    
    - Go to the [VirtualBox website](https://www.virtualbox.org/).
    - Click **Downloads** on the homepage.
    - Select the version for your operating system (Windows, macOS, or Linux).
    - Download the file to your computer.
2. **Install VirtualBox**:
    
    - Open the downloaded file. This should launch the installation process.
    - Follow the instructions provided by the installation wizard:
        - **Windows**: Click **Next** through the steps, then **Install**. If prompted about network interfaces or firewall, click **Yes** to allow VirtualBox to make necessary changes.
        - **Mac**: Drag VirtualBox into your **Applications** folder, then open it from there.
    - **Complete Installation**: Once installed, click **Finish** to close the setup wizard.
    - **Open VirtualBox**: You should now see the VirtualBox window, which will serve as the “control panel” for your virtual machines.

---

### Part 2: Downloading the Ubuntu ISO File

The ISO file is like a digital version of an Ubuntu installation DVD.

1. **Go to the Ubuntu website**: Open your browser and go to [https://ubuntu.com/download/desktop](https://ubuntu.com/download/desktop).
2. **Select the Ubuntu version**: For beginners, the latest stable version is recommended. You’ll see it on the main download page.
	- If you have a Macbook with the silicon chip, use this link: https://cdimage.ubuntu.com/daily-live/current/
3. **Download the ISO file**: Click **Download**. The file is about 2GB, so it may take a few minutes.

---

### Part 3: Setting Up a New Virtual Machine in VirtualBox

Now, let’s use VirtualBox to create a virtual machine where we’ll install Ubuntu.

1. **Open VirtualBox**: If it’s not already open, find and open VirtualBox on your computer.
    
2. **Create a New Virtual Machine**:
    
    - Click **New** at the top of the VirtualBox window. This will open a setup window.
    - **Name and operating system**:
        - **Name**: Enter a name like “Ubuntu.”
        - **Machine Folder**: You can leave this as the default.
        - **Type**: Choose **Linux**.
        - **Version**: Select **Ubuntu (64-bit)**.
    - Click **Next**.
3. Unattended install:
   - Make sure to set a password here that you can remember 

4. **Allocate Memory (RAM)**:
    
    - VirtualBox will suggest a memory size based on your computer’s specs. For Ubuntu, a minimum of **2048 MB (2GB)** is recommended, but **4096 MB (4GB)** is even better if you have enough RAM.
    - Set the memory size and click **Next**.
5. **Create a Virtual Hard Disk**:
    
    - Select **Create a virtual hard disk now** and click **Create**.
    - Choose **VDI (VirtualBox Disk Image)** and click **Next**.
    - **Storage on physical hard disk**: Choose **Dynamically allocated**. This means the virtual disk will grow only as needed.
    - **Set Disk Size**: 20GB is enough for a basic Ubuntu install. Set this and click **Create**.
6. **Insert the Ubuntu ISO File**:
    
    - With the new virtual machine still selected, go to **Settings**.
    - Open the **Storage** tab.
    - Under **Controller: IDE**, click the **Empty** disk icon.
    - On the right side, click the disk icon next to **Optical Drive** and select **Choose a disk file**.
    - Locate and select the Ubuntu ISO file you downloaded, then click **OK**.

---

### Part 4: Starting the Virtual Machine and Installing Ubuntu

1. **Start the Virtual Machine**:
    
    - In VirtualBox, with the Ubuntu VM selected, click **Start**. The virtual machine will boot up using the ISO file you added earlier.
2. **Begin the Ubuntu Installation**:
    
    - When the Ubuntu installation screen appears, select **Install Ubuntu**.
3. **Select Keyboard Layout**:
    
    - Choose your keyboard layout and click **Continue**.
4. **Updates and Other Software**:
    
    - Choose **Normal installation** to install standard applications.
    - Under “Other options,” select **Download updates while installing Ubuntu**. You can skip “Install third-party software” for now.
    - Click **Continue**.
5. **Disk Setup**:
    
    - Choose **Erase disk and install Ubuntu**. This only affects the virtual hard disk (the 20GB you created earlier) and will not impact your main computer.
    - Click **Install Now** and **Continue** to confirm.
6. **Set Up Your Account**:
    
    - **Your Name**: Enter your name.
    - **Your computer’s name**: This can be anything; it’s just for identification.
    - **Pick a username and password** for your Ubuntu account. Write these down if you need to remember them.
    - Click **Continue**.
7. **Wait for Installation to Complete**:
    
    - The installation will take a few minutes. You may see some loading screens, and the VM may restart.
    - Once the installation is complete, you’ll see an option to **Restart Now**.
8. **Complete Setup**:
    
    - Click **Restart Now**, and when prompted, **remove the installation media** (you can simply press Enter).
    - Your virtual machine will restart, and you should now see the Ubuntu login screen.
    - Log in using the username and password you created.

---

### Troubleshooting Tips

- **Error on startup**: If the virtual machine fails to start, go back to **Settings > System** and try reducing the memory (RAM) or enabling **EFI** if your computer uses it.
- **AMD-V or Intel VT-x Errors**: If you see an error about AMD-V or Intel VT-x, you may need to enable virtualization in your BIOS (restart your computer and look for BIOS options on startup).
- **Slow performance**: If Ubuntu seems slow, go to **Settings > Display** and increase **Video Memory** to 128 MB.
- **Mouse and keyboard don’t work**: Try **Right Ctrl** (Windows) or **Command** (Mac) to switch in and out of the virtual machine.

### Next Steps

Congratulations! You now have Ubuntu installed on a virtual machine in VirtualBox. You can now explore Ubuntu and try different commands or tools within your virtual environment.