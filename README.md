# Magickapp

Takes an alternative approach to editing images; Instead of using dials, sliders, and input percentages, use the terminal to generate several images from a source image with that alteration applied in every way possible (within reason). While space-intensive, it's, ironically, more visual and enables terminal chaining several alterations into an automated pipeline of edits. 

The initial motivation was a combination of not wanting to learn and pay for Photoshop and an interest in abstracting imagemagick commands to sequester superfluous typing. 

The name is a portmanteau of app and imagemagick, a terminal program for manipulating images this program wraps. Subsequently, the initial stretch goal of this side-project is to create a decent picture of magikarp, the pokemon, using this program because their names sound like each other. 

## Use

The way this works is this script can be run with one of the arguments for imagemagick's "convert" command. This script will use whatever image is in the src-image directory and run imagemagick's `convert` against that image with all possible iterations an output of the command passed would produce. The resulting manipulated images will be output to the dest directory. 

1) Add the image you would like to use as the source image to the src-image directory
2) Run `node index.js [option]`. The aspirational list of options is here, https://www.imagemagick.org/script/command-line-options.php . Please feel free to open a PR with support for additional options. The current options implemented are: gamma, and grayscale. 
3) Navigate to the directory created when the script was run. You will see copies of your source with the changes applied in every way that change could be applied (to a reasonable degree). For example, if using grayscale, you should see several versions of your source image in grayscale applied using different configurations for the...type of grayscale (not sure if that's the right term)
4) That's it! At this point chaining is performed with && in the terminal with some combination of this program && mv destination-file to src-image && run this program again. So I guess step #4 is be creative! 

TODO: 
- Set up testing and write tests
- Implement each of these in order of immediate need: https://www.imagemagick.org/script/command-line-options.php .
- Handle input options and output options differently
- Ensure chaining works as expected. Might have to simplify naming convention of destination files so they can be easily and repeatably referenced
- Switch statement of options could be a hash table instead, but who cares
- Maybe consider maintaining some sort of state to pretty print the results to the user
