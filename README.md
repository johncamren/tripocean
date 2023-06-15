Ocean Trip
=========

Fast Fourier Transform ocean rendering for Three.js

Shows a way to render realistic scenes in WebGL.

You can travel by using the keyboard and the environment can be selected. You can also explore the working of the scene by typing 'h'.

Live demo: https://github.com/johncamren/tripocean

### Screenshots

![Alt text](/visual/night_ocean_fft.jpg "Ocean rendering in a night environment")

### Features

- Ocean rendering is based on the generation of a displacement map and a normal map applied with vertex and fragment shader
- Ocean mesh is computed in screen space
- Clouds and rain come from Three.js community

### Screen space grid

The screen space working is in fact simple:

- Add a grid in the scene, anywhere
- The grid must always be seen by the camera, or the vertex shader will not be applied
- In the vertex shader, the grid is then put in front of the camera in order to fill the entire screen
- In the vertex shader, the grid is projected on a 3d plane (just change the depth)

A complete explanation can be find here: http://habib.wikidot.com/projected-grid-ocean-shader-full-html-version


