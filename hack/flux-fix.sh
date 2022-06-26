#!/bin/bash

flux suspend hr  -n kube-system
flux resume hr metrics-server -n kube-system
