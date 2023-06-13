# Libadwaita Theme Changer
The libadwaita Theme Changer is a Bash script that allows you to change the GTK theme in GNOME applications that use the libadwaita library. It provides a convenient command-line interface to switch between different themes supported by libadwaita.

## Prerequisites
To use the libadwaita Theme Changer script, ensure that you have the following:

Bash: The script is designed to be run in a Bash shell. Make sure you have Bash installed on your system.

libadwaita: The script relies on the libadwaita library to change the theme of GNOME applications. Ensure that you have the necessary dependencies and development packages installed to use libadwaita.

## Usage
1. Download the theme_changer.sh script file to your system.

```bash
curl https://raw.githubusercontent.com/tnowad/libadwaita-theme-changer/master/theme_changer.sh > theme_changer.sh
```

2. Open a terminal and navigate to the directory where the theme_changer.sh file is located.

3. Make the script executable by running the following command:

```bash
chmod +x theme_changer.sh
```

Run the script by executing the following command:


```bash
./theme_changer.sh
```

The script will display a menu of available themes supported by libadwaita. It will list both the light and dark variants of each theme, if available.

Enter the number corresponding to the theme you want to apply and press Enter.

The script will change the GTK theme for libadwaita-based applications. You should see the new theme applied immediately in any running or newly launched GNOME applications that use libadwaita.

To exit the script, select the "Exit" option from the menu.

## Notes
The libadwaita Theme Changer script relies on the gsettings command-line tool to change the GTK theme. Make sure gsettings is available on your system.

The script fetches the available themes from the Adwaita directory, which is the default theme directory for libadwaita. If your themes are located in a different directory, you can modify the script to point to the correct location.

The script assumes that you have the necessary permissions to modify system settings. If you encounter any issues or errors during the theme change process, ensure that you have the required permissions.