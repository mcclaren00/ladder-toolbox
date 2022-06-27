#!/bin/bash

flux suspend hr $1 -n $2
flux resume hr $1 -n $2
