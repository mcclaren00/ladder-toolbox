#!/bin/bash

flux suspend hr metrics-server -n kube-system
flux resume hr metrics-server -n kube-system
