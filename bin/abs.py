#!/usr/bin/env python3

import json
import os
import requests
import sys

################################################################################
#
# WELCOME --- BEUNVNUE --- ???
#
# TELR.IO SETUP FOR GENERAL BYTES (GB) CRYPTO APPLICATION SERVER (CAS)
#
# For more information, please visit:
# https://docs.modenero.com/downloads
#
# Copyright (c) 2020 Modenero Corp. All rights reserved.
#
# Ascii artwork was provided by: http://www.patorjk.com
#
################################################################################

# Set version.
VERSION = '21.9.1'

# Set base URL for API server.
api_url_base = 'https://api.telr.io/v1'

# FIXME This should be requested from user, at the command prompt.
api_token = '39TNrpEKRBQF3A3MS1tPKZjuswSM7yoLYb'

##
# Get Remote Authorization Words from Wordlist
#
def getRemoteAuthWords():
    headers = {
        'Content-Type': 'application/json',
        'X-Telr-Address': '{}'.format(api_token)
    }

    # Set API URL. */
    api_url = '{}/concierge'.format(api_url_base)

    # Build request body.
    json_body = {
        'action': 'getRemoteAuthWords'
    }

    # Request data from API.
    response = requests.post(api_url, headers=headers, json=json_body)

    # Validate HTTP response.
    if response.status_code == 200:
        # print(response.content.decode('utf-8'))

        # Decode JSON response.
        decoded_json = json.loads(response.content.decode('utf-8'))

        # print(decoded_json)

        # Return (decoded) JSON.
        return decoded_json
    else:
        print('Oops! Something went wrong.')

        # Return empty array.
        return []

##
# Display Welcome
#
def display_welcome():
    os.system('clear')

    print("")
    print("................................................................................")
    print("")
    print("")
    print("        █████╗     ██████╗ ██╗████████╗")
    print("       ██╔══██╗    ██╔══██╗██║╚══██╔══╝")
    print("       ███████║    ██████╔╝██║   ██║   ")
    print("       ██╔══██║    ██╔══██╗██║   ██║   ")
    print("       ██║  ██║    ██████╔╝██║   ██║   ")
    print("       ╚═╝  ╚═╝    ╚═════╝ ╚═╝   ╚═╝   ")
    print("                              v{}".format(VERSION))
    print("")
    print("  ███████╗██╗   ██╗██╗████████╗███████╗")
    print("  ██╔════╝██║   ██║██║╚══██╔══╝██╔════╝")
    print("  ███████╗██║   ██║██║   ██║   █████╗  ")
    print("  ╚════██║██║   ██║██║   ██║   ██╔══╝  ")
    print("  ███████║╚██████╔╝██║   ██║   ███████╗")
    print("  ╚══════╝ ╚═════╝ ╚═╝   ╚═╝   ╚══════╝")
    print("                  Making IT Simple!")
    print("            brought to you by Modenero")
    print("")
    print("................................................................................")
    print("")
    print("Please press <enter> to continue...")

    waiting = input()

    os.system('clear')

    print("")
    print("    Copyright (c) 2021. Modenero Corp. All rights reserved.")
    print("")
    print("    MODENERO CORP")
    print("    Decentralized Finance (DeFi) Solutions Provider")
    print("")
    print("    Since 2015, Modenero has provided the digital currency community ")
    print("    with bespoke, enterprise solutions; supported by a team ")
    print("    meticulously crafted for delivering the most fantastic dreams ")
    print("    imagined by the industry's most cutting-edge visionaries.")
    print("")
    print("    Please visit us at https://modenero.com")
    print("")
    print("Please press <enter> to continue...")

    waiting = input()

##
# Remote Services Manager
#
def remote_services_manager():
    os.system('clear')

    # Request (remote authorization) words from list
    auth_words = getRemoteAuthWords()

    print("")
    print(" ABS v{}".format(VERSION))
    print("  ____                      _       ")
    print(" |  _ \\ ___ _ __ ___   ___ | |_ ___ ")
    print(" | |_) / _ \\ '_ ` _ \\ / _ \\| __/ _ \\")
    print(" |  _ <  __/ | | | | | (_) | ||  __/")
    print(" |_| \\_\\___|_| |_| |_|\\___/ \\__\\___|")
    print(" ___________________________________")
    print("")
    print("    Remote services make Telr setups super easy!")
    print("")
    print("    To connect, simply type [ /telr abs ] from any Slack channel.")
    print("    After the window opens, enter the words shown below:")
    print("")
    print("        ➤  Word #1 is [ {} ]".format(auth_words[0].upper()))
    print("")
    print("        ➤  Word #2 is [ {} ]".format(auth_words[1].upper()))
    print("")
    print("        ➤  Word #3 is [ {} ]".format(auth_words[2].upper()))
    print("")
    print("Now waiting for remote connection...")
    print("You may press <enter> to CANCEL at anytime.")

    waiting = input()

##
# Display System Overview
#
def display_system_overview():
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("  ____            _                 ")
    print(" / ___| _   _ ___| |_ ___ _ __ ___  ")
    print(" \\___ \\| | | / __| __/ _ \\ '_ ` _ \\ ")
    print("  ___) | |_| \\__ \\ ||  __/ | | | | |")
    print(" |____/ \\__, |___/\\__\\___|_| |_| |_|")
    print("        |___/                       ")
    print(" ___________________________________")
    print("")
    print("    (✓) System Type    : Linux (Ubuntu 16.10)")
    print("")
    print("    (x) Crypto Service : General Bytes")
    print("                         Crypto Application Server (CAS)")
    print("                         (your CAS is out-of-date by 82 days)")
    print("")
    print("    (✓) Available RAM  : 4.0 GiB")
    print("")
    print("    (✓) Available Disk : 28.3 GiB")
    print("")
    print("Please press <enter> to continue...")

    waiting = input()

##
# Display System Overview
#
def install_abs():
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("   ___           _        _ _ ")
    print("  |_ _|_ __  ___| |_ __ _| | |")
    print("   | || '_ \/ __| __/ _` | | |")
    print("   | || | | \__ \ || (_| | | |")
    print("  |___|_| |_|___/\__\__,_|_|_|")
    print(" _____________________________")
    print("")
    print(" Sorry, but this feature is NOT available on your system.")
    print("")
    print("Please press <enter> to continue...")

    waiting = input()

##
# Choose Your Language
#
def choose_i18n():
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("  _                                             ")
    print(" | |    __ _ _ __   __ _ _   _  __ _  __ _  ___ ")
    print(" | |   / _` | '_ \\ / _` | | | |/ _` |/ _` |/ _ \\")
    print(" | |__| (_| | | | | (_| | |_| | (_| | (_| |  __/")
    print(" |_____\\__,_|_| |_|\\__, |\\__,_|\\__,_|\\__, |\\___|")
    print("                   |___/             |___/      ")
    print(" _______________________________________________")
    print("")
    print("    (1) English               (6) Italian")
    print("")
    print("    (2) Chinese (Simp)        (7) Japanese")
    print("")
    print("    (3) Chinese (Trad)        (8) Korean")
    print("")
    print("    (4) Czech                 (9) Spanish")
    print("")
    print("    (5) French")
    print("")
    print("Please enter your preferred language, or press <enter> to CANCEL?")

    waiting = input()

##
# About aBitSuite ABS
#
def display_about_software():
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("     _    _                 _   ")
    print("    / \\  | |__   ___  _   _| |_ ")
    print("   / _ \\ | '_ \\ / _ \\| | | | __|")
    print("  / ___ \\| |_) | (_) | |_| | |_ ")
    print(" /_/   \\_\\_.__/ \\___/ \\__,_|\\__|")
    print(" _______________________________")
    print("")
    print("    aBitSuite (ABS) is a specialized virtual assistant for")
    print("    Crypto Service Providers (CSPs).")
    print("")
    print("    To learn more, please visit https://telr.io")
    print("")
    print("Please press <enter> to continue...")

    waiting = input()

##
# Display Goodbye
#
def say_goodbye():
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("   ____                 _ _                ")
    print("  / ___| ___   ___   __| | |__  _   _  ___ ")
    print(" | |  _ / _ \\ / _ \\ / _` | '_ \\| | | |/ _ \\")
    print(" | |_| | (_) | (_) | (_| | |_) | |_| |  __/")
    print("  \\____|\\___/ \\___/ \\__,_|_.__/ \\__, |\\___|")
    print("                                |___/      ")
    print(" __________________________________________")
    print("")
    print("    Thanks for visiting!")
    print("")
    print("    Telr Concierge offers your organization unlimited access")
    print("    to the MOST trusted and comprehensive suite of business solutions")
    print("    requested by Crypto Service Providers (CSPs).")
    print("")
    print("    Please visit us at https://telr.io")
    print("")

# menu()
display_welcome()

while True:
    os.system('clear')

    print("")
    print(" ABS v{}".format(VERSION))
    print("  __  __       _         __  __                  ")
    print(" |  \\/  | __ _(_)_ __   |  \\/  | ___ _ __  _   _ ")
    print(" | |\\/| |/ _` | | '_ \\  | |\\/| |/ _ \\ '_ \\| | | |")
    print(" | |  | | (_| | | | | | | |  | |  __/ | | | |_| |")
    print(" |_|  |_|\\__,_|_|_| |_| |_|  |_|\\___|_| |_|\\__,_|")
    print(" ________________________________________________")
    print("")
    print("    1) Manage Telr remote services")
    print("")
    print("    2) Display a system overview")
    print("")
    print("    3) Install ABS to this system")
    print("")
    print("    4) Choose a 语言 · ภาษา · 언어 · لغة")
    print("")
    print("    5) About aBitSuite (Majordomo)")
    print("")
    print("Please select an option, or press <enter> to QUIT?")

    menu_selection = input()

    if menu_selection == '1':
       remote_services_manager()
       continue
    if menu_selection == '2':
       display_system_overview()
       continue
    if menu_selection == '3':
       install_abs()
       continue
    if menu_selection == '4':
       choose_i18n()
       continue
    if menu_selection == '5':
       display_about_software()
       continue

    # display goodbye screen
    say_goodbye()

    # Come out of the program with status 0
    sys.exit(0)
