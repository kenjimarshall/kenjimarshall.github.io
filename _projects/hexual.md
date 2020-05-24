---
title: Hexual
layout: project
parent: /projects
project: hexual
---

Check out the code [here](https://github.com/kenjimarshall/Hexual). This project is built with a React frontend, Flask backend, and is connected to a MongoDB database. The application is available at hexual.ca.

# What is it?

As the saying goes, _always judge an album by its cover._ Personally, I think that album artwork is as integral to a record's artistic statement as the music itself. It's the imagery you link to the sound and the one opportunity to represent the music via a different medium. Hexual is an an effort to explore music through this lens.

At its core, Hexual is a database of over 300,000 (and growing) unique albums and their color palette. I provide tools on the hexual website to freely explore this database.

# The Data

The original database I looked at was this awesome resource put together by Jason Scott, where he's collected [1 million album covers](https://blog.archive.org/2015/05/27/experiment-with-one-million-album-covers/) and has made those images publicaly available. Unfortunately this data is pretty messy, but it provides a great launching off point to generate a cleaner, more informative database of my own.

To do so, I wrote a script to go through each file, parse the artist name from the filename, and search that string on the Spotify API. I go through the top 5 results, and for each of those artists, collect information on all their albums. This includes the genre, release year, popularity, and of course, a URL to the artwork. All that's left is to calculate the color palette.

# Colours!

**K-Means clustering** was used to calculate each album's palette. K-Means is an unsupervised learning algorithm that attempts to segment data into K clusters. First, K points are randomly initialized in the feature space. These points are called the **centroids**. At each iteration, every data point is assigned to its closest centroid. This defines a centroid's **neighborhood**. Then, we go through each centroid and its position is updated to the _mean position of its neighborhood_. However, by changing this position, some points may enter the neighborhood while others will leave.

But _by repeating this process over and over, we'll end up with K different neighborhoods that naturally segment the data._

For example, let's say we have an album cover with a lot of red pixels, and a lot of blue pixels. If we use 2 centroids, we'd expect to divide the image into a red neighborhood and a blue neighborhood.

You're probably familiar with using RGB to represent images, wherein each pixel is defined by its level of redness, blueness, and greenness. Simple. But for hexual, I wanted people to be able to search a color on our database, and return all albums that match that color, or are imperceptibly different.

**But how do I measure being "imperceptibly different"?**

Naturally, color similarity might be quantified by how close to colors are in the RGB color space. However, **this isn't necessarily true** because the RGB system is not **perceptually uniform**. This means that if you take two pairs of RGB points, where within each pair the distance between the two points is equal, this does NOT mean that the perceptual difference in the two pairs will be the same. Human perception is more complicated than just perceiving redness, blueness, and greenness. We do have three types of cones in our retina responsible for color perception, but their peak sensitivities do not neatly correspond to red, green, and blue. We are not RGB organisms.

Here's an illustration:

![image](/assets/images/rgb_comparison.png)

_These two pairs are the same distance away in RGB, but the bottom pair looks way more different than the top pair!_

This is why the images were represented in the [CIELAB color space](https://en.wikipedia.org/wiki/CIELAB_color_space). For some background, CIE is the International Commission on Illumination. LAB is a color space, similar in spirit to RGB, where Euclidean distances between colors is more closely correlated to human perception of color. Instead of RGB channels, they use:

- L: white to black
- A: green to red
- B: blue to yellow

The scale in each channel is non-linear, chosen to best represent human perception. In this space, any pairs separated by the same Euclidean distance will have the same difference in perceived color.

Great. So for each album, we convert its artwork to LAB, then use K-Means to find the pallette (with 4 centroids), and store the palette as LAB and as RGB hex codes in our database.

Here's an example using Boards of Canada's album Tomorrow's Harvest:

![image](/assets/images/example_palette.png)

# Hexual

The website itself is built on a React, Flask, MongoDB tech stack. It has three ways to explore music:

### Palette

Choose up to four colours, and search the database for albums that perfectly match all the specified colours (i.e. aren't perceptibly different), or match all but one of the colours in case none of the perfect matches are satisfactory.

### Search

Search for any artist or album to see if it's in our collection.

### Browse

Choose a genre (from Spotify's exhaustive list including grunge, art rock, conscious hip-hop, and more) and 1000 randomly selected albums and their palettes will be displayed to you.

That's all!
