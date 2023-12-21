# Project redraven

This is javascript/html/canvas simulation of the praxinomoscopic-like
animation that was the gimmick for a series of 78rpm kiddie records,
called "Red Raven Magic Mirror."  Viewing the animations required a
mirrored "carousel" that was placed on top of the spinning record.

For no particularly good reason, I wanted to see the animations,
despite not having this carousel.

## My approach is analogous to a flip movie.
It is similar to an animated
gif, except that I rotate and redraw the record at runtime. This way,
I can fiddle with the speed of the record and the effect of varying
the # of frames per revolution.

## *redraven.html* is a static HTML/JS single-page app
It intended to be hosted on a free, static-only python-free web host.

## *fredraven.py* is the Python Flask version.
This allows for easy canvas resizing without editing the source code.

## The 2 versions share the images and the javascript animation code.
Images and javascript are in fredraven/static

## Curious Findings

I was surprised; the carousel has 16 mirrors, but some of the amimations
are clearly 15- or 17-based. 

Actually, the animations are pretty good, on par with some of
Muybridge's non-photographic animations. (Side note, I only learned
about these  while doing this -- up until recently, I only knew about
Muybridge's galloping horse and prehistoric implementation of "bullet time.")

