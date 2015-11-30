Unidirectional 1-N file syncing with history and *local merging* [![Build Status](https://drone.io/github.com/FGRibreau/filesync/status.png)](https://drone.io/github.com/FGRibreau/filesync/latest)
================================================================

This is a **proof of concept** AND **a work in progress**, don't share the word, yet.

# Motivation

> “We are in 2015 and my students still have to copy what I wrote on a screen while I teach them something. This is a long and tedious process that slow down the lectures.
>
> Google Document-like tools should NEVER be used for sharing code, we want syntax highlighting and static analysis not copy/pasting code inside an online document each time we make a change.
>
> Online IDEs are NOT a solution. I have my own finely tuned editor, my students have theirs, we don't want to temporarily trade our workflow comfort for a lecture.
>
> Both solution are stupid.
>
> I want a tool that will allow each students to retrieve in real-time my edits while keeping their own local modifications. This tool will work with any editor/IDE because we sync at the file-system level. Each modifications will be display in an history log and would be either merged locally or dropped definitely.”

> — 03/06/2015

## Current status

FileSync was first made during a lecture on AngularJS/Socket.io/NodeJS with IUT Nantes students on 3rd March 2015.

<p align="center">
<img style="width:100%" src="https://33.media.tumblr.com/tumblr_mbeqjaEW9E1rnxgdlo1_500.gif">
</p>

## Setup

```
npm i filesync -g
filesync-server
filesync-relay /path/to/directory
```

## Pause Notification usages

- Launch server.js and :
- Launching relay.js specifying the path to the calendar explicitly
```
node server.js
node relay.js [path/to/directoy] [path/to/calendar]
```
- Launching relay without specifying the path to the calendar will search for the default iut.json file in the /tmp/ directory
```
node server.js
node relay.js [path/to/directoy] {/tmp/iut.json}
```
- Open your browser as localhost:3000
- Click the button to display the time left for the next pause !

## [Changelog](/CHANGELOG.md)

## Contribute / TODO

See [issues](https://github.com/FGRibreau/filesync/issues) there is still a lot of things to do/improve note that **I will happily merge any pull-requests that solve each of the specified issues**.

## Bonus

Since this tool is primary build for teaching, it will also display the number of students that don't currently have the page on focus using HTML5 Page Visibility API. (But yeah they can always open another browser window, in the end that feature was mainly developed for fun...)
