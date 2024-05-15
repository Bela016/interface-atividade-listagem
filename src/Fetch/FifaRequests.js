class FifaRequests {
    constructor() {
        this.serverUrl = 'http://10.90.2.119:3333';
        this.routeListarFifa = '/playercards';
    }

    async ListarFifa () {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarFifa}`);
            if (!response.ok) {
                throw new Error ('Erro ao buscar servidor');
            }
            return await response.json();
        }catch (error) {
            console.error('Erro: ', error);
        }
    }
}

export default new FifaRequests;