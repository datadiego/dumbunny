import blessed from 'blessed';
import cheats from "./utils/cheats.js";
import clipboardy from 'clipboardy';

const colors = {
    //neon brutalist pallette
    orange: '#FF7000',
    gray: '#2A2A2A',
    green: '#A6FF80',
    dark: '#1A1A1A',
    purple: '#A600FF',
};

//console.log("objeto cheats:", cheats);
//console.log("ejemplo comando:", cheats.nmap.commands[0]);

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
            inverse: true,
            fg: colors.purple,
            bg: colors.green,
        },
        border: { fg: colors.purple },
        fg: colors.orange,
        bg: colors.dark
    }
});

// Agregar los comandos al listado
const item = list.addItem("CAT".padEnd(9) + "DESC".padEnd(31) + "COMMAND");
item.style.bg = colors.orange;
item.style.fg = colors.dark;
Object.keys(cheats).forEach(category => {
    cheats[category].commands.forEach(command => {
        list.addItem(`${category.toUpperCase().padEnd(8)} ${command.title.padEnd(30)} ${command.command}`);
    });
    list.addItem("");

});
list.setLabel(' Dumbunny 0.0.1 ');
// selecciona el segundo elemento
list.select(1);
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
            bg: colors.dark,
            border: { fg: 'blue' }
        },
        inputOnFocus: true,
        label: ' Search ',
        keys: true,
        mouse: true,
    });

    screen.append(searchBox);
    searchBox.focus();




    searchBox.on('submit', (value) => {
        const searchTerm = value.toLowerCase();
        list.clearItems(); // Limpia los elementos actuales de la lista
        //calcula el tamaño máximo de la columna de descripción
        let maxLength = 0;
        Object.keys(cheats).forEach(category => {
            cheats[category].commands.forEach(command => {
                if (command.title.length > maxLength) {
                    maxLength = command.title.length;
                }
            });
        });
        // Filtra y agrega los elementos que coincidan con el término de búsqueda
        Object.keys(cheats).forEach(category => {
            cheats[category].commands.forEach(command => {
                const commandText = `${category.toUpperCase()} ${command.title} ${command.command}`.toLowerCase();
                if (commandText.includes(searchTerm)) {
                    list.addItem(`${category.toUpperCase().padEnd(7)} ${command.title.padEnd(maxLength)} ${command.command}`);
                }
            });
        });

        screen.remove(searchBox); // Elimina el cuadro de búsqueda
        list.focus(); // Devuelve el foco a la lista
        screen.render(); // Renderiza la pantalla
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
            bg: colors.purple,
            border: { fg: 'green' }
        }
    });
    message.display(`Comando copiado: ${command}`, 3, () => {
        message.destroy();
        screen.render();
    });
    
});

// Hacer que la lista sea interactiva
list.focus();

// Renderizar la pantalla
screen.render();