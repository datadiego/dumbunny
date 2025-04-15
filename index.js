const blessed = require('blessed');
const cheats = require("./utils/cheats");
const clipboardy = require('clipboardy');

console.log("objeto cheats:", cheats);
console.log("ejemplo comando:", cheats.nmap.commands[0]);

// Crear la pantalla
const screen = blessed.screen({
    smartCSR: true,
    title: 'Comandos Disponibles'
});

const list = blessed.list({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    items: [],
    border: {
        type: 'line'
    },
    keys: true, // Habilitar navegación con teclas
    mouse: true, // Habilitar interacción con el ratón
    style: {
        selected: {
            bg: 'blue',
            fg: 'white'
        },
        border: { fg: 'red' },
        fg: 'white',
        bg: 'black'
    }
});

// Agregar los comandos al listado
Object.keys(cheats).forEach(category => { 
    cheats[category].commands.forEach(command => {
        list.addItem(`${category.toUpperCase().padEnd(6)} ${command.title.padEnd(20)} ${command.command}`);    });
});

// Agregar la lista a la pantalla
screen.append(list);

// Permitir salir con teclas específicas
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// ...existing code...

screen.key(['s'], () => {
    const searchBox = blessed.textbox({
        top: 'center',
        left: 'center',
        width: '50%',
        height: 3,
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'black',
            border: { fg: 'blue' }
        },
        inputOnFocus: true
    });

    screen.append(searchBox);
    searchBox.focus();

    // Filtrar en tiempo real mientras el usuario escribe
    searchBox.on('keypress', () => {
        const query = searchBox.getValue();
        const filteredItems = [];
        Object.keys(cheats).forEach(category => {
            cheats[category].commands.forEach(command => {
                if (
                    category.includes(query) ||
                    command.title.includes(query) ||
                    command.command.includes(query)
                ) {
                    filteredItems.push(`${category.toUpperCase().padEnd(6)} ${command.title.padEnd(20)} ${command.command}`);
                }
            });
        });

        list.clearItems();
        filteredItems.forEach(item => list.addItem(item));
        screen.render();
    });

    // Salir del menú de búsqueda al pulsar Enter
    searchBox.on('submit', () => {
        screen.remove(searchBox);
        list.focus();
        screen.render();
    });

    searchBox.on('cancel', () => {
        screen.remove(searchBox);
        list.focus();
        screen.render();
    });

    screen.render();
});

// Manejar la selección de un comando
list.on('select', (item) => {
    const selectedItem = item.getText();
    const [category, title, command] = selectedItem.split(/ {2,}/);
    //paste command to clipboard
    clipboardy.writeSync(command);
    // Mostrar un mensaje de confirmación
    const message = blessed.message({
        top: 'center',
        left: 'center',
        width: '50%',
        height: 3,
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'black',
            border: { fg: 'green' }
        }
    });
});








// Hacer que la lista sea interactiva
list.focus();

// Renderizar la pantalla
screen.render();