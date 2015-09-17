#!/bin/bash
if ! type node 2>/dev/null; then
	sh ./install-node.sh
fi

sudo npm install -g bower gulp karma protractor

if ! type psql 2>/dev/null; then
	sh ./install-db.sh
fi

sh ./setup-db.sh