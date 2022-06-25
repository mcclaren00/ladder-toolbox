#!/bin/bash
## DANGEROUS SCRIPT DO NOT RUN ## 
for CRD in $(kubectl get crds -o=name | sed 's:.*/::')
do
    kubectl delete crd ${CRD}
done 