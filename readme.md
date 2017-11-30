# Pimp my tags
* nodeJs tool developped by winckell benjamin
![preview tool](/screens/pic1.png)
Table of Contents
=================

   * [Pimp my tags](#pimp-my-tags)
      * [Requirements](#requirements)
      * [Tree](#tree)
      * [Introduction](#introduction)
      * [Installation](#installation)
      * [Usage](#usage)

## Requirements 
 - NODEJS VERSION >=8.6 
## Tree
```bash
.
├── index.js // current nodejs program with every prompts
├── initAlias.js
├── node_modules 
├── package.json
├── readme.md
└── templateTag.txt // template used for boostraping every tags
```

## Introduction
This program is used to create a new local git tag on your computer based on a text template.
You have two possibilities with this program:
- create new tag on the current head position.
- create new tag on a specific commit by providing commit sha1.

Don't forget to push your new created tag via `git push --tags` when it's finished

## Installation
-1 Download the current repository via `git clone` or zip.

-2 Install current nodejs project by running `npm install` inside the project directory.

-3 Init project with this cli command `npm run init`.

pimpMyTags tool is now available inside your terminal by using this alias `pimpGitTags` from any git repository.

## Usage 
 - Make sure to be inside a git repository before invoking this tool
 - write `pimpGitTags` inside your terminal
 - follow instructions...

