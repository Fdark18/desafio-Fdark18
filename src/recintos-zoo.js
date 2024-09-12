class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'Savana', capacidade: 10, animais: [{ tipo: 'LEAO', quantidade: 2 }] },
            { numero: 2, bioma: 'Floresta', capacidade: 5, animais: [{ tipo: 'MACACO', quantidade: 1 }] },
            { numero: 3, bioma: 'Floresta', capacidade: 7, animais: [{ tipo: 'MACACO', quantidade: 1 }] },
            { numero: 4, bioma: 'Rio', capacidade: 8, animais: [] },
        ];

        this.animais = {
            'LEAO': { tipo: 'Carnívoro', biomas: ['Savana'], espacoPorIndividuo: 2 },
            'MACACO': { tipo: 'Onívoro', biomas: ['Floresta'], espacoPorIndividuo: 2 },
            'CROCODILO': { tipo: 'Carnívoro', biomas: ['Rio'], espacoPorIndividuo: 3 },
        };
    }

// Recebe um animal e uma quantidade e retorna um array com os recintos viáveis
    analisaRecintos(animal, quantidade) {
        const tipoAnimal = animal.toUpperCase();
        const animalInfo = this.animais[tipoAnimal];

        if (!animalInfo) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        let recintosViaveis = [];

        // Filtra recintos que possuem o animal e que possuem espaço para o animal desejado
        for (const recinto of this.recintos) {
            if (!animalInfo.biomas.includes(recinto.bioma)) {
                continue;
            }

            let espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a.tipo.toUpperCase()].espacoPorIndividuo * a.quantidade, 0);
            let espacoDisponivel = recinto.capacidade - espacoOcupado;

            if (tipoAnimal === 'MACACO' && recinto.animais.some(a => a.tipo === 'MACACO')) {
                espacoOcupado += this.animais['MACACO'].espacoPorIndividuo; // Permite um macaco extra como companhia
            }

            if (espacoDisponivel >= animalInfo.espacoPorIndividuo * quantidade) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - animalInfo.espacoPorIndividuo * quantidade} total: ${recinto.capacidade})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }
} export { RecintosZoo as RecintosZoo };
