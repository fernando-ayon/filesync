Unidirectional 1-N file syncing with history and *local merging* [![Build Status](https://drone.io/github.com/FGRibreau/filesync/status.png)](https://drone.io/github.com/FGRibreau/filesync/latest)
================================================================

This is a **proof of concept** AND **a work in progress**, don't share the word, yet.

## Current status

FileSync was first made during a lecture on AngularJS/Socket.io/NodeJS with IUT Nantes students on 3rd March 2015.

<p align="center">
<img style="width:100%" src="https://33.media.tumblr.com/tumblr_mbeqjaEW9E1rnxgdlo1_500.gif">
</p>

## Setup

```
npm i filesync -g
filesync-server
filesync-relay /path/to/directory file
```

## Pause Notification usages

- Launch server.js
- Launch relay.js 
- NOTE : Specifying the path to the calendar when launching relay.js will use that .json file as calendar :
```
node relay.js [path/to/directoy] [calendarFileName]
```
- Launching relay without specifying the path to the calendar will search for a default file called 'iut.json' in the /tmp/ directory :
```
node relay.js [path/to/directoy] {/tmp/iut.json}
```
- Open your browser @ localhost:3000
- Click the button to display the time left for the next pause !

## Calendar format example

```
{
    "heures": [
        "10:45",	//end of each session
        "12:40",
        "15:10",
        "16:50",
        "18:30"
    ],
    "pauses": [
        "10",		//pause duration
        "60",
        "10",
        "10",
        "0"			//0 marks the end of the day
    ]
}
```