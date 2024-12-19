---
title: Mastering Offensive Security, Building Our Own Modular Malware
authors: [Samyukhtha Rajkumar Sridevi]
category: Projects
tags: [fall-2024, engr1a-cyber-lab]
description: Building our own modular malware
---

# Mastering Offensive Security: Building Our Own Modular Malware
## Introduction
For our final project in the ENGR 1A Cyber Lab, my group and I designed and implemented a complete offensive security framework. Combining key concepts from the course (such as enumeration, exploitation, privilege escalation, persistence, and command-and-control (C&C)) we built our own modular malware. We used an attack virtual machine to attack and exploit a target virtual machine. Each stage taught us something new about offensive strategies, system vulnerabilities, and practical cybersecurity applications.

This post provides a detailed overview of our project and reflects on what I learned.

## Enumeration
We began with enumeration, the process of identifying additional potential vulnerabilities, open services, versions, etc. Our code conducted a ping sweep across a specified IP address range, detecting whether each host was active or inactive by interpreting ICMP responses. This technique allowed us to map out the network and store active IP addresses for subsequent exploitation.

**Key Features:** 
- Ping sweep command: Identified active hosts through ICMP responses.
- Automation: Looped through IP addresses to test connectivity.
- Results: Marked hosts as "up" or "down" for further analysis.

## Exploitation
Next, we focused on exploitation to gain remote code execution (RCE) on remote from our attack virtual machine onto our target virtual machine, targeting vulnerabilities in services and configurations. My group and I implemented two key exploits:

1. **Shellshock (CVE-2014-6271)**: We exploited a vulnerable bash environment by injecting a malicious payload into the ```User_Agent``` HTTP header. This payload downloaded a script (```server.py```) to the target system, enabling us to execute arbitrary commands.
2. **FTP Server Backdoor (CVE-2015-3306)**: This exploit allowed us to read and write arbitrary files on the target machine using FTP commands like SITE CPFR and SITE CPTO.

Seeing these exploits in action gave us a deeper understanding of how attackers leverage common vulnerabilities.

![Screenshot 2024-12-15 at 11.57.25 PM](https://hackmd.io/_uploads/Bk42CI6VJe.png)
![Screenshot 2024-12-15 at 11.57.50 PM](https://hackmd.io/_uploads/SJ4k1P6Nye.png)

## Privilege Escalation
After gaining access, the next step was to escalate privileges from a standard user to a root user and gain administrator priviliges. We used two different techniques:

1. **Writable ```/etc/passwd```**: We modified the ```/etc/passwd``` file to add a new user with UID 0 (root). This gave the new user administrative privileges. To test, we switched to the new account and confirmed we had root access.
![Screenshot 2024-12-16 at 12.06.47 AM](https://hackmd.io/_uploads/rklIlP6V1l.png)
![Screenshot 2024-12-16 at 12.07.22 AM](https://hackmd.io/_uploads/rJPOxv6NJg.png)

2. **SUID Exploit on pexec**: We identified a binary (```pexec```) with the SUID bit set. By executing commands through ```pexec```, we started a new shell with root privileges.
![Screenshot 2024-12-16 at 12.13.07 AM](https://hackmd.io/_uploads/HJw2Zw6E1l.png)
![Screenshot 2024-12-16 at 12.13.54 AM](https://hackmd.io/_uploads/H1RyfD6Vkg.png)
![Screenshot 2024-12-16 at 12.14.34 AM](https://hackmd.io/_uploads/rkNzzv64ye.png)
We can see that we are now the root user.

These techniques allowed us to bypass user restrictions and gain full control over the system, showcasing how misconfigurations and weak permissions can be exploited.

## Persistence
To ensure we could maintain access to the compromised system, my group and I implemented persistence techniques that allowed us to regain control even after a reboot or malware removal attempt.

1. **Shell Startup Commands**: We modified bash initialization files, such as ```.bashrc```, to execute our payload whenever the system rebooted.
2. **Hidden Root Account**: In the privilege escalation step, we created a hidden user account with root access. The account credentials were encrypted for additional stealth.

These measures ensured our control over the target system even after reboots.

## Command and Control (C&C)
The command-and-control (C&C) phase enabled us to manage and interact with the compromised system remotely.

**Key Features:**
1. **Screenshot Capture**: We programmed the payload to take screenshots of the target system’s screen. These were saved as image files for later review and analysis.
2. **File Exfiltration**: The payload searched for sensitive files on the target system. These files were securely transferred to our attacker machine for further use.

These features provided insights into the target’s activities and access to valuable information.

## Kill Switch
To maintain operational security, we added a "kill switch" feature. This functionality allowed the attacker to remotely terminate the malware by sending a designated command. The script (```server.py```) then self-deleted, leaving no trace of its existence.
![Screenshot 2024-12-16 at 12.24.25 AM](https://hackmd.io/_uploads/BydwVwTVkg.png)
![Screenshot 2024-12-16 at 12.26.44 AM](https://hackmd.io/_uploads/rJi2EDa4kx.png)

## Lessons Learned
This project was a deep dive into offensive security, and the following are some valuable insights gained along the way:

- **Network Security**: Misconfigurations and weak permissions create opportunities for exploitation.
- **Privilege Escalation**: Simple mistakes, like writable critical files, can lead to catastrophic consequences.
- **Persistence and Detection**: Attackers use stealthy techniques to remain undetected, emphasizing the need for robust monitoring.
- **The Importance of Patching**: Many exploits rely on unpatched vulnerabilities. Regular updates are crucial.