#! /bin/bash

# Check if the script is being run as root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi


apt install -y git snap snapd libusb-1.0-0-dev fuse squashfuse


git clone https://github.com/mvp/uhubctl
cd uhubctl
make


USERNAME="homeassistant"


# Create user with home folder
useradd -m $USERNAME

# Create .ssh directory and authorized_keys file
mkdir -p /home/$USERNAME/.ssh/
touch /home/$USERNAME/.ssh/authorized_keys

# Append ssh public key to authorized_keys file
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDH9jZE7SKDYaPt5aDObapotfh/K6+hKv8/mmE7r74fuCcAFP9g8g/slD2uuQVkAoBqyYsCJihu28ArgBChGhPV+V7I9i55WK3IkOwvNJpybltMt1TT/N1WOdxPT5aNw7YvVeb7QVNiFssoE+SPFFNU1wI2Ntp7Ah4+IpEvhaEIgQ04NBGwvxA05ccP++HD7U4ZD9UGe3VybpunBBGmllQs8UWtZ+wn92OhDCSME3jwK3EfHr/cf2FO/FiTXAQuXRiXC3VkmG3gRFseYUnZRaZHkMqyjA+Lad+Sz+4ItzW7puGEDG7kA2e9jQazgU3j9HSp29pfXsl/XD5GVxhzvIvRc8mG0y4FbLUphlQVz4aD5aMhEHP6a9YEtbpH5HCxpt+1lOrqWf0H5JA2PStingNwFKCLQdLSXn6b4jMa0OFV7xiPcx0MxyjxVe8kGkwSIkOBNea4a02stfdWtqKDW7czc7kIHY2u0jv6p0zVb+zBmYtf93xZL/zE/OxM7bfK3/c= root@core-ssh" >> /home/$USERNAME/.ssh/authorized_keys

# Allow user to perform elevated commands on uhubctl only
echo "$USERNAME ALL=(root) NOPASSWD: /usr/bin/uhubctl" > /etc/sudoers.d/$USERNAME

# Set appropriate file permissions for SSH keys
chmod 700 /home/$USERNAME/.ssh
chmod 600 /home/$USERNAME/.ssh/authorized_keys

echo "User $USERNAME created successfully with SSH key and sudo access to uhubctl."



mkdir -p /usr/local/bin/



cat << EOF > /etc/systemd/system/kiosk.service
[Unit]
Description=Kiosk Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/bash /usr/local/bin/kiosk.sh
RemainAfterExit=yes
ExecStop=/usr/bin/bash /usr/local/bin/kiosk-cleanup.sh

[Install]
WantedBy=multi-user.target
EOF

mkdir -p /tmp/flag/
chmod -R 0777 /tmp/flag/
cat << EOF > /usr/local/bin/kiosk.sh
#!/bin/bash

flagfile=/tmp/flag/kiosk-installed

if [ ! -f "$flagfile" ]; then
  # Install kiosk
  snap install ubuntu-frame
  snap set ubuntu-frame daemon=true
  snap set ubuntu-frame config="wallpaper-top=0x92006a wallpaper-bottom=0xdd4814"
  snap install wpe-webkit-mir-kiosk
  snap connect wpe-webkit-mir-kiosk:wayland
  snap set wpe-webkit-mir-kiosk daemon=true
  snap set wpe-webkit-mir-kiosk url=https://iktdev.no
  snap start wpe-webkit-mir-kiosk

  # Create flag file
  touch "$flagfile"
else
  echo "Kiosk already installed"
fi

EOF

cat << EOF > /usr/local/bin/kiosk-cleanup.sh
#!/bin/bash

flagfile=/tmp/flag/kiosk-installed

if [ ! -f "$flagfile" ]; then
  echo "Kiosk not installed. Exiting..."
  exit 1
fi

# Stop the service
systemctl stop kiosk.service

# Disable the service from starting on boot
systemctl disable kiosk.service

# Remove the service file
rm /etc/systemd/system/kiosk.service

# Remove the flag file
rm /tmp/flag/kiosk-installed

# Remove the kiosk script
rm /usr/local/bin/kiosk.sh

# Remove the cleanup script
rm /usr/local/bin/kiosk-cleanup.sh

EOF

chmod +x /usr/local/bin/kiosk-cleanup.sh




chmod +x /usr/local/bin/kiosk.sh
sudo systemctl daemon-reload
sudo systemctl enable kiosk.service



reboot now