const fs = require('fs').promises; // Usamos la versión de promesas de fs
const path = require('path');

class FileManager {
    constructor(filename) {
        // Ruta absoluta usando __dirname
        this.path = path.join(__dirname, filename);
        this.initializeFile();
    }

    // Inicializa el archivo si no existe
    async initializeFile() {
        try {
            const exists = await fs.access(this.path).then(() => true).catch(() => false);
            if (!exists) {
                await fs.writeFile(this.path, JSON.stringify([], null, 2));
                console.log(`Archivo ${this.path} creado`);
            }
        } catch (error) {
            console.error(`Error al inicializar ${this.path}:`, error);
            throw error;
        }
    }

    // Lee el contenido del archivo
    async readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error al leer ${this.path}:`, error);
            return [];
        }
    }

    // Escribe en el archivo
    async writeFile(data) {
        try {
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(`Error al escribir en ${this.path}:`, error);
            throw error;
        }
    }
}

module.exports = FileManager;