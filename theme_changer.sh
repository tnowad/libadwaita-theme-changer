#!/bin/bash

if [[ $1 == "--reset" ]]; then
    echo -e "\n***\nResetting theme to default!\n***\n"
    rm "$HOME/.config/gtk-4.0/gtk.css" 2>/dev/null
    rm "$HOME/.config/gtk-4.0/gtk-dark.css" 2>/dev/null
    rm -r "$HOME/.config/gtk-4.0/assets" 2>/dev/null
    rm -r "$HOME/.config/assets" 2>/dev/null
else
    all_themes=($(ls "$HOME/.themes"))
    echo "Select theme: "
    for ((i=0; i<${#all_themes[@]}; i++)); do
        echo "$(($i+1)). ${all_themes[$i]}"
    done
    echo "e. Exit"
    read -p "Your choice: " chk
    case $chk in
        "e")
            echo "Bye bye!"
            ;;
        *)
            chk_value=$(($chk-1))
            chk_theme=${all_themes[$chk_value]}
            echo -e "\n***\nChose $chk_theme\n***\n"
            echo "Removing previous theme..."
            rm "$HOME/.config/gtk-4.0/gtk.css" 2>/dev/null
            rm "$HOME/.config/gtk-4.0/gtk-dark.css" 2>/dev/null
            rm -r "$HOME/.config/gtk-4.0/assets" 2>/dev/null
            rm -r "$HOME/.config/assets" 2>/dev/null
            echo "Installing new theme..."
            ln -s "$HOME/.themes/$chk_theme/gtk-4.0/gtk.css" "$HOME/.config/gtk-4.0/gtk.css" 2>/dev/null
            ln -s "$HOME/.themes/$chk_theme/gtk-4.0/gtk-dark.css" "$HOME/.config/gtk-4.0/gtk-dark.css" 2>/dev/null
            ln -s "$HOME/.themes/$chk_theme/gtk-4.0/assets" "$HOME/.config/gtk-4.0/assets" 2>/dev/null
            ln -s "$HOME/.themes/$chk_theme/assets" "$HOME/.config/assets" 2>/dev/null
            echo "Done."
            ;;
    esac
fi
