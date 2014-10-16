adb-screenrecord-script
=======================

A shell script to capture android screen using screenrecord utility by chunks and streaming them via python SimpleHTTPServer



Notes
=======================
- Expect a delay of 2-3 seconds
- Cache file chunks are stored in /sdcard/screenrecord-data/



Requirements
=======================

- Adb installed
- USB debugging mode
- Android version with screenrecord available
- Python SimpleHTTPServer



Start Script
=======================

sh start.sh



Stream Recording
=======================
localhost:8000