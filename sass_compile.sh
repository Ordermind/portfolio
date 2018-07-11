#/!bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
wt -b $DIR/css -s compact --source-map=true compile $DIR/sass
