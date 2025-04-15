const fs = require('fs');
const matter = require('gray-matter');

function parseMD(path){
    const markdownContent = fs.readFileSync(path, 'utf8');
    const parsed = matter(markdownContent);
    const commands = [];
    // Regex para extraer títulos y comandos
    const regex = /## (.*?)\n.*?```.*?\n([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(parsed.content)) !== null) {
        const title = match[1].trim();
        const command = match[2].trim();
        commands.push({ title, command });
    }
    //for each command, add every <thing> as an input
    commands.forEach(command => {
        const regex = /<([^>]+)>/g;
        let match;
        const inputs = [];
        while ((match = regex.exec(command.command)) !== null) {
            inputs.push(match[1]);
        }
        command.inputs = inputs;
    });
    return {
        tags: parsed.data.tags,
        commands
    }
}

function getAllMD(path){
    const files = fs.readdirSync(path);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    return markdownFiles.map(file => `${path}/${file}`);
}

function prepare(){
    const cheats = getAllMD('./cheats');
    const cheatsObj = {};
    cheats.forEach(cheat => {
        const cheatName = cheat.split('/').pop().split('.').shift();
        cheatsObj[cheatName] = parseMD(cheat);
    });
    return cheatsObj;
}

const cheats = prepare()

module.exports = cheats;