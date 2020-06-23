#!/bin/bash
# Resize jpg images if needed.

for i in *.jpg; do
 echo $i
 convert $i -scale 1600x1200\> $i
done

