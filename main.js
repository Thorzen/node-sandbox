#!/usr/bin/env node
var shell = require('shelljs');

shell.mkdir("test");
shell.cd("test");

shell.touch('foo.txt'); //Create foo.txt.
shell.echo('this is a test').to('bar.txt'); //Write message to bar.txt.
shell.cat('bar.txt').to('foo.txt'); //Same contents now.

var files = shell.ls();
shell.echo(files.toString());

var dir = shell.pwd();
shell.echo(dir.toString());
shell.rm('-r', dir);