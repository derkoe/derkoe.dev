---
categories: ["WSL"]
tags: ["linux", "windows", "wsl"]
pubDate: "2020-05-25"
title: "Development Environment in WSL2"
summary: "This guide details setting up a WSL2 development environment with Ubuntu on Windows 10, including installation steps and addressing GUI app support challenges."
image: "./images/windows-linux.jpg"
author: Christian Köberl
---

This guide shows how to setup a full development environment including UI apps (X11) in WSL2 on Windows 10. WSL2 enables a "full" Linux development environment in Windows.

<!--more-->

## Why?

The first thing you might ask is: why? First, we have to run Windows on our machines - so the all-in Linux does not work. Second, Linux is a lot faster for building software than Windows - our biggest app compiles in 13 minutes under Windows and in just 2 minutes under WSL on my machine which is a massive improvement.

## Enable WSL2 and Install Ubuntu

For WSL2 to work you will need a Windows 10 build 19041 (aka 20H1) or higher (any edition will work, even Home). Then simply follow the [guide from Microsoft](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install "Windows Subsystem for Linux Installation Guide for Windows 10").

**TL;DR:**

1. Enable the features WSL and VM-Platform in Powershell as Admin:
   ```cmd
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
2. Restart Windows
3. Set WSL2 as default:
   ```cmd
   wsl --set-default-version 2
   ```
4. Go to the Microsoft Store and install "Ubuntu"
5. Launch Ubuntu from Start menu (this will ask you for a user account)

You can now re-launch a shell in your Ubuntu instance with "Ubuntu" from the Start menu or execute `wsl` from the command line. The WSL command line tool has many options which you can find with `wsl --help` or in the [Command Reference](https://docs.microsoft.com/en-us/windows/wsl/reference).

## Update and Install Software

Inside your Ubuntu Linux update all packages:

```bash
sudo apt update
sudo apt upgrade
```

Then install packages you need for your development - in my case it is Java 11, Maven, Node.js/NPM and git:

```bash
sudo apt install openjdk-11-jdk openjdk-11-source maven nodejs npm git
```

Do not install Docker CLI or Docker Compose because these are provided by Docker Desktop (see next section).

## Install Docker (optional)

Most developers need Docker for their local setup - the newest Docker Desktop version supports WSL2 out of the box (even on Windows Home).

## GUI Apps

Currently there is no support for GUI apps for WSL - Microsoft has [announced that they are working on GUI support using Wayland](https://devblogs.microsoft.com/commandline/the-windows-subsystem-for-linux-build-2020-summary/#wsl-gui) and that it should ship in 2020. So you have to use X11 forwarding or other tricks to enable this - I have tried all of them and there are some issues with any of the solutions:

1. X11 server on Windows ([VcXsrv](https://sourceforge.net/projects/vcxsrv/) or [X410](https://x410.dev/)) and setting the DISPLAY variable in Linux (`export DISPLAY=``ip route show | grep 'default via' | awk '{print $3}'``:0.0` in your `.bashrc`).
   - Works quite well - good performance, shortcuts work, even mouse back/forward buttons work as expected
   - The main problem is that when you go to standby or hibernate the [connection between Windows and WSL breaks](https://superuser.com/questions/1474559/wsl2-x11-programs-disappear) and all your apps stop. If you can live with that go with this solution!
2. Running [xrdp](http://xrdp.org/) on Linux and using Remote Desktop to connect
   - In this case you are running a full desktop - that means you have to install Xfce (Gnome does not seem to work).
   - With this solution the whole UI feels a bit laggy and slow - I tried to tune the xrdp params without success.
3. [Xpra](http://xpra.org/) - a virtual X11 server to connect via a client on Windows (or other platforms)
   - The solution works but there are many issues like crashes, window positions are completely wrong, extra mouse buttons do not work, etc.
4. [X2Go](https://wiki.x2go.org/) - also a virtual X11 server with an Windows client
   - This seems to be the most promising solution
   - As with plain X11: good performance, shortcuts work, even mouse back/forward buttons work as expected, plus the reconnect feature
   - The only drawback is the quirky Windows client (but I got used to it)

### X2Go

Here is the X2Go setup in more details (since it worked best for me).

#### Initial setup

1. Fix SSH host keys

   ```bash
   sudo apt-get remove --purge openssh-server
   sudo apt-get install openssh-server
   sudo service ssh --full-restart
   ```

2. Install X2Go on your Linux distribution

   ```bash
   apt install x2goserver
   ```

3. [Download](http://code.x2go.org/releases/X2GoClient_latest_mswin32-setup.exe) and install the client for Windows.

4. Configure the
   - Host: `localhost`
   - Login: `<your user>`
   - Session type: Published Applications

#### After each WSL/Windows restart

1. Launch ssh in Linux (if not started yet): `sudo service ssh start`
2. Launch "X2Go Client" on Windows ad connect to the server with user/password
3. Now you can launch X11 apps via the tray icon (see [X2Go Published Applications](https://wiki.x2go.org/doku.php/wiki:advanced:published-applications))

## Editors/IDEs

### Visual Studio Code

Simply install VSCode and then you can open it from the Linux shell with `code` or `code <path>` - most of the time it will be:

```bash
code .
```

### IntelliJ IDEA

On a normal Ubuntu you could install [IntelliJ IDEA via Snap](https://snapcraft.io/search?q=intellij) but Snap does not work on WSL2 (there is [a hacky workaround](https://discourse.ubuntu.com/t/using-snapd-in-wsl2/12113)).

So, the easiest way is to install it manually:

1. Get the latest tar.gz from [the downloads page](https://www.jetbrains.com/idea/download/index.html#section=linux)
2. Extract it an create a symlink (so you can easily switch versions):
   ```bash
   cd /opt
   sudo tar xzf /mnt/c/Users/$USER/Downloads/idea-{edition-version}.tar.gz
   sudo ln -s /opt/idea-{edition-version} /opt/idea
   ```
3. To easily launch the app via the X2Go context menu create an app desktop entry `/usr/share/applications/intellij-idea.desktop` with the following contents:
   ```ini
   [Desktop Entry]
   Name=Intellij IDEA
   Comment=JetBrains Intellij IDEA Java IDE
   Categories=Development
   Keywords=java;ide
   Exec=/opt/idea/bin/idea.sh
   Type=Application
   Icon=/opt/idea/bin/idea.png
   ```

## Open Issues

There are still many issues with WSL2 - the biggest problems are:

- Systemd is not running - the official issue is [Blockers for systemd?](https://github.com/microsoft/WSL/issues/994). Seems like Microsoft is working with the Systemd team on this problem. Anyway withoud Systemd you cannot run any services and things like Snap packages do not work. There are some workarounds like [genie](https://github.com/arkane-systems/genie) or [this instructions](https://forum.snapcraft.io/t/running-snaps-on-wsl2-insiders-only-for-now/13033).

- GUI apps are a pain (in the a..) - like alrady [mentioned above](#gui-apps).

- There are many troubles with VPN solutions: [CISCO AnyConnect](https://github.com/microsoft/WSL/issues/4277), [Checkpoint VPN](https://github.com/microsoft/WSL/issues/4246).

## Resources

- [Windows Subsystem for Linux (WSL): The Ultimate Guide](https://adamtheautomator.com/windows-subsystem-for-linux/ "Windows Subsystem for Linux (WSL): The Ultimate Guide")
- [Linux on Windows: WSL with Desktop Environment via RDP](https://dev.to/darksmile92/linux-on-windows-wsl-with-desktop-environment-via-rdp-522g)
- [HOWTO: Functional Ubuntu desktop on Windows 10/WSL](https://eising.wordpress.com/2018/11/05/howto-functional-ubuntu-desktop-on-windows-10-wsl/)
