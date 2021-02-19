#!/usr/bin/env node
var shell = require('shelljs');

//This is lazy, but it works.
function reverseString(input) {
    return input.split('').reverse().join('');
}

shell.mkdir('test');
shell.cd('test');

shell.touch('.gitlog');
if (shell.which('git'))
{
    shell.exec('git log --oneline', { silent: true }, (code, stdout, stderr) => {
        let lines = stdout.split('\n');
        //Lines of git log reversed and in capital, because why not?
        lines = lines.map(line => reverseString(line).toUpperCase());
        shell.echo(lines.join('\n')).toEnd('.gitlog');

        //Now print them back in the right order from, but read from the file.
        let gitLines = shell.cat('.gitlog').split('\n');
        gitLines = gitLines.map(reverseString);
        shell.echo(gitLines.join('\n'));
    });
}


shell.touch('foo.txt'); //Create foo.txt.
shell.echo('this is a test').to('bar.txt'); //Write message to bar.txt.
shell.cat('bar.txt').to('foo.txt'); //Same contents now.

var files = shell.ls();
shell.echo(files.toString());

var dir = shell.pwd();
shell.echo(dir.toString());
process.on('exit', () => shell.rm('-r', dir));