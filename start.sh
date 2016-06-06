#!/bin/sh

#	Cleanups
function clean_up {
	echo bye
	kill -9 $SERVER_PID || true\
	adb shell rm -r /sdcard/screenrecord-data/ || true
	exit
}
trap clean_up SIGHUP SIGINT SIGTERM

#	Vars
duration=1
bitrate=$(expr 2 \* 1000 \* 1000) # default is 4Mbps, but lower bitrate == higher FPS

#	Make directory
adb shell mkdir /sdcard/screenrecord-data/ || true
rm -r ./files || true
mkdir ./files || true

#	Start Python static server
python -m SimpleHTTPServer &
SERVER_PID=$!

#	Loop
while [ 1 ]
do
	expired3=$expired2
	expired2=$expired
	expired=$previous
	previous=$now
	now=$(date +%s)
	adb shell screenrecord --bit-rate=$bitrate /sdcard/screenrecord-data/$now.m4v &
	RECORD_PID=$!
	sleep $duration
	kill $RECORD_PID
	adb pull /sdcard/screenrecord-data/$previous.m4v ./files || true &
	adb shell rm /sdcard/screenrecord-data/$expired.m4v || true &
	rm /sdcard/screenrecord-data/$expired3.m4v || true &
done
