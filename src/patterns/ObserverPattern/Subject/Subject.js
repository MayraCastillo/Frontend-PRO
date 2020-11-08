
export default class Subject {

    constructor(){
        this.observers = [];
        this.index = 1;
    }

    //Agrega un observador a la lista
    addObserver(observer) {
        this.observers.push(observer);
    }

    //Elimina un observador de la lista
    deleteObserver(observer) {
        this.observers = this.observers.filter( (item) => item !== observer);
    }

    //Notifica a todos los observadores de la lista
    notifyAll(idProduct, nameProduct, costProduct) {
        this.observers.forEach(observer => {
            observer.notify(idProduct, nameProduct, costProduct);
        });
    }
}

