---
title: Boggle Buddy
layout: project
parent: /projects
project: boggle_buddy
---

Boggle Buddy is the perfect companion for the classic word game. See the repo [here](https://github.com/kenjimarshall/boggle-app). Also, download the app on the [Google Play Store](https://play.google.com/store/apps/details?id=com.kenjimarshall.bogglebuddy) and double the size of my satisfied audience from one person to two.

# The Solver

Given a board representation (16 alphabetical symbols), this is converted to a graph. Nodes are the tiles, and edges are the valid connections on the Boggle board. To form every potential word, this is nothing more than a DFS from each node. The graph is represented as an adjacency list, so this takes O(V + E) where V is the number of tiles, and E is the number of edges. Since we do this for every node, this comes to O(V<sup>2</sup> + VE).

In order to validate any word, the North American Scrabble Players Association (NASPA) comes in clutch with their official [2018 word list](https://www.scrabbleplayers.org/w/NASPA_Word_List) (hereon referred to as NWL 2018, short for NASPA Word List). NWL 2018 is stored in a hash set for O(1) look-up times. As such, the validation process doesn't bog down the DFS at all.

We can speed up this process a little bit. If a branch of a DFS starts with XYZ, then there are no letters that could salvage this into a valid word. As such, the solver also stores all valid 3-letter prefixes in a separate hash set -- this way a hopeless branch can be put out of its misery early.

**This solver is also hosted online at [bogglecompanion.com](http://www.bogglecompanion.com) as a simple Flask web application!** That repo is [here](https://github.com/kenjimarshall/boggle-companion).

# Optical Character Recognition

So how do we input the letters? It's a lot to ask of people to type in the 16 tiles manually. _We're all slowly dying, and we must make the most of the time we have left._ Optical character recognition (OCR) to the rescue.

Tesseract is one the oldest players in the OCR game, originally developed at Hewlett-Packard by Ray Smith in the 1980s -- and it's been open sourced since 2005. [tess-two](https://github.com/rmtheis/tess-two) is a fork of Tesseract for Android.

Now, it's not as simple as simply passing an image of a Boggle board to Tesseract and letting it do all the work. It's a powerful tool, but it needs clean data -- like white, clear text on a black screen. So we're going to have to get each tile into a legible format -- enter Open CV. Given an image of a Boggle board, we can pass it through a simple threshold to turn pixels above a certain value one color, and pixels below that value another color. Here's an example of what I mean from the Open CV docs:

![image](/assets/images/threshold.png)

We want white letters on a black background, so we make dark pixels white, and light pixels black. This turns the white background of a Boggle tile black, and the letter in the middle white.

Then Open CV can then detect blobs of white (like the Boggle letters) as something called a contour. So we run the contour detection algorithm, remove contours that are unreasonably large or small, and hopefully we've found the sixteen letters, like so:

![image](/assets/images/contour_example.png)

To make this process more robust, all the candidate contours are arranged in two binary search trees. In one, we use their x-coordinate interval as the key. In the other, we use their y-coordinate interval. With this, we can identify outlier contours (which aren't in the same row/column as any other). And even if we missed some letters, we can find the prevailing 4x4 grid structure of the contours.

The last wrinkle is that some letters are going to be sideways or upside down. Luckily Tesseract's predictions come with a confidence score. We lean on this and run Tesseract on each character in all four possible orientations and take the prediction with the highest confidence. Since most letters have a height larger than their width, the predictions corresponding to those orientations are weighted a bit more heavily.

So with some image processing and machine learning, the Boggle Buddy experience is a bit faster for everyone!

# Dictionary

In case you come across a weird word and don't know what it means, the app is also linked to the [Merriam-Webster Collegiate Dictionary API](https://dictionaryapi.com/). Tapping a word will send the request, and it attempts to parse and display the primary definition. The collegiate dictionary isn't their most thorough word collection so it doesn't have all the words, but it's the best API available.

# Demo

![image](/assets/images/ocr.gif)
